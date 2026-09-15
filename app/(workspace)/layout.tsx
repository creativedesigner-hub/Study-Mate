'use client';

import { useState } from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import Sidebar from '@/components/workspace/sidebar';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#eef2f6] text-[#17243b]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-5 p-4 md:p-6">
        <Sidebar mobileNavOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <section className="min-w-0 flex-1">
          <header className="mb-5 flex items-center justify-between gap-4 px-1 md:px-2">
            <div className="flex items-center gap-3">
              <button
                className="rounded-xl bg-white p-2.5 text-slate-500 shadow-sm md:hidden"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Tuesday, 12 March 2024
                </p>
                <h1 className="mt-1 text-2xl font-extrabold tracking-[-0.05em] text-[#1a2942] md:text-[29px]">
                  Good morning, Stella<span className="text-[#7198cd]">.</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                className="hidden rounded-xl bg-white p-3 text-slate-400 shadow-sm transition hover:text-[#4772b4] sm:block"
                aria-label="Search"
              >
                <Search size={17} />
              </button>
              <button
                className="relative rounded-xl bg-white p-3 text-slate-400 shadow-sm transition hover:text-[#4772b4]"
                aria-label="Notifications"
              >
                <Bell size={17} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#ef8c91]" />
              </button>
              <div className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-[#e0e9f7] text-xs font-extrabold text-[#5279b8]">
                SW
              </div>
            </div>
          </header>
          {children}
        </section>
      </div>
    </div>
  );
}
