module.exports = {
  parser: 'postcss-scss',
  syntax: 'postcss-scss',
  plugins: {
    // 'postcss-import': {},
    // 'postcss-cssnext': {},
    'autoprefixer': {
      browsers: ["Android >= 4.4", "IOS >= 7.0"]
    },
    'cssnano': {
      preset: 'default'
    }
  }
}