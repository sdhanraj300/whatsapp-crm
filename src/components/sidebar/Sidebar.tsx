'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Users, Settings, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  appName: string;
}

export function Sidebar({ appName }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'Leads', href: '/dashboard/leads', icon: <Users className="h-5 w-5" /> },
    { name: 'Chat', href: '/dashboard/chat', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className={cn(
      "relative h-full bg-gray-900 text-gray-300 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-6">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-white">{appName}</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:bg-gray-800 hover:text-white ml-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="p-2">
        <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          {!isCollapsed && 'New Chat'}
        </Button>
      </div>

      <nav className="mt-2">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg p-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <span className={cn("flex items-center", isCollapsed ? "mx-auto" : "mr-3")}>
                    {item.icon}
                  </span>
                  {!isCollapsed && item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                U
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">User Name</p>
                <p className="text-xs text-gray-400">Free Plan</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
