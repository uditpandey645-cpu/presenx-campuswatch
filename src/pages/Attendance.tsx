import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { students, attendanceTrend, departments } from "@/lib/dummyData";

export default function Attendance() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "All" || s.department === dept;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Attendance Module</h1>
        <p className="text-muted-foreground text-sm mt-1">Track and manage student attendance records.</p>
      </div>

      {/* Trend Chart */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="font-heading font-semibold text-foreground mb-4">Weekly Attendance Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={attendanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
            <XAxis dataKey="date" stroke="hsl(220, 10%, 46%)" tick={{ fontSize: 12 }} />
            <YAxis stroke="hsl(220, 10%, 46%)" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="present" stroke="hsl(234, 85%, 56%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(234, 85%, 56%)" }} />
            <Line type="monotone" dataKey="absent" stroke="hsl(0, 72%, 51%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(0, 72%, 51%)" }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-3 justify-center">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><span className="text-sm text-muted-foreground">Present</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive" /><span className="text-sm text-muted-foreground">Absent</span></div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input placeholder="Search by name or roll..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground" />
        </div>
        <select value={dept} onChange={(e) => setDept(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none">
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none" />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Student Name</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Roll Number</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Department</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Attendance %</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{s.name}</td>
                  <td className="p-4 text-muted-foreground">{s.roll}</td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{s.department}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${s.attendance >= 75 ? "bg-alert-success" : s.attendance >= 50 ? "bg-alert-warning" : "bg-alert-critical"}`}
                          style={{ width: `${s.attendance}%` }} />
                      </div>
                      <span className="text-foreground font-medium">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      s.status === "Present" ? "bg-alert-success/10 text-alert-success" : "bg-alert-critical/10 text-alert-critical"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
