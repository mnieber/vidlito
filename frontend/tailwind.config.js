module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        bump: 'bump 1s ease-in-out 3',
      },
      keyframes: {
        bump: {
          '75%, 100%': {
            transform: 'scale(2)',
          },
        },
      },
    },
  },
  plugins: [],
};
