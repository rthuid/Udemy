var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var autoPrifixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
var merge = require('merge-stream');
// open in browser
var open = require('gulp-open');
// for not stoping the watch progress, if error found in css
var plumber = require('gulp-plumber');

// image compression
var imagemin = require('gulp-imagemin');
var imageminPngQuant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// Path's
var SRC_PATH = './src/';
var DIST_PATH = './public/';
var PATHS = {
    DIST_SCSS: DIST_PATH + 'css',
    DIST_SCRIPTS: DIST_PATH + 'js',
    DIST_IMAGES: DIST_PATH + 'images',
    DIST_HTML: DIST_PATH,

    SRC_SCRIPTS: [
        SRC_PATH + 'scripts/**/*.js'
    ],
    VENDOR_N_APP_SCRIPT: [
        './node_modules/jquery/dist/jquery.min.js',
        // popper js only for bootstrap dropdown 
        // as per the req we can import bootstrap script partials
        './node_modules/popper.js/dist/umd/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        // it's a compiled file from all app custom script
        SRC_PATH + 'dist/js/scripts.js'
    ],
    SRC_IMAGES: SRC_PATH + 'images/**/*.{png,jpeg,jpg,svg,gif}',
    SRC_SCSS: SRC_PATH + 'scss/**/*.scss',
    SRC_HTML: SRC_PATH + '**/*.html',
}

// styles for scss
gulp.task('styles', () => {
    console.log('starting style task');
    return gulp.src(SRC_PATH + 'scss/styles.scss')
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
    .pipe(gulp.dest(PATHS.DIST_SCSS))
    .pipe(livereload())
});

// scripts
gulp.task('scripts', () => {
    var customScripts = gulp.src(PATHS.SRC_SCRIPTS)
        .pipe(plumber((err) => {
            console.log('Script Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(SRC_PATH + 'dist/js'))

    var all = gulp.src(PATHS.VENDOR_N_APP_SCRIPT)
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(PATHS.DIST_SCRIPTS))

    return merge(customScripts, all)
        .pipe(livereload())
});

// html - (only live reload for html files)
gulp.task('html', () => {
    return gulp.src(PATHS.SRC_HTML)
    .pipe(gulp.dest(PATHS.DIST_HTML))
    .pipe(livereload())
})

// images
gulp.task('images', () => {
    return gulp.src(PATHS.SRC_IMAGES)
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
    .pipe(gulp.dest(PATHS.DIST_IMAGES))
    .pipe(livereload())
});

// clean|delete
gulp.task('clean', () => {
    return del([
        PATHS.DIST_HTML, PATHS.DIST_IMAGES, PATHS.DIST_SCRIPTS, PATHS.DIST_SCSS
    ])
})

// default
gulp.task('default', ['clean','scripts','html', 'images', 'styles'], () => {
    console.log('starting default task');
});

// watch
gulp.task('watch',['default'], ()=> {
    console.log('Starting watch task')
    require('./server.js')
    gulp.src(DIST_PATH + '/index.html')
    .pipe(open({uri: 'http://localhost:3000/'}));
    livereload.listen();
    gulp.watch(PATHS.SRC_SCRIPTS, ['scripts']);
    gulp.watch(PATHS.SRC_SCSS, ['styles']);
    gulp.watch(PATHS.SRC_HTML, ['html']);
    gulp.watch(PATHS.SRC_IMAGES, ['images']);
});



