'use client';

import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Flame,
  FolderOpen,
  MoreHorizontal,
  Plus,
  Target,
  TimerReset,
  TrendingUp,
} from 'lucide-react';
import { initialTasks, quotes, type Task } from '@/lib/workspace-data';

export default function DashboardContent() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showQuickCapture, setShowQuickCapture] = useState(false);
  const [quickNote, setQuickNote] = useState('');
  const [notes, setNotes] = useState(['Lecture notes — Memory & learning']);

  const completedTasks = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);

  const toggleTask = (title: string) => {
    setTasks((current) =>
      current.map((task) => (task.title === title ? { ...task, done: !task.done } : task)),
    );
  };

  const addNote = () => {
    const trimmedNote = quickNote.trim();
    if (!trimmedNote) return;
    setNotes((current) => [trimmedNote, ...current]);
    setQuickNote('');
    setShowQuickCapture(false);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-5">
        <section className="relative overflow-hidden rounded-[24px] bg-[#557fbd] px-7 py-6 text-white shadow-[0_18px_35px_rgba(69,104,161,0.20)] md:px-9 md:py-8">
          <div className="relative z-10 max-w-[520px]">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100">
              <Flame size={14} fill="currentColor" /> Daily intention
            </div>
            <p className="min-h-[56px] text-[22px] font-bold leading-[1.25] tracking-[-0.035em] md:text-[26px]">
              “{quotes[quoteIndex]}”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setQuoteIndex((quoteIndex + 1) % quotes.length)}
                className="rounded-lg bg-white/15 px-3 py-2 text-[10px] font-bold backdrop-blur transition hover:bg-white/25"
              >
                New intention
              </button>
              <span className="text-[10px] text-blue-100">A little progress is still progress.</span>
            </div>
          </div>
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[32px] border-white/10" />
          <div className="absolute -bottom-36 right-24 h-64 w-64 rounded-full border-[24px] border-white/10" />
        </section>

        <section className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Today’s agenda
                </p>
                <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">Your plan for the day</h2>
              </div>
              <button className="rounded-lg p-2 text-slate-300 hover:bg-slate-50 hover:text-slate-600">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-100 hover:bg-[#fbfcfe]"
                >
                  <button
                    onClick={() => toggleTask(task.title)}
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${task.done ? 'border-[#7b9dcb] bg-[#7b9dcb] text-white' : 'border-slate-200 text-transparent hover:border-[#7b9dcb]'}`}
                    aria-label={`Mark ${task.title} complete`}
                  >
                    <Check size={12} strokeWidth={3} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-[12px] font-bold ${task.done ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                      {task.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] font-medium text-slate-400">{task.time}</span>
                      <span className={`rounded px-1.5 py-0.5 text-[8px] font-extrabold tracking-wider ${task.color}`}>
                        {task.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowQuickCapture(true)}
              className="mt-5 flex items-center gap-2 text-[11px] font-bold text-[#668bc4] hover:text-[#3f6cae]"
            >
              <Plus size={14} /> Add task
            </button>
          </div>

          <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Focus session</p>
                <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">Deep work</h2>
              </div>
              <TimerReset size={18} className="text-[#7397c9]" />
            </div>
            <div className="rounded-2xl bg-[#f5f8fc] px-4 py-5 text-center">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Pomodoro</div>
              <div className="text-[43px] font-extrabold tracking-[-0.08em] text-[#294468]">
                25<span className="text-[24px] text-slate-300">:00</span>
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`mt-4 w-full rounded-xl py-3 text-[11px] font-extrabold text-white shadow-sm transition ${isTimerRunning ? 'bg-[#e28d91]' : 'bg-[#688fc6] hover:bg-[#557fbd]'}`}
              >
                {isTimerRunning ? 'Pause session' : 'Start session'}
              </button>
            </div>
            <div className="mt-5 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-400">Today’s focus</span>
              <span className="font-extrabold text-[#5279b8]">1h 40m</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-100">
              <div className="h-full w-[62%] rounded-full bg-[#89a8d2]" />
            </div>
          </div>
        </section>

        <section className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Quick capture</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">Keep your thoughts moving</h2>
            </div>
            <button
              onClick={() => setShowQuickCapture(!showQuickCapture)}
              className="rounded-xl bg-[#edf3fc] p-2.5 text-[#668bc4] hover:bg-[#e3edf9]"
            >
              <Plus size={17} />
            </button>
          </div>
          {showQuickCapture ? (
            <div className="flex gap-2">
              <input
                autoFocus
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addNote()}
                placeholder="Write a quick thought..."
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#83a4d1]"
              />
              <button onClick={addNote} className="rounded-xl bg-[#688fc6] px-4 text-xs font-bold text-white">
                Save
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-[#fbfcfe] p-5 text-center">
              <FileText className="mx-auto mb-2 text-slate-300" size={22} />
              <p className="text-xs font-semibold text-slate-400">Capture an idea before it gets away.</p>
              <button onClick={() => setShowQuickCapture(true)} className="mt-2 text-[11px] font-bold text-[#668bc4]">
                Start writing
              </button>
            </div>
          )}
          {notes.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {notes.slice(0, 3).map((note) => (
                <span key={note} className="rounded-lg bg-[#f2f5f9] px-3 py-2 text-[10px] font-semibold text-slate-500">
                  {note}
                </span>
              ))}
            </div>
          )}
        </section>
      </div>

      <aside className="space-y-5">
        <section className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">March 2024</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">Your calendar</h2>
            </div>
            <div className="flex gap-1">
              <button className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-50">
                <ChevronLeft size={16} />
              </button>
              <button className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-7 gap-y-3 text-center text-[10px] font-bold text-slate-300">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
            {Array.from({ length: 35 }, (_, index) => {
              const day = index - 4;
              const isToday = day === 12;
              const hasTask = [5, 8, 12, 15, 21, 26].includes(day);
              return (
                <span
                  key={index}
                  className={`relative grid h-7 place-items-center text-[10px] font-semibold ${day < 1 || day > 31 ? 'text-transparent' : 'text-slate-500'}`}
                >
                  {day > 0 && day <= 31 && (
                    <>
                      {isToday ? (
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#688fc6] text-white shadow-sm">
                          {day}
                        </span>
                      ) : (
                        <>
                          {day}
                          {hasTask && <i className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#e28d91]" />}
                        </>
                      )}
                    </>
                  )}
                </span>
              );
            })}
          </div>
          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f5f8fc] py-3 text-[11px] font-bold text-[#668bc4] hover:bg-[#edf3fc]">
            <CalendarDays size={14} /> Open planner
          </button>
        </section>

        <section className="rounded-[24px] bg-[#f9e9e5] p-6">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b8867d]">Keep the streak</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em] text-[#654a47]">You’re on fire.</h2>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/70 text-[#d8867d]">
              <Flame size={20} fill="currentColor" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-4xl font-extrabold tracking-[-0.09em] text-[#654a47]">7</span>
              <span className="ml-2 text-[11px] font-bold text-[#b8867d]">days in a row</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#b8867d]">
              <TrendingUp size={14} /> +12% this week
            </div>
          </div>
          <div className="mt-5 flex gap-1.5">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div key={`${day}-${index}`} className="flex-1 text-center">
                <div className={`mx-auto mb-1.5 h-1.5 w-1.5 rounded-full ${index < 6 ? 'bg-[#d8867d]' : 'bg-white'}`} />
                <span className="text-[9px] font-bold text-[#b8867d]">{day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Recent spaces</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">Pick up where you left off</h2>
            </div>
            <button className="text-slate-300">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="space-y-2">
            {['Memory & learning', 'Calculus — Problem sets', 'Midterm study plan'].map((name, index) => (
              <button key={name} className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-slate-50">
                <div
                  className={`grid h-8 w-8 place-items-center rounded-lg ${
                    index === 0 ? 'bg-[#e8f0fb] text-[#668bc4]' : index === 1 ? 'bg-[#fff2d9] text-[#d49a42]' : 'bg-[#fce8e7] text-[#d88985]'
                  }`}
                >
                  <FolderOpen size={15} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-bold text-slate-600">{name}</p>
                  <p className="mt-0.5 text-[9px] font-medium text-slate-400">Edited {index + 1}h ago</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
