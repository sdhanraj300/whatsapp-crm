'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  Plus, 
  TrendingUp, 
  ArrowUpRight, 
  Eye,
  Sparkles,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// ==================== TYPES ====================

export interface DashboardContentProps {
  leads: Array<{
    id: string;
    name: string;
    email: string | null;
    phone: string;
    status: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    followUpOn: string | Date | null;
  }>;
  totalLeads: number;
  newLeads: number;
  followUpLeads: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
  gradient: string;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
  animation?: string;
}

// ==================== COMPONENTS ====================

const FloatingOrb = ({ 
  className, 
  delay = 0, 
  duration = 6 
}: { 
  className: string; 
  delay?: number; 
  duration?: number; 
}) => (
  <div 
    className={`absolute rounded-full blur-3xl opacity-5 animate-pulse ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  />
);

const GlassCard = ({ 
  children, 
  className = "", 
  hover = true 
}: { 
  children: React.ReactNode; 
  className?: string; 
  hover?: boolean; 
}) => (
  <Card className={`
    group relative overflow-hidden 
    bg-white/90 backdrop-blur-xl border border-gray-200/60
    shadow-xl shadow-gray-900/10
    ${hover ? 'transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/30' : ''}
    ${className}
  `}>
    {/* Shimmer effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    {children}
  </Card>
);

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  gradient, 
  color, 
  trend = 'up',
  animation = '' 
}: StatCardProps) => {
  const trendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingUp : Activity;
  const TrendIcon = trendIcon;
  
  return (
    <GlassCard className={`group ${animation}`}>
      {/* Gradient overlay on hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${gradient} 
        opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700
      `} />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />

      <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-4 space-y-0">
        <CardTitle className="text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-500 tracking-wide uppercase">
          {title}
        </CardTitle>
        <div className={`
          relative p-3 rounded-2xl bg-gradient-to-br ${gradient} 
          shadow-lg group-hover:scale-110 group-hover:rotate-3
          transition-all duration-500 ease-out
          before:absolute before:inset-0 before:rounded-2xl before:bg-white/20 before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-300
        `}>
          <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 pb-6">
        <div className="mb-3">
          <div className="text-4xl font-black text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-cyan-600 transition-all duration-500">
            {value.toLocaleString()}
          </div>
        </div>
        
        {description && (
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-full bg-gradient-to-r ${gradient} bg-opacity-20`}>
              <TrendIcon className={`h-3 w-3 text-white ${trend === 'down' ? 'rotate-180' : ''} transition-transform duration-300`} />
            </div>
            <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-300 font-medium">
              {description}
            </p>
          </div>
        )}
      </CardContent>
    </GlassCard>
  );
};

const EmptyLeadsState = () => (
  <div className="text-center py-16 animate-fade-in">
    <div className="relative mb-8">
      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 flex items-center justify-center backdrop-blur-sm border border-gray-200">
        <Users className="h-12 w-12 text-purple-500" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
        <Sparkles className="h-4 w-4 text-white" />
      </div>
    </div>
    
    <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
      Your lead management journey begins here. Add your first lead and watch your business grow.
    </p>
    
    <Button className="
      bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 
      hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 
      border-0 shadow-2xl shadow-purple-500/25
      transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:shadow-purple-500/40
      px-8 py-6 text-base font-semibold text-white
      group relative overflow-hidden
    " asChild>
      <Link href="/dashboard/leads/new">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Plus className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        Add Your First Lead
      </Link>
    </Button>
  </div>
);

const LeadItem = ({ lead, index }: { lead: DashboardContentProps['leads'][0]; index: number }) => {
  const getStatusConfig = (status: string) => {
    const configs = {
      new: { gradient: 'from-emerald-500 to-green-400', bg: 'from-emerald-500/10 to-green-400/10', text: 'New Lead' },
      contacted: { gradient: 'from-blue-500 to-cyan-400', bg: 'from-blue-500/10 to-cyan-400/10', text: 'Contacted' },
      qualified: { gradient: 'from-purple-500 to-pink-400', bg: 'from-purple-500/10 to-pink-400/10', text: 'Qualified' },
      follow_up: { gradient: 'from-orange-500 to-red-400', bg: 'from-orange-500/10 to-red-400/10', text: 'Follow Up' },
      default: { gradient: 'from-gray-500 to-slate-400', bg: 'from-gray-500/10 to-slate-400/10', text: 'Unknown' }
    };
    return configs[status.toLowerCase() as keyof typeof configs] || configs.default;
  };

  const statusConfig = getStatusConfig(lead.status);
  
  return (
    <div
      className="
        group flex items-center justify-between p-5 rounded-2xl
        bg-gradient-to-r from-gray-50/80 via-white/60 to-gray-50/40
        backdrop-blur-sm border border-gray-200/60
        hover:border-purple-400/50 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/30
        transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20
        transform-gpu animate-slide-up relative overflow-hidden
      "
      style={{ 
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="flex items-center gap-5 relative z-10">
        <div className={`
          w-14 h-14 rounded-2xl bg-gradient-to-br ${statusConfig.bg} 
          flex items-center justify-center border border-gray-200
          group-hover:scale-110 transition-transform duration-300
        `}>
          <Users className="h-6 w-6 text-gray-600" />
        </div>
        
        <div className="space-y-1">
          <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 text-lg">
            {lead.name || 'Unnamed Lead'}
          </h4>
          <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300 font-medium">
            {lead.email || lead.phone || 'No contact info'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 relative z-10">
        <div className={`
          px-4 py-2 rounded-xl bg-gradient-to-r ${statusConfig.gradient} 
          text-white text-sm font-bold shadow-lg
          group-hover:scale-105 transition-transform duration-300
        `}>
          {statusConfig.text}
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300 font-medium">
            {new Date(lead.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </div>
        
        <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
      </div>
    </div>
  );
};

const RecentLeads = ({ leads }: { leads: DashboardContentProps['leads'] }) => {
  if (leads.length === 0) {
    return <EmptyLeadsState />;
  }

  return (
    <div className="space-y-5">
      {leads.map((lead, index) => (
        <LeadItem key={lead.id} lead={lead} index={index} />
      ))}
    </div>
  );
};

const QuickActionButton = ({ 
  href, 
  icon: Icon, 
  children, 
  variant = 'default',
  count 
}: { 
  href: string; 
  icon: any; 
  children: React.ReactNode; 
  variant?: 'default' | 'urgent';
  count?: number;
}) => (
  <Button 
    variant="outline" 
    className={`
      w-full justify-start group relative overflow-hidden
      ${variant === 'urgent' 
        ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300 text-orange-700 hover:from-orange-100 hover:to-red-100 hover:border-orange-400' 
        : 'bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100/80 hover:border-purple-400/50'
      }
      transition-all duration-500 hover:scale-105 hover:shadow-lg
      backdrop-blur-sm py-6
    `} 
    asChild
  >
    <Link href={href}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <Icon className="mr-4 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
      <span className="font-semibold">{children}</span>
      {count && (
        <span className={`
          ml-auto px-3 py-1 rounded-full text-xs font-bold
          ${variant === 'urgent' 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
          }
        `}>
          {count}
        </span>
      )}
    </Link>
  </Button>
);

// ==================== MAIN COMPONENT ====================

export function DashboardContent({ leads, totalLeads, newLeads, followUpLeads }: DashboardContentProps) {
  return (
    <div className="w-full lg:pl-12 min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb className="top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-600" delay={0} />
        <FloatingOrb className="bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-600 to-cyan-600" delay={2} />
        <FloatingOrb className="top-3/4 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-600 to-green-600" delay={4} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[length:50px_50px]" />
      </div>

      <div className="relative z-10 space-y-10 p-8">
        {/* Enhanced Header */}
        <div className="flex flex-col justify-between space-y-8 lg:flex-row lg:space-y-0 lg:items-end">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-pink-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                  Dashboard
                </h1>
                <p className="text-gray-600 text-lg md:text-xl font-medium mt-2">
                  Welcome back! Here's your business overview.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button className="
              bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 
              hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 
              border-0 shadow-2xl shadow-purple-500/25
              transition-all duration-500 hover:scale-110 hover:shadow-3xl
              px-8 py-6 text-lg font-bold text-white
              group relative overflow-hidden
            " asChild>
              <Link href="/dashboard/leads/new">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Plus className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                Add New Lead
              </Link>
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Leads"
            value={totalLeads}
            icon={<Target className="h-6 w-6" />}
            description="+20% from last month"
            gradient="from-purple-600 to-pink-600"
            color="text-purple-400"
            trend="up"
            animation="animate-fade-in-up"
          />
          <StatCard
            title="New Leads"
            value={newLeads}
            icon={<Sparkles className="h-6 w-6" />}
            description="+5 from yesterday"
            gradient="from-emerald-600 to-green-500"
            color="text-emerald-400"
            trend="up"
            animation="animate-fade-in-up [animation-delay:150ms]"
          />
          <StatCard
            title="Follow Up"
            value={followUpLeads}
            icon={<Clock className="h-6 w-6" />}
            description="Needs attention"
            gradient="from-orange-600 to-red-500"
            color="text-orange-400"
            trend="neutral"
            animation="animate-fade-in-up [animation-delay:300ms]"
          />
          <StatCard
            title="Messages Sent"
            value={0}
            icon={<MessageSquare className="h-6 w-6" />}
            description="+20% from last month"
            gradient="from-blue-600 to-cyan-500"
            color="text-blue-400"
            trend="up"
            animation="animate-fade-in-up [animation-delay:450ms]"
          />
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Leads */}
          <GlassCard className="lg:col-span-2">
            <CardHeader className="border-b border-gray-200 pb-6">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">Recent Leads</span>
                <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {leads.length} of {totalLeads}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <RecentLeads leads={leads} />
            </CardContent>
          </GlassCard>

          {/* Enhanced Quick Actions */}
          <GlassCard>
            <CardHeader className="border-b border-gray-200 pb-6">
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <QuickActionButton href="/dashboard/leads/new" icon={Plus}>
                Add New Lead
              </QuickActionButton>
              
              <QuickActionButton href="/dashboard/leads" icon={Eye}>
                View All Leads
              </QuickActionButton>
              
              {followUpLeads > 0 && (
                <QuickActionButton 
                  href="/dashboard/leads?filter=follow_up" 
                  icon={Clock}
                  variant="urgent"
                  count={followUpLeads}
                >
                  View Follow-ups
                </QuickActionButton>
              )}
            </CardContent>
          </GlassCard>
        </div>

        {/* Enhanced Analytics Section */}
        <GlassCard>
          <CardHeader className="border-b border-gray-200 pb-6">
            <CardTitle className="text-2xl text-gray-900 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center shadow-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold">Analytics Overview</span>
              <span className="ml-auto text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Coming Soon
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-80 flex items-center justify-center rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 border border-gray-200 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_50%)] animate-pulse" />
              
              <div className="text-center relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 via-pink-100 to-cyan-100 flex items-center justify-center backdrop-blur-sm border border-gray-200">
                  <TrendingUp className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Advanced Analytics</h3>
                <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                  Get detailed insights into your lead conversion patterns and performance metrics.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-600">
                  <Sparkles className="h-4 w-4" />
                  <span>Feature in development</span>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}