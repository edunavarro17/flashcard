import React, { useEffect, useState } from 'react';
import api from '../api';

type Flashcard = {
  front: string;
  back: string;
  color: string;
};

const ReviewMode: React.FC = () => {
  const [card, setCard] = useState<Flashcard | null>(null);
  const [revealed, setRevealed] = useState(false);

  const fetchCard = async () => {
    const res = await api.get('/flashcards/review');
    setCard(res.data);
    setRevealed(false);
  };

  useEffect(() => {
    fetchCard();
  }, []);

  if (!card) return <div>Loading...</div>;

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Review Mode</h2>
      <div
        className="p-6 rounded-lg shadow-md inline-block cursor-pointer transition duration-300 hover:scale-105"
        style={{ backgroundColor: card.color }}
        onClick={() => setRevealed(!revealed)}
      >
        <div className="text-lg font-semibold">
          {revealed ? card.back : card.front}
        </div>
      </div>
      <br />
      <button
        onClick={fetchCard}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Next Card
      </button>
    </div>
  );
};

export default ReviewMode;
