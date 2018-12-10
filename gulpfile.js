/*
 Settings & config
 ======================== */

 const paths = {
    src: 'src/',
    dest: 'assets/',
    js: {
        src: 'src/js/',
        dest: 'assets/js/',
        file: 'main.js'
    },
    css: {
        src: 'src/less/',
        dest: 'assets/css/',
        file: 'main.css'
    }
};

const pkg = require('./package.json'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    lesshint = require('gulp-lesshint'),
    lessPluginAutoPrefix = require('less-plugin-autoprefix'),
    lessAutoPrefix= new lessPluginAutoPrefix({
        browsers: ['last 2 versions', 'ie 11']
    }),
    $ = require('gulp-load-plugins')();

/*
 Task: 'js'
 ======================== */

gulp.task('js', () =>
    gulp.src(paths.js.src + '*.js')
        .pipe(plumber(function (error) {
            console.log('=> Error with Javascript: '+ error.message);
            this.emit('end');
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel())
        .pipe(concat(paths.js.file))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true,
            preserveComments: 'some',
            compress: {
                sequences: false,
                hoist_vars: false
            }
        }))
        .pipe(gulp.dest(paths.js.dest))
);

/*
 Task: 'css'
 ======================== */

gulp.task('css', () =>
    gulp.src([paths.css.src + '*.less', paths.css.src + '**/*.less'])
        .pipe(plumber(function (error) {
            console.log('=> Error with LESS: '+ error.message);
            this.emit('end');
        }))
        .pipe(lesshint())
        .pipe(lesshint.reporter())
        .pipe($.less({plugins: [lessAutoPrefix]}))
        .pipe(concat(paths.css.file))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.css.dest))
);


/*
 Task: 'watch'
 ======================== */

gulp.task('watch', function() {
    console.log('... Watching CSS from: ' + paths.css.src);
    gulp.watch(paths.css.src + '*.less', ['css']);

    console.log('... Watching JS from: ' + paths.js.src);
    gulp.watch(paths.js.src + '*.js', ['js']);
});


/*
 Task: 'default'
 ======================== */

gulp.task('default', function() {
    runSequence(['css', 'js'], function() {
        console.log('All builds processed!');
    });
});
