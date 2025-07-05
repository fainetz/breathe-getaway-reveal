
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Switch } from './ui/switch';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-3">
      <Sun className="w-4 h-4 text-gray-300" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-gray-600 data-[state=unchecked]:bg-gray-300"
      />
      <Moon className="w-4 h-4 text-gray-300" />
    </div>
  );
};

export default ThemeToggle;
