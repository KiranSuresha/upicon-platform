"use client";

import { useState } from "react";
import { Search, Bell, HelpCircle, ChevronDown, Settings, LogOut, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const notifications = [
  { id: 1, message: "BC004 — Kavita Patel document check SLA breach in 12 hrs", type: "warning", time: "2 min ago" },
  { id: 2, message: "DPR004 — SHG Enterprise Cluster review loop exceeded", type: "danger", time: "18 min ago" },
  { id: 3, message: "New BC lead batch from Gorakhpur — 42 leads", type: "info", time: "1 hr ago" },
];

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center gap-4 px-6 sticky top-0 z-20">
      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-slate-900 truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs text-slate-500 truncate">{subtitle}</p>
        )}
      </div>

      {/* Search */}
      <div className="relative hidden md:flex w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search across UPICON..."
          className="pl-8 h-8 text-sm bg-slate-50 border-slate-200"
        />
      </div>

      {/* Actions */}
      {actions && <div className="flex items-center gap-2">{actions}</div>}

      {/* Notifications */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
        {showNotifications && (
          <div className="absolute right-0 top-10 w-80 bg-white rounded-xl border border-slate-200 shadow-lg z-50">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Notifications</span>
              <Badge variant="danger" className="text-[10px]">3 new</Badge>
            </div>
            <div className="divide-y divide-slate-100">
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                  <p className="text-xs text-slate-700 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-slate-100">
              <button className="text-xs text-upicon-600 font-medium hover:underline">
                View all notifications
              </button>
            </div>
          </div>
        )}
      </div>

      <Button variant="ghost" size="icon" className="h-8 w-8">
        <HelpCircle className="h-4 w-4" />
      </Button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <div className="w-7 h-7 bg-upicon-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            MD
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
        {showProfile && (
          <div className="absolute right-0 top-10 w-48 bg-white rounded-xl border border-slate-200 shadow-lg z-50">
            <div className="px-3 py-2.5 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-900">MD Office</p>
              <p className="text-xs text-slate-500">md@upicon.in</p>
            </div>
            <div className="p-1">
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md">
                <User className="h-4 w-4" />
                Profile
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md">
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
