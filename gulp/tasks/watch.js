var config = require('../config'),
    gulp = require('gulp');
   

gulp.task('default', ['styles', 'scripts', 'vendor'], function() {
  gulp.watch(config.paths.css.all, ['styles']);
  gulp.watch(config.paths.js.app, ['scripts']);
  gulp.watch(config.paths.views.all, ['views']);
  gulp.watch(config.paths.views.index, ['views']);
  gulp.watch(config.paths.assets.images, ['assets']);
  gulp.watch(config.paths.js.vendor, ['vendor']);
});
