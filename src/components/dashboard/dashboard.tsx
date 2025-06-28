'use client';
import { DashboardContent } from './dashboard-content';
import type { DashboardContentProps } from './dashboard-content';

export function Dashboard({ leads, totalLeads, newLeads, followUpLeads }: DashboardContentProps) {
  return (
    <DashboardContent 
      leads={leads} 
      totalLeads={totalLeads} 
      newLeads={newLeads} 
      followUpLeads={followUpLeads} 
    />
  );
}
