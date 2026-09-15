'use client';

import { useState } from 'react';
import {
  Brain,
  FileText,
  Layers,
  MessageSquareText,
  Send,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';

type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string; source?: string };

const sampleDocuments = [
  { name: 'lecture_04_cognition.pdf', size: '2.4 MB', status: 'Indexed' },
  { name: 'calculus_textbook_ch5.pdf', size: '8.1 MB', status: 'Indexed' },
];

const chatHistory: ChatMessage[] = [
  { id: 'm1', role: 'user', content: 'What are the three stages of memory?' },
  { id: 'm2', role: 'assistant', content: 'According to your lecture notes, the three stages of memory are encoding (transforming information into a usable form), storage (maintaining it over time), and retrieval (accessing it when needed).', source: 'lecture_04_cognition.pdf — p. 12' },
];

export default function AILabPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistory);
  const [input, setInput] = useState('');
  const [dragging, setDragging] = useState(false);
  const [documents, setDocuments] = useState(sampleDocuments);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: `m${Date.now()}`, role: 'user', content: trimmed };
    const assistantMsg: ChatMessage = {
      id: `m${Date.now() + 1}`,
      role: 'assistant',
      content: 'Based on your uploaded documents, I found relevant information. This is a simulated RAG response — connect your OpenAI API key to enable real document-grounded answers with source citations.',
      source: 'lecture_04_cognition.pdf — p. 12',
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
  };

  const addDocument = (name: string) => {
    setDocuments((prev) => [...prev, { name, size: '1.2 MB', status: 'Processing' }]);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="space-y-5">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) addDocument(files[0].name);
          }}
          className={`rounded-[24px] border-2 border-dashed p-8 text-center transition ${dragging ? 'border-[#83a4d1] bg-[#edf3fc]' : 'border-slate-200 bg-white'}`}
        >
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#edf3fc] text-[#668bc4]">
            <Upload size={24} />
          </div>
          <p className="text-sm font-extrabold text-slate-700">Drop documents here</p>
          <p className="mt-1 text-[11px] font-medium text-slate-400">PDF, DOCX, TXT — up to 20 MB</p>
          <button
            onClick={() => addDocument('uploaded_document.pdf')}
            className="mt-4 rounded-xl bg-[#688fc6] px-5 py-2.5 text-[11px] font-bold text-white hover:bg-[#557fbd]"
          >
            Browse files
          </button>
        </div>

        <div className="rounded-[24px] bg-white p-5 shadow-[0_12px_30px_rgba(34,51,85,0.05)]">
          <h3 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Uploaded documents</h3>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.name} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#fce8e7] text-[#d88985]">
                  <FileText size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-slate-600">{doc.name}</p>
                  <p className="mt-0.5 text-[9px] font-medium text-slate-400">{doc.size}</p>
                </div>
                <span className={`rounded px-2 py-1 text-[8px] font-extrabold tracking-wider ${doc.status === 'Indexed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {doc.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] bg-[#edf3fc] p-5">
          <div className="mb-3 flex items-center gap-2">
            <Layers size={16} className="text-[#668bc4]" />
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#4772b4]">Quick actions</h3>
          </div>
          <div className="space-y-2">
            <button className="flex w-full items-center gap-2 rounded-xl bg-white px-4 py-3 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50">
              <Sparkles size={14} className="text-[#668bc4]" /> Generate flashcards from notes
            </button>
            <button className="flex w-full items-center gap-2 rounded-xl bg-white px-4 py-3 text-left text-[11px] font-bold text-slate-600 hover:bg-slate-50">
              <Brain size={14} className="text-[#668bc4]" /> Create practice quiz
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-[24px] bg-white p-6 shadow-[0_12px_30px_rgba(34,51,85,0.05)]" style={{ minHeight: '600px' }}>
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#edf3fc] text-[#668bc4]">
              <MessageSquareText size={17} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-[-0.03em] text-slate-700">Document chat</h2>
              <p className="text-[10px] font-medium text-slate-400">Ask questions grounded in your files</p>
            </div>
          </div>
          <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[9px] font-extrabold tracking-wider text-emerald-600">ONLINE</span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-[#688fc6] text-white' : 'bg-[#f5f8fc] text-slate-700'}`}>
                <p className="text-[12px] font-medium leading-relaxed">{msg.content}</p>
                {msg.source && (
                  <p className={`mt-2 flex items-center gap-1.5 text-[9px] font-bold ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                    <FileText size={10} /> Source: {msg.source}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your documents..."
            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#83a4d1]"
          />
          <button onClick={sendMessage} className="flex items-center gap-2 rounded-xl bg-[#688fc6] px-5 text-xs font-bold text-white hover:bg-[#557fbd]">
            <Send size={14} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
