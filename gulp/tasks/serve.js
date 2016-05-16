var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var yargs = require('yargs');
var paths = require('../paths');
var argv = yargs.argv;
var started = false;


gulp.task('browser-sync', function() {
	browserSync.init(null, {
		proxy: "http://0.0.0.0:9001",
    files: ["dist/**/*.*", "!dist/tmp/**/*"],
    browser: "google-chrome",
    port: 5000,
	});
});

gulp.task('serve', [ 'build' ], function(callback) {
	return nodemon({
    script: './bootstrap.js',
    watch: paths.root,
    ext: 'js json',
    tasks: [ 'build' ],
    legacyWatch: true
  })
  .on('start', function(event) {
    if (!started) {
      started = true;
      gulp.start('browser-sync');
    }
  })
  .on('change', function(event) {
    console.log('changed!', event);
  })
  .on('restart', function () {
    console.log('restarted!');
  });
});

gulp.task('env', function() {
  return gulp.src(paths.env)
    .pipe(gulp.dest(paths.output));
});
