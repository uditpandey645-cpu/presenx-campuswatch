import { useState } from "react";
import { AlertTriangle, Flame, Zap, Swords, Crosshair } from "lucide-react";
import { alerts } from "@/lib/dummyData";

const alertConfig = {
  fighting: { icon: "🚨", label: "Student Violation", borderColor: "border-alert-moderate", bgColor: "bg-alert-moderate/5", badgeColor: "bg-alert-moderate/10 text-alert-moderate" },
  weapon: { icon: "🔫", label: "Weapon Detection", borderColor: "border-alert-critical", bgColor: "bg-alert-critical/5", badgeColor: "bg-alert-critical/10 text-alert-critical" },
  fire: { icon: "🔥", label: "Fire Alert", borderColor: "border-alert-critical", bgColor: "bg-alert-critical/5", badgeColor: "bg-alert-critical/10 text-alert-critical" },
  shortcircuit: { icon: "⚡", label: "Short Circuit", borderColor: "border-alert-warning", bgColor: "bg-alert-warning/5", badgeColor: "bg-alert-warning/10 text-alert-warning" },
};

const typeCards = [
  { type: "fighting" as const, emoji: "🚨", title: "Student Violation", desc: "Physical altercations and violations", count: 2, severity: "Moderate", color: "border-l-alert-moderate bg-alert-moderate/5" },
  { type: "weapon" as const, emoji: "🔫", title: "Weapon Detection", desc: "Detected weapon threats on campus", count: 1, severity: "Critical", color: "border-l-alert-critical bg-alert-critical/5" },
  { type: "fire" as const, emoji: "🔥", title: "Fire Alert", desc: "Smoke and fire detection alerts", count: 2, severity: "Critical", color: "border-l-alert-critical bg-alert-critical/5" },
  { type: "shortcircuit" as const, emoji: "⚡", title: "Short Circuit", desc: "Electrical hazard warnings", count: 1, severity: "Warning", color: "border-l-alert-warning bg-alert-warning/5" },
];

export default function Alerts() {
  const [filter, setFilter] = useState<string>("all");
  const activeAlerts = alerts.filter((a) => a.status === "Active").length;
  const filteredAlerts = filter === "all" ? alerts : alerts.filter((a) => a.type === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Alert Monitoring</h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time AI-based safety alert monitoring.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-alert-critical/10 text-alert-critical px-3 py-1.5 rounded-full text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-alert-critical animate-pulse" />
            {activeAlerts} Active Alerts
          </span>
        </div>
      </div>

      {/* Alert Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {typeCards.map((card, i) => (
          <button key={i} onClick={() => setFilter(filter === card.type ? "all" : card.type)}
            className={`text-left p-5 rounded-xl border-l-4 border border-border shadow-sm hover:shadow-md transition-all ${card.color} ${filter === card.type ? "ring-2 ring-primary" : ""}`}>
            <span className="text-3xl">{card.emoji}</span>
            <h3 className="font-heading font-semibold text-foreground mt-3">{card.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-lg font-bold text-foreground">{card.count}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                card.severity === "Critical" ? "bg-alert-critical/10 text-alert-critical" :
                card.severity === "Moderate" ? "bg-alert-moderate/10 text-alert-moderate" :
                "bg-alert-warning/10 text-alert-warning"
              }`}>{card.severity}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Real-time Feed */}
      <div className="bg-card rounded-xl border border-border shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-heading font-semibold text-foreground">Alert Feed</h3>
          <span className="text-xs text-muted-foreground">{filteredAlerts.length} alerts</span>
        </div>
        <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
          {filteredAlerts.map((alert) => {
            const config = alertConfig[alert.type];
            return (
              <div key={alert.id} className={`p-4 flex items-start gap-4 hover:bg-muted/30 transition-colors ${alert.status === "Active" ? config.bgColor : ""}`}>
                <span className="text-2xl mt-0.5">{config.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium text-foreground text-sm">{alert.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${config.badgeColor}`}>{config.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">📍 {alert.location}</p>
                  <p className="text-xs text-muted-foreground">🕐 {alert.timestamp}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    alert.status === "Active" ? "bg-alert-critical/10 text-alert-critical" : "bg-alert-success/10 text-alert-success"
                  }`}>{alert.status}</span>
                  <p className="text-[10px] text-muted-foreground mt-1">{alert.severity}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
