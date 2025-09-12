import React, { useEffect, useState } from 'react';
import api from '../api';

type Flashcard = {
  id: number;
  front: string;
  back: string;
  color: string;
};

interface FlashcardFormProps {
  editingCard?: Flashcard | null;
  onFinish?: () => void;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ editingCard, onFinish }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [color, setColor] = useState('#8b5cf6'); // violet-500
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingCard) {
      setFront(editingCard.front);
      setBack(editingCard.back);
      setColor(editingCard.color);
    } else {
      setFront('');
      setBack('');
      setColor('#8b5cf6');
    }
  }, [editingCard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingCard) {
        await api.put(`/flashcards/${editingCard.id}`, { front, back, color });
      } else {
        await api.post('/flashcards', { front, back, color });
      }
      window.dispatchEvent(new Event('flashcards:changed'));
      if (onFinish) onFinish();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5 shadow-xl shadow-black/20">
      <h2 className="text-lg font-semibold mb-4">
        {editingCard ? 'Edit ' : 'Flashcard '}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1 text-slate-300">Front</label>
          <input
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
            className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400/40"
            placeholder="e.g. What is closure in JS?"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-300">Back</label>
          <textarea
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
            rows={3}
            className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400/40 resize-none"
            placeholder="Your answer..."
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300">Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-9 w-14 rounded-md border border-white/10 bg-slate-900/60 p-1"
          />
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs"
            style={{ backgroundColor: color, color: '#0f172a' }}
            title={color}
          >
            ● Preview
          </span>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 font-medium text-slate-900 hover:opacity-95 active:opacity-90 disabled:opacity-60 transition"
          >
            {submitting ? 'Saving…' : editingCard ? 'Update Flashcard' : 'Create '}
          </button>
          {editingCard && (
            <button
              type="button"
              onClick={onFinish}
              className="ml-3 inline-flex items-center justify-center rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/5 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FlashcardForm;
