import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { attendanceTrend, departmentAttendance, alertFrequency, alertDistribution, alertLocations } from "@/lib/dummyData";

const slides = ["Attendance Analytics", "Alert Analytics", "Safety Insights"];

export default function Analytics() {
  const [slide, setSlide] = useState(0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Deep insights into attendance and safety data.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSlide(Math.max(0, slide - 1))} disabled={slide === 0}
            className="p-2 rounded-lg bg-card border border-border hover:bg-muted disabled:opacity-30 transition-colors">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <span className="text-sm text-muted-foreground px-2">{slide + 1} / {slides.length}</span>
          <button onClick={() => setSlide(Math.min(slides.length - 1, slide + 1))} disabled={slide === slides.length - 1}
            className="p-2 rounded-lg bg-card border border-border hover:bg-muted disabled:opacity-30 transition-colors">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex gap-2 justify-center">
        {slides.map((s, i) => (
          <button key={i} onClick={() => setSlide(i)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === slide ? "gradient-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}>
            {s}
          </button>
        ))}
      </div>

      {/* Slide Content */}
      <div className="animate-fade-in" key={slide}>
        {slide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm lg:col-span-2">
              <h3 className="font-heading font-semibold text-foreground mb-4">Daily Attendance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                  <XAxis dataKey="date" stroke="hsl(220, 10%, 46%)" />
                  <YAxis stroke="hsl(220, 10%, 46%)" />
                  <Tooltip />
                  <Line type="monotone" dataKey="present" stroke="hsl(234, 85%, 56%)" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="absent" stroke="hsl(0, 72%, 51%)" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="font-heading font-semibold text-foreground mb-4">Department-wise Attendance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={departmentAttendance}>
                  <XAxis dataKey="department" stroke="hsl(220, 10%, 46%)" />
                  <YAxis stroke="hsl(220, 10%, 46%)" domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="hsl(234, 85%, 56%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col items-center justify-center">
              <h3 className="font-heading font-semibold text-foreground mb-2">Overall Attendance Rate</h3>
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(220, 16%, 90%)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(234, 85%, 56%)" strokeWidth="8"
                    strokeDasharray={`${86.5 * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-foreground">86.5%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">Campus Average</p>
            </div>
          </div>
        )}

        {slide === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="font-heading font-semibold text-foreground mb-4">Alert Frequency (Weekly)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={alertFrequency}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
                  <XAxis dataKey="week" stroke="hsl(220, 10%, 46%)" />
                  <YAxis stroke="hsl(220, 10%, 46%)" />
                  <Tooltip />
                  <Bar dataKey="fighting" stackId="a" fill="hsl(25, 95%, 53%)" />
                  <Bar dataKey="weapon" stackId="a" fill="hsl(0, 72%, 51%)" />
                  <Bar dataKey="fire" stackId="a" fill="hsl(0, 60%, 40%)" />
                  <Bar dataKey="shortcircuit" stackId="a" fill="hsl(45, 93%, 47%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="font-heading font-semibold text-foreground mb-4">Alert Distribution by Type</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={alertDistribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {alertDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {slide === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="font-heading font-semibold text-foreground mb-4">Most Frequent Alert Locations</h3>
              <div className="space-y-3">
                {alertLocations.map((loc, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground w-20 shrink-0">{loc.location}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full gradient-primary" style={{ width: `${(loc.count / 18) * 100}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-6 text-right">{loc.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="font-heading font-semibold text-foreground mb-4">Weekly Summary</h3>
              <div className="space-y-4">
                {[{ label: "Total Alerts", value: "47", trend: "-12%" }, { label: "Critical", value: "8", trend: "-25%" }, { label: "Resolved", value: "39", trend: "+8%" }, { label: "Avg Response", value: "4.2 min", trend: "-15%" }].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-foreground">{item.value}</span>
                      <span className="text-xs text-alert-success ml-2">{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col items-center justify-center">
              <h3 className="font-heading font-semibold text-foreground mb-4">Campus Safety Score</h3>
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(220, 16%, 90%)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(142, 71%, 45%)" strokeWidth="8"
                    strokeDasharray={`${82 * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-foreground">82</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
              <span className="mt-3 px-3 py-1 rounded-full bg-alert-success/10 text-alert-success text-xs font-semibold">Good</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
