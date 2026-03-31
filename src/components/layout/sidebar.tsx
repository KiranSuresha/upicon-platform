"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  Bot,
  BookOpen,
  Workflow,
  Settings,
  ChevronDown,
  ChevronRight,
  UserCheck,
  ClipboardList,
  Search,
  BarChart3,
  Network,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  TrendingUp,
  Briefcase,
  Target,
  Shield,
  Bell,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeVariant?: "default" | "success" | "warning" | "danger" | "info";
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    label: "Command Center",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: "MD",
    badgeVariant: "info",
  },
  {
    label: "Banking & Inclusion",
    icon: Building2,
    badge: 4,
    badgeVariant: "warning",
    children: [
      { label: "BC Mobilize", href: "/banking/bc-mobilize", icon: Users },
      { label: "BC Onboard", href: "/banking/bc-onboard", icon: UserCheck, badge: 12, badgeVariant: "warning" },
      { label: "BCAssist", href: "/banking/bc-assist", icon: Bot },
      { label: "BC Quality Monitor", href: "/banking/bc-quality", icon: BarChart3 },
    ],
  },
  {
    label: "Consultancy & G2G",
    icon: Briefcase,
    badge: 2,
    badgeVariant: "danger",
    children: [
      { label: "DPR Copilot", href: "/consultancy/dpr-copilot", icon: FileText, badge: 23, badgeVariant: "info" },
      { label: "TEV Copilot", href: "/consultancy/tev-copilot", icon: TrendingUp },
      { label: "SurveyOps", href: "/consultancy/survey-ops", icon: ClipboardList },
      { label: "District Knowledge Hub", href: "/consultancy/knowledge-hub", icon: Network },
    ],
  },
  {
    label: "Training & Skilling",
    icon: GraduationCap,
    children: [
      { label: "Trainer OS", href: "/training/trainer-os", icon: GraduationCap, badge: 68, badgeVariant: "success" },
      { label: "Assessment Engine", href: "/training/assessment", icon: Target },
      { label: "Beneficiary Clone", href: "/training/beneficiary", icon: Users },
      { label: "Outcome Tracker", href: "/training/outcome-tracker", icon: BarChart3 },
    ],
  },
  {
    label: "AI Assistants",
    href: "/ai-assistants",
    icon: Bot,
    badge: "8",
    badgeVariant: "info",
  },
  {
    label: "Knowledge Base",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    label: "Workflows",
    href: "/workflows",
    icon: Workflow,
    badge: 3,
    badgeVariant: "danger",
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarItemProps {
  item: NavItem;
  depth?: number;
  collapsed?: boolean;
}

function SidebarItem({ item, depth = 0, collapsed = false }: SidebarItemProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => {
    if (item.children) {
      return item.children.some((child) => child.href === pathname || pathname.startsWith(child.href ?? "@@"));
    }
    return false;
  });

  const isActive = item.href
    ? pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
    : false;

  const hasChildren = Boolean(item.children?.length);

  if (hasChildren) {
    const isChildActive = item.children?.some(
      (child) => child.href && (pathname === child.href || pathname.startsWith(child.href))
    );

    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
            isChildActive
              ? "bg-upicon-600/10 text-upicon-600"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            depth > 0 && "pl-9"
          )}
        >
          <item.icon className={cn("shrink-0", depth === 0 ? "h-4.5 w-4.5" : "h-4 w-4")} size={depth === 0 ? 18 : 16} />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant={item.badgeVariant ?? "default"} className="text-[10px] h-4 px-1.5">
                  {item.badge}
                </Badge>
              )}
              {open ? (
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              )}
            </>
          )}
        </button>
        {open && !collapsed && (
          <div className="mt-0.5 ml-2 border-l border-slate-200 pl-2 space-y-0.5">
            {item.children?.map((child) => (
              <SidebarItem key={child.label} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-upicon-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        depth > 0 && "pl-9"
      )}
    >
      <item.icon size={depth === 0 ? 18 : 16} className="shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <Badge
              variant={isActive ? "default" : (item.badgeVariant ?? "default")}
              className={cn("text-[10px] h-4 px-1.5", isActive && "bg-white/20 text-white border-0")}
            >
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </Link>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col bg-white border-r border-slate-200 transition-all duration-300 h-screen sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-4 border-b border-slate-200", collapsed && "px-3 justify-center")}>
        <div className="w-8 h-8 bg-upicon-600 rounded-lg flex items-center justify-center shrink-0">
          <Shield className="h-4.5 w-4.5 text-white" size={18} />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-slate-900 text-sm leading-tight">UPICON</p>
            <p className="text-[10px] text-slate-500 leading-tight">Command Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navigation.map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Footer: user + collapse toggle */}
      <div className="border-t border-slate-200">
        {!collapsed && (
          <div className="px-3 py-3">
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer">
              <div className="w-8 h-8 bg-upicon-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                MD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">MD Office</p>
                <p className="text-xs text-slate-500 truncate">md@upicon.in</p>
              </div>
              <Bell className="h-4 w-4 text-slate-400 shrink-0" />
            </div>
          </div>
        )}
        <div className={cn("px-3 py-2 border-t border-slate-100", collapsed && "flex justify-center")}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md w-full transition-colors"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4 mx-auto" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span>Collapse sidebar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
