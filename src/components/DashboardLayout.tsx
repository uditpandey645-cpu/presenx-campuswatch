import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Users, AlertTriangle, BarChart3, FileText, Settings,
  Bell, Search, Menu, X, ChevronDown, LogOut
} from "lucide-react";
import { summaryStats } from "@/lib/dummyData";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Attendance", path: "/dashboard/attendance", icon: Users },
  { title: "Alerts", path: "/dashboard/alerts", icon: AlertTriangle },
  { title: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  { title: "Reports", path: "/dashboard/reports", icon: FileText },
  { title: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/dashboard" ? location.pathname === path : location.pathname.startsWith(path);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
          <span className="font-heading font-bold text-primary-foreground text-sm">PX</span>
        </div>
        {sidebarOpen && <span className="font-heading font-bold text-lg text-sidebar-primary-foreground">PresenX</span>}
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>{item.title}</span>}
            {item.title === "Alerts" && summaryStats.activeAlerts > 0 && sidebarOpen && (
              <span className="ml-auto bg-alert-critical text-primary-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
                {summaryStats.activeAlerts}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-sidebar animate-slide-up">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-sidebar-foreground">
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { if (window.innerWidth < 1024) setMobileOpen(true); else setSidebarOpen(!sidebarOpen); }}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search..."
                className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {summaryStats.activeAlerts > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-alert-critical text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {summaryStats.activeAlerts}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                AD
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
