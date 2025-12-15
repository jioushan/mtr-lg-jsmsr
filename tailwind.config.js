/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,vue,js,ts,jsx,tsx,css}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
      },
      screens: {
        'xs': '475px',   // 超小屏幕手机
        'sm': '640px',   // 小屏幕手机
        'md': '768px',   // 大屏幕手机/小平板
        'lg': '1024px',  // 平板/小笔记本
        'xl': '1280px',  // 笔记本
        '2xl': '1536px', // 大屏幕
        '3xl': '1920px', // 全高清
        '4xl': '2560px', // 4K显示器
        '5xl': '3840px', // 8K显示器
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      maxHeight: {
        '64': '16rem',
        '80': '20rem',
        '96': '24rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

