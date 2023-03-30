module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'playlist-item': 'bounce 1s ease-in-out 3',
        delete: 'pulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
