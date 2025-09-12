import React, { useState } from 'react';

type Props = { front: string; back: string; color: string };

const Flashcard: React.FC<Props> = ({ front, back, color }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group perspective"
      onClick={() => setFlipped((v) => !v)}
      title="Click to flip"
    >
      <div
        className={`relative h-40 w-full rounded-xl shadow-xl transition-transform duration-500 preserve-3d cursor-pointer 
        ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 backface-hidden flex items-center justify-center p-4 text-slate-900 font-semibold">
          {front}
        </div>
        <div className="absolute inset-0 [transform:rotateY(180deg)] backface-hidden flex items-center justify-center p-4 text-slate-900 font-semibold">
          {back}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
