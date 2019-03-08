/*****************************************************
GULP COMMANDS
--prod              :: add this flag for production build, this will ignoore sourcemaps from dist files eg: gulp watch --prod
gulp watch          :: for watching clean, sass ans js fils
gulp                :: for running default tasks - clean, styles and scripts
gulp images         :: for minifying images from src folder to dist folder
gulp clean          :: for cleaning dist css and js folder
gulp clean-image    :: for cleaning dist image folder

******************************************************/

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoPrifixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
var replace = require('gulp-replace');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var gulpsync = require('gulp-sync')(gulp);
// for not stoping the watch progress, if error found in css
var plumber = require('gulp-plumber');
// image compression
var imagemin = require('gulp-imagemin');
var imageminPngQuant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
// Path's
var SRC_PATH = './src/';
var DIST_PATH = './dist/';
var PATHS = {
    DIST_SCSS: DIST_PATH + 'css',
    DIST_SCRIPTS: DIST_PATH + 'js',
    DIST_IMAGES: DIST_PATH + 'images',

    SRC_SCRIPTS: [
        SRC_PATH + 'scripts/**/*.js'
    ],
    VENDOR_N_APP_SCRIPT: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/owl.carousel/dist/owl.carousel.min.js',
        './node_modules/@vimeo/player/dist/player.min.js',
        './node_modules/lottie-web/build/player/lottie.min.js',
        './node_modules/barba.js/dist/barba.js',
        './node_modules/gsap/src/minified/TweenMax.min.js',
        // it's a compiled file from all app custom script
        SRC_PATH + 'dist/js/scripts.js'
    ],
    SRC_IMAGES: SRC_PATH + 'images/**/*.{png,jpeg,jpg,svg,gif}',
    SRC_SCSS: SRC_PATH + 'scss/**/*.scss',
    SRC_POLL_BE_FILE: ['../../../wp-content/plugins/ff-polls/polls-admin-js.dev.js']
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
    .pipe(gulpif(argv.prod != true, sourcemaps.init()))
    .pipe(autoPrifixer())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(gulpif(argv.prod != true, sourcemaps.write()))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.DIST_SCSS))
});

// scripts
gulp.task('scripts', gulpsync.sync(['scripts-apps','scripts-all','clean-script-app']), () => {
    console.log('starting scripts task');
});

// scripts for custom js files
gulp.task('scripts-apps', () => {
    // var customScripts = gulp.src(PATHS.SRC_SCRIPTS)
    return gulp.src(PATHS.SRC_SCRIPTS)
        .pipe(plumber((err) => {
            console.log('Script Error');
            console.log(err);
            this.emit('end');
        }))        
        .pipe(gulpif(argv.prod != true, sourcemaps.init()))
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(replace('"use strict";', ''))
        .pipe(concat('scripts.js'))
        .pipe(replace('"use strict";', ''))
        .pipe(gulpif(argv.prod != true, sourcemaps.write()))
        .pipe(gulp.dest(SRC_PATH + 'dist/js'))    
});

// scripts for vendors and bundled custom js file
gulp.task('scripts-all', () => {
    // var all = gulp.src(PATHS.VENDOR_N_APP_SCRIPT)
    return gulp.src(PATHS.VENDOR_N_APP_SCRIPT)
        .pipe(gulpif(argv.prod != true, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(concat('scripts.js'))
        .pipe(replace('"use strict";', ''))
        .pipe(gulpif(argv.prod != true, sourcemaps.write()))
        .pipe(gulp.dest(PATHS.DIST_SCRIPTS))
});

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
});

// clean|delete
gulp.task('clean', () => {
    return del([
        PATHS.DIST_SCRIPTS, PATHS.DIST_SCSS
    ])
});

// clean|delete
gulp.task('clean-script-app', () => {
    return del([
        SRC_PATH + 'dist'
    ])
});

// clean IMAGE |delete
gulp.task('clean-image', () => {
    return del([
        PATHS.DIST_IMAGES
    ])
});

// default
gulp.task('default', gulpsync.sync(['clean', ['scripts', 'styles']]), () => {
    console.log('starting default task');
});

// watch
gulp.task('watch',['default'], ()=> {
    console.log('Starting watch task')
    gulp.src(DIST_PATH + '/index.html')
    gulp.watch(PATHS.SRC_SCRIPTS, ['scripts']);
    gulp.watch(PATHS.SRC_SCSS, ['styles']);
    gulp.watch(PATHS.SRC_IMAGES, ['images']);
});

// scripts for custom js files
gulp.task('scripts-backend', () => {
    // var customScripts = gulp.src(PATHS.SRC_SCRIPTS)
    return gulp.src(PATHS.SRC_POLL_BE_FILE)
        .pipe(plumber((err) => {
            console.log('Script Error on poll backend js');
            console.log(err);
            this.emit('end');
        }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(replace('"use strict";', ''))
        .pipe(concat('polls-admin-js.js'))
        .pipe(replace('"use strict";', ''))
        .pipe(gulp.dest('../../../wp-content/plugins/ff-polls/'))    
});



