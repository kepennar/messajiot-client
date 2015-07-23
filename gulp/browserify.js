'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var conf = require('./conf');

var bundler = watchify(browserify({
  entries: [conf.paths.sourceFile],
  debug: true,
  insertGlobals: true,
  cache: {},
  packageCache: {},
  fullPaths: false
}));

bundler.on('update', rebundle);
bundler.on('log', $.util.log);

function rebundle() {
  return bundler.bundle()
  // log errors if they happen
  .on('error', $.util.log.bind($.util, 'Browserify Error'))
  .pipe(source(conf.paths.destFileName))
  // Sourcemaps
  .pipe(buffer())
  .pipe($.sourcemaps.init({
    loadMaps: true
  })) // loads map from browserify file
  .pipe($.sourcemaps.write('./')) // writes .map file
  //  !Sourcemaps
  .pipe(gulp.dest(conf.paths.destFolder))
  .on('end', function() {
    browserSync.reload;
  });
}

// Bundle
gulp.task('bundle', ['styles', 'scripts'], function() {
  return gulp.src('./app/*.html')
  .pipe($.useref.assets())
  .pipe($.useref.restore())
  .pipe($.useref())
  .pipe(gulp.dest(conf.paths.dist))
  .pipe($.size('bundle'));
});

gulp.task('buildBundle', ['styles', 'buildScripts', 'moveLibraries'], function() {
  return gulp.src('./app/*.html')
  .pipe($.useref.assets())
  .pipe($.useref.restore())
  .pipe($.useref())
  .pipe(gulp.dest(conf.paths.dist))
  .pipe($.size());
});

gulp.task('buildScripts', function() {
  return browserify(sourceFile)
  .bundle()
  .pipe(source(conf.paths.destFileName))
  // Sourcemaps
  .pipe(buffer())
  .pipe($.sourcemaps.init({
    loadMaps: true
  })) // loads map from browserify file
  .pipe($.sourcemaps.write('./')) // writes .map file
  //  !Sourcemaps
  .pipe(gulp.dest(conf.paths.dist + '/scripts'))
  .pipe($.size());
});

// Scripts
gulp.task('scripts', rebundle);

