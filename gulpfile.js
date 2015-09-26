var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

var paths = [
    './client/app/controllers/*.js',
    './client/app/services/*.js',
    './client/app/app.js'
  ];

gulp.task('concat', function() {
  return gulp.src(paths)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./client/'));
});

gulp.task('watch', function(){
  gulp.watch(paths, ['concat']);
});

gulp.task();

gulp.task('deploy', ['concat', ]);