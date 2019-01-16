var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoPrifixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
// for not stoping the watch if error found in css
var plumber = require('gulp-plumber');

// image compression
var imagemin = require('gulp-imagemin');
var imageminPngQuant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// common dest path
var DIST_PATH = 'public/dist';
var DIST_PATH_CSS = 'public/css';
var DIST_PATH_SCRIPTS = 'public/js';
var DIST_PATH_IMAGES = 'public/images';
// file path
var SCRIPTS_PATH = [
    'mockups/scripts/vendor/jquery-3.3.1.min.js',
    'mockups/scripts/**/*.js'
];
var IMAGES_PATH = 'mockups/images/**/*.{png,jpeg,jpg,svg,gif}';
var SCSS_PATH = 'mockups/scss/**/*.scss';
var HTML_PATH = 'public/**/*.html';

// styles for scss
gulp.task('styles', () => {
    console.log('starting style task');

    return gulp.src('mockups/scss/styles.scss')
    .pipe(plumber((err) => {
        console.log('Style Error');
        console.log(err);
        this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoPrifixer())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH_CSS))
    .pipe(livereload())
});


// scripts
gulp.task('scripts', () => {
    return gulp.src(SCRIPTS_PATH)
    .pipe(plumber((err) => {
        console.log('Script Error');
        console.log(err);
        this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH_SCRIPTS))
    .pipe(livereload())
});

// html - (only live reload for html files)
gulp.task('html', () => {
    return gulp.src(HTML_PATH)
    .pipe(gulp.dest(''))
    .pipe(livereload())
})

// images
gulp.task('images', () => {
    return gulp.src(IMAGES_PATH)
    .pipe(imagemin(
        [
            imagemin.gifsicle(),
            imagemin.jpegtran(),
            imagemin.optipng(),
            imagemin.svgo(),
            imageminPngQuant(),
            imageminJpegRecompress()
        ]
    ))
    .pipe(gulp.dest(DIST_PATH_IMAGES));
});

// clean|delete
gulp.task('clean', () => {
    return del.sync([
        DIST_PATH, DIST_PATH_SCRIPTS, DIST_PATH_CSS, DIST_PATH_IMAGES
    ])
})

// default
gulp.task('default', ['clean', 'images', 'styles', 'scripts'], () => {
    console.log('starting default task');
});

// watch
gulp.task('watch',['default'], ()=> {
    console.log('Starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(SCSS_PATH, ['styles']);
    gulp.watch('./public/**/*.html', ['html']);
});



