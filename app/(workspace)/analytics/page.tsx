'use client';

import {
  BarChart3,
  BookOpen,
  Clock,
  PieChart as PieChartIcon,
  TrendingUp,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const subjectTimeData = [
  { name: 'Psychology', hours: 12, color: '#688fc6' },
  { name: 'Calculus', hours: 9, color: '#e28d91' },
  { name: 'Biology', hours: 7, color: '#89a8d2' },
  { name: 'Personal', hours: 4, color: '#d49a42' },
];

const velocityData = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 4.2 },
  { day: 'Wed', hours: 2.8 },
  { day: 'Thu', hours: 5.1 },
  { day: 'Fri', hours: 3.9 },
  { day: 'Sat', hours: 6.2 },
  { day: 'Sun', hours: 4.5 },
];

const gradeData = [
  { subject: 'Psychology', grade: 92 },
  { subject: 'Calculus', grade: 85 },
  { subject: 'Biology', grade: 88 },
  { subject: 'English', grade: 91 },
  { subject: 'History', grade: 79 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total focus time', value: '142h', icon: Clock, color: 'bg-[#e8f0fb] text-[#668bc4]' },
          { label: 'Notes created', value: '38', icon: BookOpen, color: 'bg-[#fff2d9] text-[#d49a42]' },
          { label: 'Avg. daily focus', value: '4.2h', icon: TrendingUp, color: 'bg-[#fce8e7] text-[#d88985]' },
          { label: 'Tasks completed', value: '127', icon: BarChart3, color: 'bg-[#e3f6ee] text-[#4caf7d]' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
            <div className={`mb-4 grid h-11 w-11 place-items-center rounded-xl ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-[-0.05em] text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Time breakdown</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">By subject</h2>
            </div>
            <PieChartIcon size={18} className="text-[#7397c9]" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={subjectTimeData}
                dataKey="hours"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {subjectTimeData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {subjectTimeData.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] font-bold text-slate-500">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Subject velocity</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">Hours this week</h2>
            </div>
            <TrendingUp size={18} className="text-[#7397c9]" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={velocityData}>
              <defs>
                <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#688fc6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#688fc6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f3f7" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 12 }}
              />
              <Area type="monotone" dataKey="hours" stroke="#688fc6" strokeWidth={2.5} fill="url(#velocityGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Grade distribution</p>
            <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">Current scores by subject</h2>
          </div>
          <BarChart3 size={18} className="text-[#7397c9]" />
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={gradeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f3f7" vertical={false} />
            <XAxis dataKey="subject" tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 12 }}
            />
            <Bar dataKey="grade" fill="#688fc6" radius={[8, 8, 0, 0]} barSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
