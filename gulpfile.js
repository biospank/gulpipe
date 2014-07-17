var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps')
// var rev = require('gulp-rev');

gulp.task('sass', function () {
    gulp.src('./scss/base.scss')
        .pipe(sass())
        // .pipe(rev.manifest())
        .pipe(gulp.dest('./css'));
});

gulp.task('templates', function() {
  gulp.src('./src/templates/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('coffee', function() {
  gulp.src('./src/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', function(err) {console.log(err.message);}))
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/'))
});

gulp.task('watch', ['sass', 'templates', 'coffee'], function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('src/templates/**/*.jade', ['templates']);
  gulp.watch('src/**/*.coffee', ['cofee']);
});

gulp.task('default', ['watch', 'sass', 'templates', 'coffee']);
