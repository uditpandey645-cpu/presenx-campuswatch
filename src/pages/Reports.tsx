import { FileText, Download, Calendar } from "lucide-react";

const reports = [
  { title: "Monthly Attendance Report", date: "March 2024", type: "Attendance", size: "2.4 MB" },
  { title: "Safety Incident Summary", date: "March 2024", type: "Safety", size: "1.8 MB" },
  { title: "Department Performance", date: "Q1 2024", type: "Analytics", size: "3.1 MB" },
  { title: "Alert Response Metrics", date: "March 2024", type: "Safety", size: "1.2 MB" },
  { title: "Student Risk Assessment", date: "March 2024", type: "Analytics", size: "2.7 MB" },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground text-sm mt-1">Download and review generated reports.</p>
      </div>
      <div className="grid gap-4">
        {reports.map((r, i) => (
          <div key={i} className="bg-card rounded-xl p-5 border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm">{r.title}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{r.date}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{r.type}</span>
                <span className="text-xs text-muted-foreground">{r.size}</span>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Download className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
