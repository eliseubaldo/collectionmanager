module.exports = {
  paths: {
    project: './',
    css: {
      entry: 'src/assets/styles/main.scss',
      all: 'src/assets/styles/**/*.scss',
      dest: 'dist/assets/css'
    },
    assets:{
      images: 'src/assets/images/**/*',
      dest: 'dist/assets/images'
    },
    js: {
      app: 'src/app/**/*.js',
      vendor: 'bower_components',
      dest: 'dist/app'      
    },
    views:{
      index: 'src/index.html',
      all: 'src/views/**/*.html',
      dest: 'dist/views'
    }
  },
  names: {
    css: 'main.css',
    js: {
      app: 'main.js',
      vendor: 'vendor.js'
    }
  }
};