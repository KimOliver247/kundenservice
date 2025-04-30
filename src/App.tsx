import React from 'react';
import { MessageGenerator } from './components/MessageGenerator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <MessageGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;