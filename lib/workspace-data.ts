import {
  BookOpen,
  Brain,
  CalendarDays,
  LayoutDashboard,
  Settings,
  Target,
  TrendingUp,
} from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

export const navItems: NavItem[] = [
  { label: 'Command centre', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Knowledge hub', href: '/notes', icon: BookOpen },
  { label: 'Focus studio', href: '/focus', icon: Target },
  { label: 'Academic planner', href: '/tasks', icon: CalendarDays },
  { label: 'AI lab', href: '/ai-tools', icon: Brain },
  { label: 'Analytics', href: '/analytics', icon: TrendingUp },
];

export const personalNavItems: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
];

export type Task = {
  id: string;
  title: string;
  time: string;
  tag: string;
  color: string;
  done: boolean;
};

export const initialTasks: Task[] = [
  { id: 't1', title: 'Read chapter 4 — Cognitive science', time: '9:00 AM', tag: 'PSYCHOLOGY', color: 'bg-sky-100 text-sky-700', done: false },
  { id: 't2', title: 'Submit problem set 03', time: '12:30 PM', tag: 'CALCULUS', color: 'bg-amber-100 text-amber-700', done: true },
  { id: 't3', title: 'Review flashcards for midterm', time: '4:00 PM', tag: 'BIOLOGY', color: 'bg-rose-100 text-rose-700', done: false },
  { id: 't4', title: 'Plan tomorrow’s study blocks', time: '7:30 PM', tag: 'PERSONAL', color: 'bg-slate-100 text-slate-600', done: false },
];

export const quotes = [
  'Small steps every day add up to remarkable results.',
  'Your future self is built by what you focus on today.',
  'Progress is the quiet proof that your plan is working.',
];
