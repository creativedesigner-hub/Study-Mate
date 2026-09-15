'use client';

import { useState } from 'react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

type TaskItem = { id: string; title: string; done: boolean; date: string };

const initialTaskItems: TaskItem[] = [
  { id: 'ti1', title: 'Read chapter 4 — Cognitive science', done: false, date: '2024-03-12' },
  { id: 'ti2', title: 'Submit problem set 03', done: true, date: '2024-03-12' },
  { id: 'ti3', title: 'Review flashcards for midterm', done: false, date: '2024-03-12' },
  { id: 'ti4', title: 'Lab report — enzyme kinetics', done: false, date: '2024-03-15' },
  { id: 'ti5', title: 'Study group — calculus', done: false, date: '2024-03-18' },
];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function TasksPage() {
  const [currentMonth, setCurrentMonth] = useState(2);
  const [currentYear] = useState(2024);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTaskItems);
  const [selectedDate, setSelectedDate] = useState('2024-03-12');
  const [newTaskText, setNewTaskText] = useState('');

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const tasksForDate = tasks.filter((t) => t.date === selectedDate);

  const formatDate = (day: number) => {
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const addTask = () => {
    const trimmed = newTaskText.trim();
    if (!trimmed) return;
    setTasks((prev) => [...prev, { id: `ti${Date.now()}`, title: trimmed, done: false, date: selectedDate }]);
    setNewTaskText('');
  };

  const tasksOnDay = (day: number) => {
    const dateStr = formatDate(day);
    return tasks.filter((t) => t.date === dateStr);
  };

  const prevMonth = () => setCurrentMonth((m) => (m === 0 ? 11 : m - 1));
  const nextMonth = () => setCurrentMonth((m) => (m === 11 ? 0 : m + 1));

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Academic planner</p>
            <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">{monthNames[currentMonth]} {currentYear}</h2>
          </div>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="rounded-lg p-2 text-slate-300 hover:bg-slate-50"><ChevronLeft size={16} /></button>
            <button onClick={nextMonth} className="rounded-lg p-2 text-slate-300 hover:bg-slate-50"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-300">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <span key={d} className="py-2">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = formatDate(day);
            const dayTasks = tasksOnDay(day);
            const isSelected = dateStr === selectedDate;
            const hasUndone = dayTasks.some((t) => !t.done);
            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                className={`aspect-square rounded-xl p-1.5 text-left transition ${isSelected ? 'bg-[#edf3fc] ring-1 ring-[#83a4d1]' : 'hover:bg-slate-50'}`}
              >
                <span className={`text-[11px] font-bold ${isSelected ? 'text-[#4772b4]' : 'text-slate-500'}`}>{day}</span>
                {dayTasks.length > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {dayTasks.slice(0, 2).map((t) => (
                      <div
                        key={t.id}
                        className={`truncate rounded px-1 py-0.5 text-[8px] font-bold ${t.done ? 'bg-slate-100 text-slate-300 line-through' : hasUndone ? 'bg-[#c3d8f0] text-[#4772b4]' : 'bg-slate-100 text-slate-400'}`}
                      >
                        {t.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="px-1 text-[8px] font-bold text-slate-400">+{dayTasks.length - 2} more</div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">To-do list</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h2>
            </div>
            <CalendarDays size={18} className="text-[#7397c9]" />
          </div>

          <div className="space-y-2.5">
            {tasksForDate.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
                <p className="text-[11px] font-semibold text-slate-400">No tasks for this day yet.</p>
              </div>
            ) : (
              tasksForDate.map((task) => (
                <div key={task.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-100">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${task.done ? 'border-[#7b9dcb] bg-[#7b9dcb] text-white' : 'border-slate-200 text-transparent hover:border-[#7b9dcb]'}`}
                  >
                    <Check size={12} strokeWidth={3} />
                  </button>
                  <span className={`text-[12px] font-bold ${task.done ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                    {task.title}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a task for this day..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#83a4d1]"
            />
            <button onClick={addTask} className="flex items-center gap-1.5 rounded-xl bg-[#688fc6] px-4 text-xs font-bold text-white hover:bg-[#557fbd]">
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <h3 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Notes for this day</h3>
          <textarea
            placeholder="Jot down reminders, ideas, or context for this day..."
            className="h-32 w-full resize-none rounded-xl border border-slate-200 p-4 text-[13px] leading-relaxed text-slate-600 outline-none focus:border-[#83a4d1]"
          />
        </div>
      </div>
    </div>
  );
}
