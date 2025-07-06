import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactActions } from '@/components/ContactActions';
import prisma from '@/lib/prisma';
import { Mail, MapPin, User, Calendar, ArrowLeft, Pencil, Clock, MessageCircle, Phone } from 'lucide-react';
import { ContactActionButtons } from '@/components/ContactActionButtons';

interface LeadDetailPageProps {
  params: { id: string };
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
  });

  if (!lead) return notFound();

  const formatDate = (date: Date | null) => (date ? format(new Date(date), 'MMM d, yyyy') : 'Not set');
  const formatDateTime = (date: Date | null) => (date ? format(new Date(date), 'MMM d, yyyy h:mm a') : 'Not set');

  const getStatusBadge = (status: string) => ({
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-purple-100 text-purple-800',
    qualified: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800',
  }[status.toLowerCase()] || 'bg-gray-100 text-gray-800');

  const formattedCreatedAt = formatDateTime(lead.createdAt);
  const formattedUpdatedAt = formatDateTime(lead.updatedAt);
  const formattedFollowUp = lead.followUpOn ? formatDate(lead.followUpOn) : 'Not set';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/leads">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
              <p className="text-sm text-gray-500">View and manage lead information</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/dashboard/leads/${lead.id}/edit`}>
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Lead
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info Card */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
                    <Badge className={`mt-2 ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {lead.phone}
                    </p>
                  </div>

                  {lead.email && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-lg font-semibold text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {lead.email}
                      </a>
                    </div>
                  )}

                  {lead.service && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Service</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {lead.service}
                      </p>
                    </div>
                  )}

                  {lead.notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Notes</p>
                      <p className="mt-1 text-gray-700 whitespace-pre-line">
                        {lead.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Follow-up Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-semibold">Follow-up</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Scheduled for</p>
                    <p className="text-lg font-semibold">
                      {formattedFollowUp}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Reschedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ContactActionButtons 
                  phone={lead.phone} 
                  name={lead.name} 
                  email={lead.email}
                  variant="outline"
                />
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>

            {/* Lead Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold">Lead Information</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="mt-1 flex items-center">
                    <Badge className={getStatusBadge(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Source</p>
                  <p className="mt-1 text-gray-900">{lead.source || 'Not specified'}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="mt-1 text-gray-900">{formattedCreatedAt}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="mt-1 text-gray-900">{formattedUpdatedAt}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
