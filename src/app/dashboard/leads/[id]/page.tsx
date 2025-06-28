import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Calendar, User, Mail, Clock, MessageSquare, MapPin, Info, MessageCircle, Pencil, Trash2, ArrowLeft, Star, Activity, Eye } from 'lucide-react';
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function LeadDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  if (!session?.user?.email) {
    return notFound();
  }

  const lead = await prisma.lead.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  if (!lead) {
    return notFound();
  }

  // Format dates for display
  const formattedCreatedAt = format(new Date(lead.createdAt), 'MMM d, yyyy h:mm a');
  const formattedUpdatedAt = format(new Date(lead.updatedAt), 'MMM d, yyyy h:mm a');
  const formattedFollowUp = lead.followUpOn ? format(new Date(lead.followUpOn), 'MMM d, yyyy') : 'Not set';

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; color: string }> = {
      NEW: { label: 'New', variant: 'default', color: 'bg-blue-100 text-blue-800 border-blue-200' },
      CONTACTED: { label: 'Contacted', variant: 'default', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      FOLLOW_UP: { label: 'Follow Up', variant: 'outline', color: 'bg-purple-100 text-purple-800 border-purple-200' },
      CLOSED: { label: 'Closed', variant: 'secondary', color: 'bg-green-100 text-green-800 border-green-200' },
      LOST: { label: 'Lost', variant: 'destructive', color: 'bg-red-100 text-red-800 border-red-200' },
    };

    const statusInfo = statusMap[status] || { label: status, variant: 'outline', color: 'bg-gray-100 text-gray-800 border-gray-200' };
    return (
      <Badge className={`${statusInfo.color} font-medium border transition-colors hover:shadow-sm`}>
        {statusInfo.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NEW': return <Star className="h-4 w-4 text-blue-600" />;
      case 'CONTACTED': return <Eye className="h-4 w-4 text-yellow-600" />;
      case 'FOLLOW_UP': return <Clock className="h-4 w-4 text-purple-600" />;
      case 'CLOSED': return <Activity className="h-4 w-4 text-green-600" />;
      case 'LOST': return <Trash2 className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/leads" className="group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white shadow-sm border hover:shadow-md transition-all duration-200 group-hover:scale-105"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                  <span className="sr-only">Back to leads</span>
                </Button>
              </Link>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {lead.name}
                  </h1>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(lead.status)}
                    {getStatusBadge(lead.status)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1 flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Created on {formattedCreatedAt}</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link href={`/dashboard/leads/${id}/edit`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Lead
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-gray-900">{lead.name}</CardTitle>
                    <CardDescription className="text-base mt-1 flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{lead.email || 'No email provided'}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Phone */}
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors duration-200 group">
                  <div className="rounded-xl bg-green-500 p-3 shadow-lg group-hover:scale-105 transition-transform duration-200">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">Phone Number</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-lg font-semibold text-green-700 hover:text-green-800 hover:underline transition-colors"
                      >
                        {lead.phone}
                      </a>
                      <a
                        href={`https://wa.me/${lead.phone}?text=Hi ${encodeURIComponent(lead.name.split(' ')[0])},`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors shadow-sm"
                        title="Message on WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                {lead.email && (
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors duration-200 group">
                    <a href={`mailto:${lead.email}`} className="block">
                      <div className="rounded-xl bg-blue-500 p-3 shadow-lg group-hover:scale-105 transition-transform duration-200">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                    </a>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-800">Email Address</p>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-lg font-semibold text-blue-700 hover:text-blue-800 hover:underline transition-colors mt-1 block"
                      >
                        {lead.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Source */}
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors duration-200 group">
                  <div className="rounded-xl bg-purple-500 p-3 shadow-lg group-hover:scale-105 transition-transform duration-200">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-800">Lead Source</p>
                    <p className="text-lg font-semibold text-purple-700 mt-1">{lead.source || 'Not specified'}</p>
                  </div>
                </div>

                {/* Follow-up */}
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition-colors duration-200 group">
                  <div className="rounded-xl bg-orange-500 p-3 shadow-lg group-hover:scale-105 transition-transform duration-200">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-800">Follow-up Date</p>
                    <p className="text-lg font-semibold text-orange-700 mt-1">{formattedFollowUp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Notes & Comments</CardTitle>
                    <CardDescription>Additional information about this lead</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-100">
                  {lead.notes ? (
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed">{lead.notes}</p>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 italic">No notes available for this lead</p>
                      <Button variant="ghost" size="sm" className="mt-2 text-blue-600 hover:text-blue-700">
                        <Pencil className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message on WhatsApp
                </Button>
                <Button variant="outline" className="w-full bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 shadow-sm hover:shadow-md transition-all duration-200">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full bg-white hover:bg-purple-50 border-purple-200 hover:border-purple-300 text-purple-700 hover:text-purple-800 shadow-sm hover:shadow-md transition-all duration-200">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </Button>
              </CardContent>
            </Card>

            {/* Lead Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Info className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg">Lead Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <p className="text-sm font-medium text-blue-800 mb-1">Status</p>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(lead.status)}
                    <span className="font-semibold text-blue-900">{lead.status.replace('_', ' ')}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-1">Created</p>
                  <p className="font-semibold text-gray-900">{formattedCreatedAt}</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-1">Last Updated</p>
                  <p className="font-semibold text-gray-900">{formattedUpdatedAt}</p>
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">Lead created</p>
                      <p className="text-xs text-green-600">{formattedCreatedAt}</p>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No recent activity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}