import React from 'react';
import FlashcardForm from './components/FlashcardForm';
import FlashcardList from './components/FlashcardList';
import ReviewMode from './components/ReviewMode';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/5 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              Flashcard App
            </span>
          </h1>
          <div className="text-xs md:text-sm text-slate-300">
            CRUD
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <FlashcardList />
      </main>

      <footer className="mt-10 pb-10 text-center text-xs text-slate-400">
      clean UI / accessible
      </footer>
    </div>
  );
}

export default App;
