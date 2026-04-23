import { Users, UserCheck, UserX, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { summaryStats, alertDistribution, alerts, attendanceTrend } from "@/lib/dummyData";

const cards = [
  { label: "Total Students", value: summaryStats.totalStudents, icon: Users, trend: "+12%", up: true, color: "bg-primary/10 text-primary" },
  { label: "Present Today", value: summaryStats.presentToday, icon: UserCheck, trend: "+5%", up: true, color: "bg-alert-success/10 text-alert-success" },
  { label: "Absent Today", value: summaryStats.absentToday, icon: UserX, trend: "-3%", up: false, color: "bg-alert-warning/10 text-alert-warning" },
  { label: "Active Alerts", value: summaryStats.activeAlerts, icon: AlertTriangle, trend: "+2", up: true, color: "bg-alert-critical/10 text-alert-critical" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-heading font-bold text-foreground mt-1">{card.value.toLocaleString()}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {card.up ? <TrendingUp className="w-3 h-3 text-alert-success" /> : <TrendingDown className="w-3 h-3 text-alert-critical" />}
              <span className={`text-xs font-medium ${card.up && card.label !== "Active Alerts" ? "text-alert-success" : "text-alert-critical"}`}>
                {card.trend}
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Pie */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h3 className="font-heading font-semibold text-foreground mb-4">Attendance Overview</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={[{ name: "Present", value: 86.5 }, { name: "Absent", value: 13.5 }]} cx="50%" cy="50%" innerRadius={70} outerRadius={100} dataKey="value" strokeWidth={0}>
                  <Cell fill="hsl(234, 85%, 56%)" />
                  <Cell fill="hsl(220, 16%, 90%)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><span className="text-sm text-muted-foreground">Present (86.5%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-border" /><span className="text-sm text-muted-foreground">Absent (13.5%)</span></div>
          </div>
        </div>

        {/* Alerts Bar */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h3 className="font-heading font-semibold text-foreground mb-4">Alerts Today</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={alertDistribution}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {alertDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="font-heading font-semibold text-foreground mb-4">Recent Alerts</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className={`flex items-center gap-4 p-3 rounded-lg border ${
              alert.status === "Active" ? "border-alert-critical/20 bg-alert-critical/5" : "border-border bg-muted/30"
            }`}>
              <span className="text-xl">{alert.type === "fighting" ? "🚨" : alert.type === "weapon" ? "🔫" : alert.type === "fire" ? "🔥" : "⚡"}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{alert.location} • {alert.timestamp}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                alert.status === "Active" ? "bg-alert-critical/10 text-alert-critical" : "bg-alert-success/10 text-alert-success"
              }`}>
                {alert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
