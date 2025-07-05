
import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const ExpandableSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search prompt:', prompt);
    // Handle search logic here
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-96' : 'w-12'
        } h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full hover:bg-white/15`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {!isExpanded ? (
          <div className="w-full h-full flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full h-full flex items-center px-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="How are you feeling about travel?"
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExpandableSearch;
