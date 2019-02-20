const gulp = require('gulp'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      browserSync = require('browser-sync').create(),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      sourcemaps = require('gulp-sourcemaps');


const paths = {
  styles: {
      //by using '**', we tell gulp to check all folders for any .scss files
    src : 'src/scss/**/*.scss',
      //compiled files will end up in the folder they are found in
    dest : 'src/css'
  },
  html: {
    src : 'src/**/*.html'
  }
}


//Compile SASS

function style(){
  return (
    // where to look for .scss files?
    gulp
      .src(paths.styles.src)

        // initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())

        // use sass on any files found and log any errors
      .pipe(sass())
      .on('error', sass.logError)

        // use postcss with autoprefixer and then compile with cssnano
      .pipe(postcss([autoprefixer(), cssnano()]))

        // now add/write the sourcemaps
      .pipe(sourcemaps.write())

        // destination for compiled files:
      .pipe(gulp.dest(paths.styles.dest))

        // add browserSync stream to pipeline after compilation
      .pipe(browserSync.stream())
  );
};

function watch(){
  browserSync.init({
    server: './src'
  })
    //run compile task when watch task starts
  // style();
    // gulp watch takes in location of files to Watch
    // and the function we want to run on('change')
  gulp.watch([paths.styles.src], style);
  gulp.watch([paths.html.src]).on('change', browserSync.reload);
}


gulp.task('default', gulp.parallel(style, watch))
