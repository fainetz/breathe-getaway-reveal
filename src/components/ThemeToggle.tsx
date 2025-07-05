
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Switch } from './ui/switch';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-3">
      <Sun className="w-4 h-4 text-yellow-500" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-yellow-400"
      />
      <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
    </div>
  );
};

export default ThemeToggle;
