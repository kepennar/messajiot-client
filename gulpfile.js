'use strict';

var gulp = require('gulp');
var del = require('del');
var wrench = require('wrench');
var path = require('path');

// Load plugins
var $ = require('gulp-load-plugins')();




var browserSync = require('browser-sync');
var reload = browserSync.reload;

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

// Default task
gulp.task('default', ['clean', 'build'  , 'jest'  ]);
