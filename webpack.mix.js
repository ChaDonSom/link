const mix = require('laravel-mix');

var webpackConfig = {
  resolve: {
    alias: {
      '@js': path.resolve(__dirname, 'resources/js'),
      '@comps': path.resolve(__dirname, 'resources/js/components'),
      'sass': path.resolve(__dirname, 'resources/sass'),
      '@traits': path.resolve(__dirname, 'resources/js/traits'),
      '@blocks': path.resolve(__dirname, 'resources/js/components/blocks'),
      '@mdc': path.resolve(__dirname, 'resources/js/mdc'),
      '@pages': path.resolve(__dirname, 'resources/js/pages'),
      '@store': path.resolve(__dirname, 'resources/js/store'),
      '@route': path.resolve(__dirname, 'resources/js/route'),
    }
  },
}

const sassSettings = { includePaths: [path.resolve(__dirname, 'node_modules')] }

mix.extend('scssForVue', (wc, ...args) => {
  let rules = wc.module.rules
  for (let rule of rules) {
    if (rule.loaders && rule.loaders instanceof Array) {
      for (let l of rule.loaders) {
        if (l.loader == 'sass-loader') {
          for (let i in sassSettings) { l.options[i] = sassSettings[i] }
          // l.loader = 'fast-sass-loader'
        }
      }
    } else if (rule.loader) {
      rule.options = rule.options ? rule.options : {}
      if (rule.loader == 'sass-loader') for (let i in sassSettings) { l.options[i] = sassSettings[i] }
      // if (rule.loader == 'sass-loader') rule.loader = 'fast-sass-loader'
    }
  }
})

if (mix.inProduction()) mix.version()

mix
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')
  
  .webpackConfig(webpackConfig)
  .scssForVue()
  .browserSync({ proxy: 'localhost:8000' })

