'use strict';

var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();

var conf = require('./conf');

// HTML
gulp.task('html', function() {
  return gulp.src('app/*.html')
  .pipe($.useref())
  .pipe(gulp.dest('dist'))
  .pipe($.size());
});

// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
  .pipe($.cache($.imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'))
  .pipe($.size());
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src('**/*.{eot,svg,ttf,woff,woff2}')
    .pipe($.flatten())
    .pipe(gulp.dest(conf.paths.dist + '/fonts/'))
    .pipe($.size());
});

// Clean
gulp.task('clean', function(cb) {
  $.cache.clearAll();
  cb(del.sync(conf.paths.dist + '/**'));
});

gulp.task('json', function() {
  gulp.src('app/scripts/json/**/*.json', {
    base: 'app/scripts'
  })
  .pipe(gulp.dest('dist/scripts/'));
});

// Robots.txt and favicon.ico
gulp.task('extras', function() {
  return gulp.src(['app/*.txt', 'app/*.ico'])
  .pipe(gulp.dest('dist/'))
  .pipe($.size());
});

// Build
gulp.task('build', ['html', 'buildBundle', 'images', 'fonts', 'extras'], function() {
  gulp.src('dist/scripts/app.js')
  .pipe($.uglify())
  .pipe($.stripDebug())
  .pipe(gulp.dest('dist/scripts'));
});
