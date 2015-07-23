'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var conf = require('./conf');

var includePaths = [
  path.dirname(require.resolve('bootstrap-sass/assets/stylesheets/_bootstrap.scss')),
  'app/src/components'
];
var fontPaths = [];

var sassOptions = {
  style: 'expanded',
  includePaths: includePaths
};

gulp.task('sass', function() {
  return gulp.src(['app/styles/**/*.scss', 'app/styles/**/*.css'])
  .pipe($.sourcemaps.init())
  .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
  .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest('dist/styles'))
  .pipe(browserSync.reload({stream: true}))
  .pipe($.size());
});

// Styles
gulp.task('styles', ['sass', 'moveCss']);

gulp.task('moveCss', ['clean'], function() {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['./app/styles/**/*.css'], {base: './app/styles/'})
  .pipe(gulp.dest('dist/styles'));
});
