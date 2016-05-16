var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var through2 = require('through2');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var rename = require('gulp-rename');
var tools = require('aurelia-tools');

var jsName = paths.packageName + '.js';

gulp.task('build-index', function(){
  return gulp.src(paths.source)
    .pipe(gulp.dest(paths.tmp));
});

// gulp.task('build-es2015', function () {
//   return gulp.src(paths.tmp + '/**/*.js')
//     .pipe(to5(assign({}, compilerOptions.es2015())))
//     .pipe(gulp.dest(paths.output + 'es2015'));
// });

gulp.task('build-commonjs', function () {
  return gulp.src(paths.tmp + '/**/*.js')
    .pipe(to5(assign({}, compilerOptions.commonjs())))
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

// gulp.task('build-amd', function () {
//   return gulp.src(paths.tmp + '/**/*.js')
//     .pipe(to5(assign({}, compilerOptions.amd())))
//     .pipe(gulp.dest(paths.output + 'amd'));
// });
//
// gulp.task('build-system', function () {
//   return gulp.src(paths.output + jsName)
//     .pipe(to5(assign({}, compilerOptions.system())))
//     .pipe(gulp.dest(paths.output + 'system'));
// });
//
// gulp.task('build-dts', function(){
//   return gulp.src(paths.output + paths.packageName + '.d.ts')
//       .pipe(rename(paths.packageName + '.d.ts'))
//       .pipe(gulp.dest(paths.output + 'es2015'))
//       .pipe(gulp.dest(paths.output + 'commonjs'))
//       .pipe(gulp.dest(paths.output + 'amd'))
//       .pipe(gulp.dest(paths.output + 'system'));
// });

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    'lint',
    'env',
    'build-index',
    //'build-es2015',
    'build-commonjs',
    //'build-amd',
    //'build-system',
    //'build-dts',
    callback
  );
});
