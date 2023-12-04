const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const cwebp = require('gulp-cwebp');
const imgToPicture = require("gulp-html-img-to-picture");
const critical = require('critical');
const htmlmin = require('gulp-htmlmin');


// gulp-sass
function buildStyles() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
};

// npm install --save-dev gulp-clean
 
gulp.task('clean', function () {
    return gulp.src('./dist/')
        .pipe(clean());
});

//npm install browser-sync gulp --save-dev


// Watch Task
function watchTask(){
  gulp.watch('*.html', browsersyncReload);
  gulp.watch(['./**/*.scss', './**/*.js'], gulp.series(buildStyles, browsersyncReload));
}
function browsersyncReload(cb){
  browserSync.reload();
  cb();
}
function browsersyncServe(cb){
  browserSync.init({
    server: {
      baseDir: '.'
    }    
  });
  cb();
}

// npm install --save-dev gulp-minify

gulp.task('compress', function(cb) {
  gulp.src('js/**/*.js')
    .pipe(minify({
      noSource: true,
      ext: {
        min: '.js'
      }
    }))
    .pipe(gulp.dest('./dist/js/'));
    cb();
});


// gulp-imagemin@8.0.0

gulp.task('images', (done) =>{
  return gulp.src('./images/**/*.{gif,png,jpg,svg,webp}')
  .pipe(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({
      quality: 79,
      progressive: true
    }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: true },
        { cleanupIDs: false }
      ]
    })
  ]))
  .pipe(gulp.dest('dist/images/'));
  done();
});


// npm install --save-dev gulp-cwebp
gulp.task('cwebp', function (cb) {
  gulp.src('./images/*')
    .pipe(cwebp())
    .pipe(gulp.dest('./dist/images/'));
    cb();
});

// npm i --save-dev gulp-html-img-to-picture

function html(cb) {
  return gulp.src('dist/*.html')
      .pipe(imgToPicture({
          imgFolder: './images',
      }))
      .pipe(gulp.dest('dist/'));
      cb();
}

// npm i -D critical

gulp.task('critical', function (done) {
  critical.generate({
      inline: true,
      base: './',
      src: './dist/index.html',
      target: 'dist/index.html',
      minify: true,
      ignore: {
        atrule: ['@font-face'],
        rule: [/some-regexp/],
        decl: (node, value) => /big-image\.png/.test(value),
    },
  });
  done();
});

// npm install --save gulp-htmlmin
 
gulp.task('minify', (cb) => {
  return gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'));
    cb();
});


exports.buildStyles = buildStyles;
exports.watch = function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
};

exports.build = gulp.series( 'minify',  html, buildStyles, 'critical',  'images', 'compress', 'cwebp', );

exports.serve = gulp.series(browsersyncServe, watchTask);



// sass to css + 
// clean dist + 
// browsersync (live reload) +
// minify js +
// compress images + 
// webp images +
// img to picture +
// critical CSS +
// minify HTML +