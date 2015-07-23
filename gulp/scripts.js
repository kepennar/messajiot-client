'use strict';

var gulp = require('gulp');
var conf = require('./conf');
// Move JS Files and Libraries
gulp.task('moveLibraries', ['clean'], function() {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['./' + conf.paths.src + '/**/*.js'], {base: './app/scripts/'})
  .pipe(gulp.dest(conf.paths.dist));
});
