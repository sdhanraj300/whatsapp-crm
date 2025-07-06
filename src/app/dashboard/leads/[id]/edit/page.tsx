import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { LeadForm } from '@/components/LeadForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit3, User, Save, X, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function EditLeadPage({
  params,
}: PageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  if (!session?.user?.email) {
    redirect('/login');
  }

  const lead = await prisma.lead.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  if (!lead) {
    redirect('/dashboard/leads');
  }

  const formattedCreatedAt = format(new Date(lead.createdAt), 'MMM d, yyyy h:mm a');
  const formattedUpdatedAt = format(new Date(lead.updatedAt), 'MMM d, yyyy h:mm a');

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/dashboard/leads/${id}`} className="group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white shadow-sm border hover:shadow-md transition-all duration-200 group-hover:scale-105"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                  <span className="sr-only">Back to lead details</span>
                </Button>
              </Link>
              <div>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center space-x-2">
                      <Edit3 className="h-7 w-7 text-blue-600" />
                      <span>Edit Lead</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Updating details for {lead.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link href={`/dashboard/leads/${id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Edit3 className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Lead Information
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      Update the lead details below. All changes will be saved automatically.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="rounded-2xl bg-gradient-to-br from-slate-50/50 to-blue-50/30 p-6 border border-gray-100">
                  <LeadForm
                    initialData={{
                      id: lead.id,
                      name: lead.name,
                      email: lead.email || '',
                      phone: lead.phone,
                      service: lead.service || '',
                      status: lead.status as 'NEW' | 'CONTACTED' | 'CLOSED' | 'LOST',
                      source: lead.source || '',
                      followUpOn: lead.followUpOn ? new Date(lead.followUpOn) : undefined,
                      notes: lead.notes || '',
                    }}
                    isEdit
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lead Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg">Lead Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <p className="text-sm font-medium text-blue-800 mb-1">Current Name</p>
                  <p className="font-semibold text-blue-900 truncate">{lead.name}</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <p className="text-sm font-medium text-green-800 mb-1">Phone Number</p>
                  <p className="font-semibold text-green-900">{lead.phone}</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <p className="text-sm font-medium text-purple-800 mb-1">Current Status</p>
                  <p className="font-semibold text-purple-900">{lead.status.replace('_', ' ')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Save className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  type="submit"
                  form="lead-form"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Link href={`/dashboard/leads/${id}`} className="block">
                  <Button
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel & Return
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Timestamps */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg">Timeline</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Created</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{formattedCreatedAt}</p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Last Updated</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{formattedUpdatedAt}</p>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-xl ring-1 ring-amber-100">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <Edit3 className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg text-amber-900">Editing Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-amber-800">
                  <p className="flex items-start space-x-2">
                    <span className="font-semibold">•</span>
                    <span>Changes are saved automatically when you submit the form</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <span className="font-semibold">•</span>
                    <span>Use the status field to track lead progress</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <span className="font-semibold">•</span>
                    <span>Add detailed notes for better follow-up context</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}