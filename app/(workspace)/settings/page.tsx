'use client';

import { useState } from 'react';
import {
  Bell,
  Crown,
  Database,
  Download,
  KeyRound,
  Lock,
  Shield,
  Trash2,
  User,
} from 'lucide-react';

export default function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [focusReminders, setFocusReminders] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf3fc] text-[#668bc4]">
              <User size={18} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-[-0.04em]">Account</h2>
              <p className="text-[11px] font-medium text-slate-400">Manage your profile and preferences</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Full name</label>
              <input defaultValue="Stella Winters" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-[#83a4d1]" />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Email</label>
              <input defaultValue="stella.w@university.edu" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-[#83a4d1]" />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">University</label>
              <input defaultValue="State University" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-[#83a4d1]" />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Timezone</label>
              <input defaultValue="GMT+5:30" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-[#83a4d1]" />
            </div>
          </div>
          <button className="mt-5 rounded-xl bg-[#688fc6] px-6 py-2.5 text-[11px] font-bold text-white hover:bg-[#557fbd]">
            Save changes
          </button>
        </div>

        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff2d9] text-[#d49a42]">
              <Bell size={18} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-[-0.04em]">Notifications</h2>
              <p className="text-[11px] font-medium text-slate-400">Control what we tell you and when</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', desc: 'Daily agenda and weekly summary', value: emailNotifs, setter: setEmailNotifs },
              { label: 'Focus reminders', desc: 'Gentle nudge when a session is due', value: focusReminders, setter: setFocusReminders },
              { label: 'Two-factor authentication', desc: 'Extra security on every login', value: twoFactor, setter: setTwoFactor },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                <div>
                  <p className="text-[12px] font-bold text-slate-700">{setting.label}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">{setting.desc}</p>
                </div>
                <button
                  onClick={() => setting.setter(!setting.value)}
                  className={`relative h-6 w-11 rounded-full transition ${setting.value ? 'bg-[#688fc6]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${setting.value ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fce8e7] text-[#d88985]">
              <Shield size={18} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-[-0.04em]">Data & privacy</h2>
              <p className="text-[11px] font-medium text-slate-400">Your data belongs to you — export or delete it anytime</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-100 hover:bg-[#fbfcfe]">
              <Download size={18} className="text-[#668bc4]" />
              <div>
                <p className="text-[12px] font-bold text-slate-700">Export my data</p>
                <p className="mt-0.5 text-[10px] font-medium text-slate-400">Download all notes, tasks, and logs</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-rose-100 p-4 text-left transition hover:bg-rose-50">
              <Trash2 size={18} className="text-[#d88985]" />
              <div>
                <p className="text-[12px] font-bold text-slate-700">Delete my data</p>
                <p className="mt-0.5 text-[10px] font-medium text-slate-400">Permanently remove everything</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-[#557fbd] to-[#3f6cae] p-6 text-white shadow-[0_18px_35px_rgba(69,104,161,0.20)]">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100">
            <Crown size={14} /> Premium plan
          </div>
          <p className="text-2xl font-extrabold tracking-[-0.05em]">Studyspace Pro</p>
          <p className="mt-2 text-[11px] font-medium text-blue-100">20 GB storage, unlimited AI queries, full analytics history</p>
          <div className="mt-5 rounded-xl bg-white/15 p-4 backdrop-blur">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span>Next billing</span>
              <span>Oct 15, 2024</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
              <span>Amount</span>
              <span>₹299 / month</span>
            </div>
          </div>
          <button className="mt-4 w-full rounded-xl bg-white/20 py-3 text-[11px] font-extrabold backdrop-blur transition hover:bg-white/30">
            Manage subscription
          </button>
        </div>

        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-4 flex items-center gap-2">
            <Database size={16} className="text-[#668bc4]" />
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Storage</h3>
          </div>
          <div className="mb-3 flex items-end justify-between">
            <span className="text-2xl font-extrabold tracking-[-0.05em] text-slate-800">3.6 GB</span>
            <span className="text-[11px] font-bold text-slate-400">of 20 GB</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[18%] rounded-full bg-[#688fc6]" />
          </div>
          <div className="mt-4 space-y-2">
            {[
              { label: 'Documents', size: '2.1 GB', pct: '58%' },
              { label: 'Notes', size: '1.2 GB', pct: '33%' },
              { label: 'Other', size: '0.3 GB', pct: '9%' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-500">{item.label}</span>
                <span className="text-slate-400">{item.size} · {item.pct}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <div className="mb-4 flex items-center gap-2">
            <Lock size={16} className="text-[#668bc4]" />
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Security</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5">
              <KeyRound size={15} className="text-slate-400" />
              <div className="flex-1">
                <p className="text-[11px] font-bold text-slate-600">Change password</p>
                <p className="mt-0.5 text-[9px] font-medium text-slate-400">Last changed 3 months ago</p>
              </div>
              <button className="text-[10px] font-bold text-[#668bc4]">Update</button>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5">
              <Shield size={15} className="text-slate-400" />
              <div className="flex-1">
                <p className="text-[11px] font-bold text-slate-600">Active sessions</p>
                <p className="mt-0.5 text-[9px] font-medium text-slate-400">2 devices currently signed in</p>
              </div>
              <button className="text-[10px] font-bold text-[#668bc4]">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
