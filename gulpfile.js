var browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    open = require('gulp-open'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon')
    livereload = require('gulp-livereload');

gulp
    // performs magic
    .task('browserify', function(){
        gulp.src('public/js/app.js')
            .pipe(plumber())
            .pipe(
            browserify({
                transform: 'reactify',
                debug: !gulp.env.production
            })
        )
            .pipe(concat('app.js'))
            .pipe(plumber.stop())
            .pipe(gulp.dest('dist/js'))
            .pipe(livereload());
    })

    // moves source files to dist
    .task('copy', function(){
        gulp
            .src('public/index.html')
            .pipe(gulp.dest('dist'));

        gulp
            .src('public/assets/**/*.*')
            .pipe(gulp.dest('dist/assets'));

    })

    // local development server
    .task('connect', function(){
        connect.server({
            root: ['dist'],
            port: '8080',
            base: 'http://localhost',
            livereload: true
        });
    })

    // opens the application in chrome
    .task('open', function(){
        gulp
            .src('dist/index.html')
            .pipe(
            open({app: 'google chrome',uri: 'http://localhost:8080/'})
        );
    })
    // node api Server
    .task('node-app', function () {
        nodemon({ script: 'routes/node-app.js'})
        .on('restart', function () {
            console.log('restarted!')
        })
    })


    // watch for source changes
    .task('watch', function(){
        livereload.listen();
        gulp.watch('public/**/*.*', ['default2']);
    })


    // build the application
    .task('default', ['browserify', 'copy', 'connect','open','watch'])
    .task('default2', ['browserify', 'copy']);

