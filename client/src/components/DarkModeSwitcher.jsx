import { useEffect, useState } from 'react';

const DarkModeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);

    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  };



  return (
<>
<label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={toggleDarkMode}
        checked={isDarkMode}
      />
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Toggle Dark Mode
      </span>
    </label>



    </>
  );
};

export default DarkModeSwitcher;
