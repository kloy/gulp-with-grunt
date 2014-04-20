'use strict';

var gulp = require('gulp'),
	less = require('gulp-less');

module.exports = function (grunt) {

	grunt.initConfig({
		clean: ['dest'],
		copy: {
			styles: {
				src: 'dest/styles.css',
				dest: 'dest/styles-version-0.0.1.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('styles', function () {

		var done = this.async();

		grunt.log.writeln('grunt styles: start');

		gulp.
			src('src/styles.less').
			pipe(less()).
				on('error', function (err) {
					grunt.log.writeln('less() error event');
					grunt.fail.fatal(err.message);
				}).
				on('finish', function () {
					grunt.log.writeln('less() finish event');
				}).
			pipe(gulp.dest('dest')).
				on('error', function (err) {
					grunt.log.writeln('gulp.dest() error event');
					grunt.fail.fatal(err.message);
				}).
				// gulp.dest emits "close" event when stream is complete
				on('close', function () {
					grunt.log.writeln('gulp.dest() close event');
					grunt.log.writeln('grunt styles: finished');
					// Let grunt know asynx task is done.
					done();
				});
	});

	grunt.registerTask('default', ['clean', 'styles', 'copy:styles']);
};