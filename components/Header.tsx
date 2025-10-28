
import React from 'react';
import { BotIcon } from './icons/BotIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md p-4 flex items-center space-x-3">
       <div className="w-8 h-8 text-green-400">
        <BotIcon />
       </div>
      <div>
        <h1 className="text-xl font-bold text-white">FinAI Buddy</h1>
        <p className="text-sm text-green-400">The Wealth Whisperer</p>
      </div>
    </header>
  );
};

export default Header;
