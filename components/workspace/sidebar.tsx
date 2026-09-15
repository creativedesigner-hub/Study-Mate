'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, X } from 'lucide-react';
import { navItems, personalNavItems } from '@/lib/workspace-data';

export default function Sidebar({ mobileNavOpen, onClose }: { mobileNavOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`${mobileNavOpen ? 'translate-x-0' : '-translate-x-[120%]'} fixed inset-y-4 left-4 z-30 w-[260px] rounded-[28px] bg-white px-5 py-6 shadow-[0_20px_55px_rgba(34,51,85,0.10)] transition-transform md:relative md:inset-auto md:translate-x-0`}
    >
      <div className="flex items-center justify-between px-2 pb-10">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#4e78bb] text-white shadow-md shadow-blue-200">
            <Sparkles size={16} />
          </div>
          <span className="text-[17px] font-extrabold tracking-[-0.04em]">Studyspace</span>
        </div>
        <button className="text-slate-300 md:hidden" onClick={onClose} aria-label="Close menu">
          <X size={18} />
        </button>
      </div>
      <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">Workspace</p>
      <nav className="space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <a
              key={href}
              href={href}
              onClick={onClose}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[12px] font-semibold transition ${active ? 'bg-[#edf3fc] text-[#4772b4]' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}`}
            >
              <Icon size={17} strokeWidth={active ? 2.4 : 1.8} />
              {label}
            </a>
          );
        })}
      </nav>
      <div className="mt-10 border-t border-slate-100 pt-6">
        <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">Personal</p>
        {personalNavItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <a
              key={href}
              href={href}
              onClick={onClose}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[12px] font-semibold transition ${active ? 'bg-[#edf3fc] text-[#4772b4]' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}`}
            >
              <Icon size={17} strokeWidth={active ? 2.4 : 1.8} />
              {label}
            </a>
          );
        })}
      </div>
      <div className="absolute bottom-6 left-5 right-5 rounded-2xl bg-[#f7f9fc] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500">Storage</span>
          <span className="text-[10px] font-bold text-slate-400">18%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-[18%] rounded-full bg-[#87a7d2]" />
        </div>
        <p className="mt-3 text-[10px] leading-4 text-slate-400">You’re building a great library. Keep going.</p>
      </div>
    </aside>
  );
}
