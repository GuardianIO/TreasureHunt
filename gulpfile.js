var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = [
    './client/app/services/*.js',
    './client/app/controllers/*.js',
    './client/app/app.js'
  ];

gulp.task('concat', function() {
  return gulp.src(paths)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./client/'))
    .on('error', function(err){
      console.log(err);
    })
});

gulp.task('build', function(){
  return gulp.src(paths)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./client/'));
});

gulp.task('watch', ['concat'], function(){
  gulp.watch(paths, ['concat']);
});
