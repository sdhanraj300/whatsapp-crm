import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MessageCircle, 
  Phone, 
  Plus, 
  Users, 
  TrendingUp, 
  Calendar,
  Mail,
  MapPin,
  Star,
  Eye,
  Edit,
  MoreVertical,
  Download,
  RefreshCw
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  status: string;
  source: string | null;
  notes: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  followUpOn: Date | null;
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LeadsPage({
  searchParams,
}: PageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  // Parse query parameters
  const searchQuery = (await searchParams).search as string || '';
  const statusFilter = (await searchParams).status as string || 'ALL';
  const sortBy = (await searchParams).sortBy as string || 'createdAt';
  const sortOrder = (await searchParams).sortOrder as 'asc' | 'desc' || 'desc';

  // Build the where clause based on filters
  const whereClause: {
    userId: string;
    OR?: Array<{
      name?: { contains: string; mode: 'insensitive' };
      email?: { contains: string; mode: 'insensitive' };
      phone?: { contains: string };
      service?: { contains: string; mode: 'insensitive' };
      notes?: { contains: string; mode: 'insensitive' };
    }>;
    status?: string;
  } = {
    userId: session.user.id,
  };

  if (searchQuery) {
    whereClause.OR = [
      { name: { contains: searchQuery, mode: 'insensitive' } },
      { email: { contains: searchQuery, mode: 'insensitive' } },
      { phone: { contains: searchQuery } },
      { service: { contains: searchQuery, mode: 'insensitive' } },
      { notes: { contains: searchQuery, mode: 'insensitive' } },
    ];
  }

  if (statusFilter !== 'ALL') {
    whereClause.status = statusFilter;
  }

  // Fetch leads with pagination
  const leads = await prisma.lead.findMany({
    where: whereClause,
    orderBy: sortBy === 'name' 
      ? { name: sortOrder }
      : { createdAt: sortOrder },
  });

  // Get count of leads by status for the filter badges
  const statusCounts = await prisma.lead.groupBy({
    by: ['status'],
    where: { userId: session.user.id },
    _count: {
      status: true,
    },
  });

  const statusOptions = [
    { value: 'ALL', label: 'All Leads', count: leads.length },
    ...statusCounts.map(({ status, _count }) => ({
      value: status,
      label: `${status.charAt(0)}${status.slice(1).toLowerCase()}`,
      count: _count.status,
    })),
  ];

  // Calculate stats
  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status === 'NEW').length;
  const qualifiedLeads = leads.filter(lead => lead.status === 'QUALIFIED').length;
  const conversionRate = totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Lead Management
                  </h1>
                  <p className="text-gray-600 mt-1 text-lg">
                    Track and manage your sales pipeline
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button className="inline-flex items-center px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
                <Link
                  href="/dashboard/leads/new"
                  className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Lead
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Leads</p>
                <p className="text-3xl font-bold">{totalLeads}</p>
              </div>
              <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">New Leads</p>
                <p className="text-3xl font-bold">{newLeads}</p>
              </div>
              <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Qualified</p>
                <p className="text-3xl font-bold">{qualifiedLeads}</p>
              </div>
              <div className="w-12 h-12 bg-purple-400/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Conversion</p>
                <p className="text-3xl font-bold">{conversionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-400/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  placeholder="Search leads by name, phone, service..."
                  defaultValue={searchQuery}
                />
              </div>
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                id="status"
                name="status"
                className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none"
                defaultValue={statusFilter}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <button
                type="button"
                className="w-full inline-flex items-center justify-between px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <span className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  Sort: {sortBy === 'createdAt' ? 'Date' : 'Name'}
                </span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Leads List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {leads.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {leads.map((lead: any) => (
                <div key={lead.id} className="p-6 hover:bg-blue-50/50 transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <Link 
                            href={`/dashboard/leads/${lead.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                          >
                            {lead.name}
                          </Link>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            lead.status === 'NEW' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            lead.status === 'CONTACTED' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            lead.status === 'QUALIFIED' ? 'bg-green-100 text-green-800 border border-green-200' :
                            lead.status === 'LOST' ? 'bg-red-100 text-red-800 border border-red-200' :
                            'bg-purple-100 text-purple-800 border border-purple-200'
                          }`}>
                            {lead.status.charAt(0) + lead.status.slice(1).toLowerCase()}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {lead.phone}
                          </div>
                          {lead.email && (
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {lead.email}
                            </div>
                          )}
                          {lead.service && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {lead.service}
                            </div>
                          )}
                        </div>
                        
                        {lead.notes && (
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {lead.notes}
                          </p>
                        )}
                        
                        {lead.followUpOn && (
                          <div className="mt-2 flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                            <Calendar className="w-4 h-4 mr-1" />
                            Follow up: {format(new Date(lead.followUpOn), 'MMM d, yyyy')}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="p-2.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      
                      <Link
                        href={`/dashboard/leads/${lead.id}/edit`}
                        className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                        title="Edit Lead"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      
                      <a
                        href={`https://wa.me/${lead.phone}?text=Hi ${encodeURIComponent(lead.name.split(' ')[0])},`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200"
                        title="WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      
                      <a
                        href={`tel:${lead.phone}`}
                        className="p-2.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                        title="Call"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      
                      <button className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads found</h3>
              <p className="text-gray-600 mb-6">Start building your pipeline by adding your first lead</p>
              <Link
                href="/dashboard/leads/new"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Lead
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}