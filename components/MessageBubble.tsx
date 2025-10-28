
import React from 'react';
import { Message, MessageRole } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';
import { WarningIcon } from './icons/WarningIcon';

interface MessageBubbleProps {
  message: Message;
  isLoading: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLoading }) => {
  const isUser = message.role === MessageRole.USER;
  const isError = message.role === MessageRole.ERROR;

  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white self-end'
    : 'bg-gray-700 text-gray-200 self-start';
  
  const errorClasses = isError ? 'bg-red-900/50 border border-red-500 text-red-300' : '';
  
  const containerClasses = isUser ? 'justify-end' : 'justify-start';

  const Avatar = () => {
    if (isError) {
      return (
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-red-800 flex items-center justify-center">
            <WarningIcon className="w-5 h-5 text-red-300" />
        </div>
      );
    }
    if (isUser) {
        return (
            <div className="w-8 h-8 rounded-full flex-shrink-0 bg-blue-600 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
            </div>
        );
    }
    return (
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-600 flex items-center justify-center">
             <BotIcon className="w-5 h-5 text-green-400" />
        </div>
    );
  };

  const LoadingIndicator = () => (
    <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    </div>
  );
  
  // Format content to handle newlines
  const formattedContent = message.content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className={`flex items-start gap-3 w-full ${containerClasses}`}>
      {!isUser && <Avatar />}
      <div className={`max-w-xl lg:max-w-2xl rounded-lg px-4 py-3 shadow-md ${bubbleClasses} ${errorClasses}`}>
        {isLoading && message.content === '' ? <LoadingIndicator /> : formattedContent}
      </div>
       {isUser && <Avatar />}
    </div>
  );
};

export default MessageBubble;
