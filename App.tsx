
import React from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
};

export default App;
