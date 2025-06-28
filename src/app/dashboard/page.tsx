import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Dashboard } from '@/components/dashboard/dashboard';

// ==================== TYPES ====================

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  followUpOn: Date | string | null;
}

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  followUpLeads: number;
}

// This type represents the possible MongoDB aggregation result formats
type MongoAggregationResult<T = any> = 
  | { cursor: { firstBatch: T[] }; ok: number }
  | { result: T[]; ok: number }
  | { cursor: { firstBatch: T[] } }
  | { result: T[] };

// ==================== HELPER FUNCTIONS ====================

/**
 * Creates date range for filtering leads from the last 7 days
 */
const getSevenDaysAgoDate = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
};

/**
 * Creates date range for today's follow-ups
 */
const getTodayDateRange = (): { start: Date; end: Date } => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

/**
 * Formats lead dates to ISO strings for serialization
 */
const formatLeadDates = (leads: any[]): Lead[] => {
  return leads.map(lead => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
    followUpOn: lead.followUpOn ? lead.followUpOn.toISOString() : null,
  }));
};

/**
 * Creates MongoDB aggregation pipeline for dashboard statistics
 */
const createStatsAggregationPipeline = (
  userId: string,
  sevenDaysAgo: Date,
  todayStart: Date,
  todayEnd: Date
) => ({
  aggregate: 'Lead',
  pipeline: [
    // Match user's leads
    {
      $match: {
        userId,
      },
    },
    // Create faceted query for different stats
    {
      $facet: {
        totalLeads: [{ $count: 'count' }],
        newLeads: [
          {
            $match: {
              createdAt: { $gte: sevenDaysAgo },
            },
          },
          { $count: 'count' },
        ],
        followUpLeads: [
          {
            $match: {
              followUpOn: {
                $ne: null,
                $gte: todayStart,
                $lte: todayEnd,
              },
            },
          },
          { $count: 'count' },
        ],
      },
    },
    // Project final results with default values
    {
      $project: {
        totalLeads: {
          $ifNull: [{ $arrayElemAt: ['$totalLeads.count', 0] }, 0]
        },
        newLeads: {
          $ifNull: [{ $arrayElemAt: ['$newLeads.count', 0] }, 0]
        },
        followUpLeads: {
          $ifNull: [{ $arrayElemAt: ['$followUpLeads.count', 0] }, 0]
        },
      },
    },
  ],
  cursor: {},
});

/**
 * Fetches recent leads for the dashboard
 */
const fetchRecentLeads = async (userId: string) => {
  return prisma.lead.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5,
  });
};

/**
 * Fetches dashboard statistics using MongoDB aggregation
 */
const fetchDashboardStats = async (
  userId: string,
  sevenDaysAgo: Date,
  todayStart: Date,
  todayEnd: Date
): Promise<DashboardStats> => {
  const pipeline = createStatsAggregationPipeline(userId, sevenDaysAgo, todayStart, todayEnd);

  // Use type assertion to handle the MongoDB response
  const result = await prisma.$runCommandRaw(pipeline) as any;
  
  // Handle different MongoDB response formats
  const stats = 
    (result.cursor?.firstBatch?.[0] as DashboardStats) || 
    (result.result?.[0] as DashboardStats) || 
    result[0] as DashboardStats;
  
  // Return the stats or default values if not found
  return stats || {
    totalLeads: 0,
    newLeads: 0,
    followUpLeads: 0,
  };
};

// ==================== ERROR COMPONENT ====================

const DashboardError = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-4">
      {/* <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div> */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Dashboard Unavailable
      </h2>
      <p className="text-gray-600 mb-4">
        We're having trouble loading your dashboard data. This might be a temporary issue.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

// ==================== MAIN COMPONENT ====================

export default async function DashboardPage() {
  // Authentication check
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  try {
    // Prepare date ranges
    const sevenDaysAgo = getSevenDaysAgoDate();
    const { start: todayStart, end: todayEnd } = getTodayDateRange();

    // Fetch data in parallel for better performance
    const [leads, stats] = await Promise.all([
      fetchRecentLeads(session.user.id),
      fetchDashboardStats(session.user.id, sevenDaysAgo, todayStart, todayEnd),
    ]);

    // Format data for client-side consumption
    const formattedLeads = formatLeadDates(leads);

    return (
      <Dashboard
        leads={formattedLeads}
        totalLeads={stats.totalLeads}
        newLeads={stats.newLeads}
        followUpLeads={stats.followUpLeads}
      />
    );
  } catch (error) {
    // Log error for debugging (consider using a proper logging service)
    console.error('Dashboard data fetch error:', {
      userId: session.user.id,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    return <DashboardError />;
  }
}