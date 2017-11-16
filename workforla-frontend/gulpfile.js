"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  del = require('del'),
  browserSync = require('browser-sync').create();

gulp.task("concatScripts", function() {
  return gulp.src([
      'js/jquery.js',
      'js/sticky/jquery.sticky.js',
      'js/main.js'])
    .pipe(maps.init())
    .pipe(concat("app.js"))
    .pipe(maps.write('./'))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function(){
  return gulp.src("scss/**/*.scss")
    .pipe(maps.init())
    .pipe(sass())
    .on('error', function (err) {
      console.log(err.toString());

      this.emit('end');
    })
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
})

gulp.task('watch', ["browser-sync"], function(){
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('**/*.html').on('change', browserSync.reload);
  gulp.watch('js/app.js', ['concatScripts']);
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('clean', function() {
  del(['dist', 'css/style.css*', 'js/app.js*']);
});

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src(["css/style.css", "js/app.min.js",
        "**/*.html", "img/**", "fonts/**"], { base: './'})
  .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function(){
  gulp.start('build');
});
