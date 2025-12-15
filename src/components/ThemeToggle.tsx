import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const updateThemeColor = (isDark: boolean) => {
    const themeColor = isDark ? '#0f172a' : '#ffffff';
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = themeColor;
      document.head.appendChild(meta);
    }
  };

  useEffect(() => {
    // 檢查當前主題狀態
    const checkCurrentTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      setIsDark(shouldBeDark);
    };

    // 初始檢查
    checkCurrentTheme();

    // 監聽系統主題變化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // 只有在沒有手動設置主題時才跟隨系統
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        checkCurrentTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // 應用到DOM
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 更新主題色
    updateThemeColor(newIsDark);

    // 保存用戶手動選擇
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="glass px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base min-w-[80px] sm:min-w-[100px]"
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--bg-glass-border)',
        color: 'var(--text-primary)',
        touchAction: 'manipulation', // 优化触摸体验
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeToggle;

