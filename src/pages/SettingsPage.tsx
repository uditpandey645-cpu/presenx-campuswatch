import { Bell, Shield, User, Monitor } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure your admin portal preferences.</p>
      </div>
      {[
        { icon: User, title: "Profile", desc: "Update your admin profile and credentials" },
        { icon: Bell, title: "Notifications", desc: "Configure alert notification preferences" },
        { icon: Shield, title: "Security", desc: "Two-factor authentication and access control" },
        { icon: Monitor, title: "System", desc: "Camera feeds, AI sensitivity, and monitoring zones" },
      ].map((s, i) => (
        <div key={i} className="bg-card rounded-xl p-5 border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="p-3 rounded-lg bg-primary/10">
            <s.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground text-sm">{s.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
