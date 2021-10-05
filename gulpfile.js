const { watch, src, dest, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-minify');
const del = require('del');
const replace = require('gulp-replace');
const fileinclude = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');

const config = {
  app: {
    js: './app/js/*.js',
    scss: './app/scss/*.scss',
    css: './app/css/*.css',
    images: './app/img/*.*',
    html: './app/*.html',
    fonts: './app/fonts/*',
    parts: './app/parts/*.html',
  },
  extra: {
    css: './app/css',
  },
  dist: {
    base: './dist',
    images: './dist/img',
    css: './dist/css',
    fonts: './dist/fonts',
    js: './dist/js',
  },
};

function liveReload(done) {
  browserSync.init({
    server: {
      baseDir: config.dist.base,
    },
  });
  done();
}
function reload(done) {
  browserSync.reload();
  done();
}
function htmlTask(done) {
  src(config.app.html)
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(dest(config.dist.base));
  done();
}

// scss
function scssTask(done) {
  src(config.app.scss)
    .pipe(scss().on('error', scss.logError))
    .pipe(dest(config.extra.css));
  done();
}

// js
function jsTask(done) {
  src(config.app.js).pipe(dest(config.dist.js));
  done();
}
// minifikacja obrazków
function imagesTask(done) {
  src(config.app.images)
    .pipe(changed(config.dist.base))
    .pipe(imagemin())
    .pipe(dest(config.dist.images));
  done();
}
function fontsTask(done) {
  src(config.app.fonts).pipe(dest(config.dist.fonts));
  done();
}
// obserwacja zmian na plikach
function watchFiles(done) {
  watch(config.app.html, series(htmlTask, reload));
  watch(config.app.parts, series(htmlTask, reload));
  watch(config.app.scss, series(scssTask, reload));
  watch(config.app.js, series(jsPathTask, reload));
  watch(config.app.css, series(cssTask, reload));
  watch(config.app.images, series(imagesTask, reload));
  done();
}

function cleanUp() {
  return del([config.dist.base]);
}

function htmlPathTask(done) {
  src(config.app.html)
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(replace('../img/', 'img/'))
    .pipe(replace('css/', 'css/'))
    .pipe(replace('js/', 'js/'))
    .pipe(dest(config.dist.base));

  done();
}

function cssTask(done) {
  src(config.app.css)
    .pipe(autoprefixer('last 5 versions'))
    .pipe(concat('main.min.css'))
    .pipe(cleanCSS())
    .pipe(dest(config.dist.css));
  done();
}

function cssPathTask(done) {
  src(config.app.css)
    .pipe(autoprefixer('last 5 versions'))
    .pipe(concat('main.min.css'))
    .pipe(cleanCSS())
    .pipe(replace('../img/', '../img/'))
    .pipe(dest(config.dist.css));
  done();
}

function jsPathTask(done) {
  src(config.app.js)
    .pipe(concat('script.js'))
    .pipe(replace('../img/', 'img/'))
    .pipe(uglify())
    .pipe(dest(config.dist.js));
  done();
}

exports.default = parallel(
  htmlTask,
  scssTask,
  imagesTask,
  fontsTask,
  cssTask,
  jsPathTask,
  watchFiles,
  liveReload
);
exports.prod = series(
  cleanUp,
  parallel(jsTask, scssTask, imagesTask, fontsTask),
  htmlPathTask,
  cssPathTask,
  jsPathTask
);
