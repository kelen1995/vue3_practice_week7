module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue3_practice_week7/'
    : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'KL Backery',
    },
  },
};
