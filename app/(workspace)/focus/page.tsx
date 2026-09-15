'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, Pause, Play, RotateCcw, Target, Timer } from 'lucide-react';

type Mode = 'pomodoro' | 'countdown' | 'stopwatch';

const modeDurations: Record<Mode, number> = {
  pomodoro: 25 * 60,
  countdown: 15 * 60,
  stopwatch: 0,
};

export default function FocusPage() {
  const [mode, setMode] = useState<Mode>('pomodoro');
  const [seconds, setSeconds] = useState(modeDurations.pomodoro);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (mode === 'stopwatch') return prev + 1;
          if (prev <= 1) {
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode]);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setRunning(false);
    setSeconds(modeDurations[newMode]);
  };

  const reset = () => {
    setRunning(false);
    setSeconds(mode === 'stopwatch' ? 0 : modeDurations[mode]);
  };

  const formatTime = (total: number) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progress = mode === 'stopwatch' ? 0 : ((modeDurations[mode] - seconds) / modeDurations[mode]) * 100;

  const sessionsToday = [
    { subject: 'Calculus', duration: '50 min', time: '8:00 AM' },
    { subject: 'Psychology', duration: '25 min', time: '10:30 AM' },
    { subject: 'Biology', duration: '50 min', time: '2:00 PM' },
  ];

  const heatmapDays = Array.from({ length: 7 * 20 }, (_, i) => {
    const intensity = Math.random();
    return { day: i, level: intensity > 0.7 ? 4 : intensity > 0.5 ? 3 : intensity > 0.3 ? 2 : intensity > 0.1 ? 1 : 0 };
  });

  const heatColors = ['bg-slate-100', 'bg-[#c3d8f0]', 'bg-[#8db4dc]', 'bg-[#5e8fc4]', 'bg-[#3f6cae]'];

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative grid place-items-center overflow-hidden rounded-[24px] bg-white p-8 shadow-[0_12px_30px_rgba(34,51,85,0.05)] md:p-12">
          <div className="mb-8 flex gap-2">
            {(['pomodoro', 'countdown', 'stopwatch'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`rounded-xl px-4 py-2.5 text-[11px] font-bold capitalize transition ${mode === m ? 'bg-[#edf3fc] text-[#4772b4]' : 'text-slate-300 hover:bg-slate-50 hover:text-slate-500'}`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="relative grid place-items-center">
            <svg className="absolute -rotate-90" width="280" height="280" viewBox="0 0 280 280">
              <circle cx="140" cy="140" r="130" fill="none" stroke="#eef2f7" strokeWidth="8" />
              <circle
                cx="140" cy="140" r="130" fill="none" stroke="#688fc6" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 130}
                strokeDashoffset={mode === 'stopwatch' ? 0 : 2 * Math.PI * 130 * (1 - progress / 100)}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className="relative z-10 text-center">
              <div className="text-[64px] font-extrabold tracking-[-0.08em] text-[#294468]">
                {formatTime(seconds)}
              </div>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">{mode}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => setRunning(!running)}
              className="flex items-center gap-2 rounded-xl bg-[#688fc6] px-8 py-3.5 text-[12px] font-extrabold text-white shadow-sm transition hover:bg-[#557fbd]"
            >
              {running ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              {running ? 'Pause' : 'Start'}
            </button>
            <button onClick={reset} className="rounded-xl border border-slate-200 p-3.5 text-slate-400 hover:bg-slate-50">
              <RotateCcw size={16} />
            </button>
            <button className="ml-auto rounded-xl border border-slate-200 p-3.5 text-slate-400 hover:bg-slate-50" aria-label="Full screen">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Today’s log</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">Session history</h2>
            </div>
            <Target size={18} className="text-[#7397c9]" />
          </div>
          <div className="space-y-3">
            {sessionsToday.map((session, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 p-3.5">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#f5f8fc] text-[#668bc4]">
                    <Timer size={15} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-slate-700">{session.subject}</p>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-400">{session.time}</p>
                  </div>
                </div>
                <span className="text-[12px] font-extrabold text-[#5279b8]">{session.duration}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-[#f5f8fc] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">Total focus today</span>
              <span className="text-[13px] font-extrabold text-[#5279b8]">2h 05m</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Activity heatmap</p>
            <h2 className="mt-1 text-lg font-extrabold tracking-[-0.04em]">Your year at a glance</h2>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
            <span>Less</span>
            {heatColors.map((c, i) => (
              <div key={i} className={`h-2.5 w-2.5 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-[3px]">
          {heatmapDays.map((d) => (
            <div
              key={d.day}
              className={`h-3.5 w-3.5 rounded-sm ${heatColors[d.level]}`}
              title={`Day ${d.day + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
