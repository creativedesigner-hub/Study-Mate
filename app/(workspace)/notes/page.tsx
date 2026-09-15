'use client';

import { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Hash,
  Link2,
  Plus,
  Search,
  Type,
} from 'lucide-react';

type Note = { id: string; title: string; folder: string; excerpt: string; updated: string };

const folders = [
  { name: 'Psychology', count: 8 },
  { name: 'Calculus', count: 5 },
  { name: 'Biology', count: 12 },
  { name: 'Personal', count: 3 },
];

const notesList: Note[] = [
  { id: 'n1', title: 'Memory & learning', folder: 'Psychology', excerpt: 'Encoding, storage, and retrieval — the three stages of memory...', updated: '1h ago' },
  { id: 'n2', title: 'Problem set 03 — Limits', folder: 'Calculus', excerpt: 'Definition of a limit. Epsilon-delta proofs and continuity...', updated: '3h ago' },
  { id: 'n3', title: 'Cell signalling pathways', folder: 'Biology', excerpt: 'Signal transduction cascades, second messengers, and receptors...', updated: 'Yesterday' },
  { id: 'n4', title: 'Midterm study plan', folder: 'Personal', excerpt: 'Schedule for the next two weeks — priorities and time blocks...', updated: '2d ago' },
  { id: 'n5', title: 'Classical conditioning', folder: 'Psychology', excerpt: 'Pavlov, Watson, and the foundations of behaviourism...', updated: '3d ago' },
];

export default function NotesPage() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(notesList[0]);
  const [search, setSearch] = useState('');

  const filteredNotes = activeFolder
    ? notesList.filter((n) => n.folder === activeFolder)
    : notesList;

  const searchedNotes = search
    ? filteredNotes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase()))
    : filteredNotes;

  return (
    <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)_220px]">
      <div className="rounded-[24px] bg-white p-5 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-extrabold tracking-[-0.03em] text-slate-700">Folders</h2>
          <button className="rounded-lg bg-[#edf3fc] p-1.5 text-[#668bc4] hover:bg-[#e3edf9]">
            <Plus size={14} />
          </button>
        </div>
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
          <Search size={13} className="text-slate-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-transparent text-[11px] font-medium text-slate-600 outline-none placeholder:text-slate-300"
          />
        </div>
        <div className="space-y-1">
          <button
            onClick={() => setActiveFolder(null)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[11px] font-bold transition ${activeFolder === null ? 'bg-[#edf3fc] text-[#4772b4]' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <span className="flex items-center gap-2"><BookOpen size={14} /> All notes</span>
            <span className="text-[9px] text-slate-300">{notesList.length}</span>
          </button>
          {folders.map((folder) => (
            <button
              key={folder.name}
              onClick={() => setActiveFolder(folder.name)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[11px] font-bold transition ${activeFolder === folder.name ? 'bg-[#edf3fc] text-[#4772b4]' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <span className="flex items-center gap-2"><Folder size={14} /> {folder.name}</span>
              <span className="text-[9px] text-slate-300">{folder.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
        {activeNote ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{activeNote.folder}</p>
                <h1 className="mt-1 text-xl font-extrabold tracking-[-0.04em] text-slate-800">{activeNote.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-slate-50"><Type size={15} /></button>
                <button className="rounded-lg bg-[#edf3fc] px-3 py-2 text-[10px] font-bold text-[#668bc4] hover:bg-[#e3edf9]">Save</button>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-[13px] leading-[1.7] text-slate-600">{activeNote.excerpt}</p>
              <p className="mt-4 text-[13px] leading-[1.7] text-slate-600">
                This is where your rich-text content lives. Use keyboard shortcuts to format headings,
                lists, blockquotes, and code blocks. Type <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-[#668bc4]">/explain</code> or{' '}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-[#668bc4]">/summarize</code> to trigger AI actions inline.
              </p>
              <p className="mt-4 text-[13px] leading-[1.7] text-slate-600">
                Link notes with <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-[#668bc4]">[[Note Title]]</code> syntax. Backlinks appear in the sidebar on the right.
              </p>
            </div>
          </>
        ) : (
          <div className="grid min-h-[300px] place-items-center rounded-2xl border border-dashed border-slate-200 bg-[#fbfcfe]">
            <div className="text-center">
              <FileText className="mx-auto mb-3 text-slate-300" size={32} />
              <p className="text-sm font-bold text-slate-500">Select a note to start reading</p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">Or create a new one from the sidebar</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div className="rounded-[24px] bg-white p-5 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <h3 className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
            <Link2 size={13} /> Backlinks
          </h3>
          <div className="space-y-2">
            {searchedNotes.slice(0, 4).map((note) => (
              <button
                key={note.id}
                onClick={() => setActiveNote(note)}
                className="block w-full rounded-lg p-2.5 text-left transition hover:bg-slate-50"
              >
                <p className="truncate text-[11px] font-bold text-slate-600">{note.title}</p>
                <p className="mt-0.5 truncate text-[9px] font-medium text-slate-400">{note.excerpt}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] bg-white p-5 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <h3 className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
            <Hash size={13} /> Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {['#midterm', '#memory', '#calculus', '#biology', '#review'].map((tag) => (
              <span key={tag} className="rounded-lg bg-[#f2f5f9] px-2.5 py-1.5 text-[10px] font-bold text-slate-500">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
