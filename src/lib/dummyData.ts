export const students = [
  { id: 1, name: "Aarav Sharma", roll: "CS2024001", department: "Computer Science", attendance: 92, status: "Present" as const },
  { id: 2, name: "Priya Patel", roll: "EC2024012", department: "Electronics", attendance: 87, status: "Present" as const },
  { id: 3, name: "Rahul Kumar", roll: "ME2024005", department: "Mechanical", attendance: 45, status: "Absent" as const },
  { id: 4, name: "Sneha Reddy", roll: "CS2024003", department: "Computer Science", attendance: 96, status: "Present" as const },
  { id: 5, name: "Vikram Singh", roll: "EE2024008", department: "Electrical", attendance: 78, status: "Present" as const },
  { id: 6, name: "Ananya Gupta", roll: "CE2024002", department: "Civil", attendance: 34, status: "Absent" as const },
  { id: 7, name: "Karthik Nair", roll: "CS2024007", department: "Computer Science", attendance: 91, status: "Present" as const },
  { id: 8, name: "Meera Joshi", roll: "EC2024015", department: "Electronics", attendance: 82, status: "Absent" as const },
  { id: 9, name: "Arjun Das", roll: "ME2024011", department: "Mechanical", attendance: 68, status: "Present" as const },
  { id: 10, name: "Divya Menon", roll: "EE2024004", department: "Electrical", attendance: 95, status: "Present" as const },
  { id: 11, name: "Rohan Verma", roll: "CS2024009", department: "Computer Science", attendance: 73, status: "Absent" as const },
  { id: 12, name: "Ishita Banerjee", roll: "CE2024006", department: "Civil", attendance: 88, status: "Present" as const },
];

export const alerts = [
  { id: 1, type: "fighting" as const, title: "Student Violation Detected", timestamp: "2024-03-15 09:23 AM", location: "Corridor B, Block 2", severity: "Moderate", status: "Active" as const },
  { id: 2, type: "weapon" as const, title: "Weapon Detection Alert", timestamp: "2024-03-15 10:05 AM", location: "Main Gate Entrance", severity: "Critical", status: "Active" as const },
  { id: 3, type: "fire" as const, title: "Fire Alert - Smoke Detected", timestamp: "2024-03-15 11:45 AM", location: "Chemistry Lab, Block 3", severity: "Critical", status: "Resolved" as const },
  { id: 4, type: "shortcircuit" as const, title: "Electrical Hazard Warning", timestamp: "2024-03-15 12:30 PM", location: "Hostel C, Room 204", severity: "Warning", status: "Active" as const },
  { id: 5, type: "fire" as const, title: "Fire Alarm Triggered", timestamp: "2024-03-15 02:15 PM", location: "Library, 2nd Floor", severity: "Critical", status: "Active" as const },
  { id: 6, type: "fighting" as const, title: "Physical Altercation Detected", timestamp: "2024-03-15 03:00 PM", location: "Cafeteria", severity: "Moderate", status: "Resolved" as const },
];

export const attendanceTrend = [
  { date: "Mon", present: 420, absent: 80 },
  { date: "Tue", present: 445, absent: 55 },
  { date: "Wed", present: 410, absent: 90 },
  { date: "Thu", present: 460, absent: 40 },
  { date: "Fri", present: 380, absent: 120 },
  { date: "Sat", present: 350, absent: 150 },
];

export const departmentAttendance = [
  { department: "CS", attendance: 91 },
  { department: "EC", attendance: 85 },
  { department: "ME", attendance: 78 },
  { department: "EE", attendance: 88 },
  { department: "CE", attendance: 72 },
];

export const alertDistribution = [
  { name: "Fighting", value: 35, fill: "hsl(25, 95%, 53%)" },
  { name: "Weapon", value: 10, fill: "hsl(0, 72%, 51%)" },
  { name: "Fire", value: 30, fill: "hsl(0, 72%, 51%)" },
  { name: "Short Circuit", value: 25, fill: "hsl(45, 93%, 47%)" },
];

export const alertFrequency = [
  { week: "Week 1", fighting: 5, weapon: 1, fire: 3, shortcircuit: 4 },
  { week: "Week 2", fighting: 3, weapon: 0, fire: 2, shortcircuit: 6 },
  { week: "Week 3", fighting: 7, weapon: 2, fire: 1, shortcircuit: 3 },
  { week: "Week 4", fighting: 4, weapon: 1, fire: 4, shortcircuit: 2 },
];

export const alertLocations = [
  { location: "Corridor", count: 18 },
  { location: "Lab", count: 14 },
  { location: "Hostel", count: 11 },
  { location: "Gate", count: 8 },
  { location: "Cafeteria", count: 6 },
  { location: "Library", count: 4 },
];

export const departments = ["All", "Computer Science", "Electronics", "Mechanical", "Electrical", "Civil"];

export const summaryStats = {
  totalStudents: 2450,
  presentToday: 2120,
  absentToday: 330,
  activeAlerts: 4,
};
