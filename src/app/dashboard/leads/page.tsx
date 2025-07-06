'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Plus, Users, Star, TrendingUp, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
  });

  const handleDeleteClick = (id: string) => {
    setLeadToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!leadToDelete) return;
    
    try {
      try {
        const response = await fetch(`/api/leads?id=${leadToDelete}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadToDelete));
          
          // Update stats
          const newLeads = leads.filter(lead => lead.id !== leadToDelete);
          const newTotalLeads = newLeads.length;
          const newNewLeads = newLeads.filter(lead => lead.status === 'NEW').length;
          const newQualifiedLeads = newLeads.filter(lead => lead.status === 'QUALIFIED').length;
          const newConversionRate = newTotalLeads > 0 
            ? Math.round((newQualifiedLeads / newTotalLeads) * 100) 
            : 0;
          
          setStats({
            totalLeads: newTotalLeads,
            newLeads: newNewLeads,
            qualifiedLeads: newQualifiedLeads,
            conversionRate: newConversionRate,
          });
          toast.success('Lead deleted successfully');
        } else {
          const errorData = await response.json();
          toast.error(errorData.error || 'Failed to delete lead');
        }
      } catch (error) {
        console.error('Error deleting lead:', error);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/leads', {
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Prevent caching
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to fetch leads');
        }
        
        const data = await response.json();
        setLeads(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching leads:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to load leads');
        setLeads([]); // Reset to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Lead</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this lead? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await handleDelete();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
                <p className="text-gray-600">Manage your sales pipeline</p>
              </div>
              <Link
                href="/dashboard/leads/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Total Leads</p>
            <p className="text-2xl font-bold">{stats.totalLeads}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">New Leads</p>
            <p className="text-2xl font-bold">{stats.newLeads}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Qualified</p>
            <p className="text-2xl font-bold">{stats.qualifiedLeads}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-bold">{stats.conversionRate}%</p>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search leads..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads
                  .filter(lead => 
                    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    lead.phone.includes(searchQuery)
                  )
                  .map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {lead.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {lead.email || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          lead.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                          lead.status === 'QUALIFIED' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(lead.updatedAt), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                        <Link 
                          href={`/dashboard/leads/${lead.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        <Link 
                          href={`/dashboard/leads/${lead.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteClick(lead.id);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showDeleteModal && <DeleteConfirmationModal />}
    </div>
  );
}