import React, { useEffect, useState } from 'react';
import api from '../api';
import FlashcardForm from './FlashcardForm';
import Flashcard from './Flashcard';

type FlashcardT = {
  id: number;
  front: string;
  back: string;
  color: string;
};

const Skeleton: React.FC = () => (
  <div className="animate-pulse rounded-xl bg-white/5 h-40 border border-white/10" />
);

const FlashcardList: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardT[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCard, setEditingCard] = useState<FlashcardT | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const fetchFlashcards = async () => {
    setLoading(true);
    try {
      const res = await api.get('/flashcards');
      setFlashcards(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const deleteFlashcard = async (id: number) => {
    await api.delete(`/flashcards/${id}`);
    setConfirmId(null);
    fetchFlashcards();
  };

  useEffect(() => {
    fetchFlashcards();
    const handler = () => fetchFlashcards();
    window.addEventListener('flashcards:changed', handler);
    return () => window.removeEventListener('flashcards:changed', handler);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-[360px,1fr]">
      <div className="order-2 md:order-1">
        <FlashcardForm
          editingCard={editingCard}
          onFinish={() => {
            setEditingCard(null);
            fetchFlashcards();
          }}
        />
      </div>

      <div className="order-1 md:order-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">All Flashcards</h2>
          <span className="text-xs text-slate-400">
            {flashcards.length} item{flashcards.length === 1 ? '' : 's'}
          </span>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton /><Skeleton /><Skeleton /><Skeleton />
          </div>
        ) : flashcards.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300 text-sm">
            No flashcards yet. Create your first one on the left ➜
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {flashcards.map((card) => (
              <div key={card.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20">
                <Flashcard front={card.front} back={card.back} color={card.color} />

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => setEditingCard(card)}
                    className="text-cyan-300 hover:text-cyan-200 text-sm underline underline-offset-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmId(card.id)}
                    className="text-rose-300 hover:text-rose-200 text-sm underline underline-offset-4"
                  >
                    Delete
                  </button>
                  <span
                    className="ml-auto inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-medium"
                    style={{ backgroundColor: card.color, color: '#0f172a' }}
                    title={card.color}
                  >
                    ● {card.color}
                  </span>
                </div>

                {confirmId === card.id && (
                  <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/70 p-3">
                    <div className="text-sm mb-2">Delete this flashcard?</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteFlashcard(card.id)}
                        className="rounded-md bg-rose-500/90 px-3 py-1.5 text-sm text-white hover:bg-rose-500 transition"
                      >
                        Yes, delete
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="rounded-md border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardList;
