
import { useTheme } from '../contexts/ThemeContext';

const WaveAnimation = () => {
  const { theme } = useTheme();
  
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
      <svg
        className="relative block w-full h-24"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className={`${
            theme === 'light' 
              ? 'fill-gray-50' 
              : 'fill-black'
          } transition-colors duration-300`}
        />
      </svg>
      
      {/* Animated wave layers */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 w-full h-24 animate-[wave_6s_ease-in-out_infinite]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className={`${
              theme === 'light' 
                ? 'fill-purple-100/40' 
                : 'fill-purple-900/20'
            } transition-colors duration-300`}
          />
        </svg>
        
        <svg
          className="absolute bottom-0 w-full h-24 animate-[wave_4s_ease-in-out_infinite_reverse]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={`${
              theme === 'light' 
                ? 'fill-pink-100/30' 
                : 'fill-pink-900/15'
            } transition-colors duration-300`}
          />
        </svg>
      </div>
    </div>
  );
};

export default WaveAnimation;
