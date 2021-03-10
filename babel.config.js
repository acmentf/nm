module.exports = {
  presets: [['@vue/app', {
    polyfills: [
      'es.promise',
      'es.symbol'
    ]
  }]],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: name => `${name}/style/less`
    }, 'vant']
  ]
}
