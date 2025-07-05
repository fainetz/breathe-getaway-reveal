
import { useState } from 'react';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Hi! I\'m here to help you discover your perfect getaway. What\'s on your mind?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, 
        { type: 'user', text: input },
        { type: 'ai', text: 'That sounds like you need something truly transformative. Let me think about the perfect escape for you...' }
      ]);
      setInput('');
    }
  };

  return (
    <>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white/95 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-2xl z-50 transition-colors duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Travel Soul AI</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-gray-100 transition-colors duration-300'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="How are you feeling about travel?"
                className="flex-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-xl hover:shadow-lg transition-all"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center text-2xl z-40"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
};

export default ChatBubble;
