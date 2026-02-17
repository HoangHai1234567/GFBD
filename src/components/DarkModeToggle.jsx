import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', newMode.toString());

    if (newMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-24 right-8 z-[9998] w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <FaSun className="text-yellow-300 text-2xl" />
      ) : (
        <FaMoon className="text-white text-2xl" />
      )}
    </button>
  );
};

export default DarkModeToggle;
