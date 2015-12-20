var browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    open = require('gulp-open'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon')
    livereload = require('gulp-livereload');

var root_js_path = './public/assets/bower_components/';
var root_css_path = './public/assets/css/';

var vendor_js_path = [
        root_js_path + "jquery/dist/jquery.min.js",
        root_js_path + "react/react.min.js",
        root_js_path + "react/react-dom.min.js",
        root_js_path + "react/react-dom-server.min.js",
        root_js_path + "react/react-with-addons.min.js"
    ];

var vendor_css_path = [
        root_css_path + "vendorcss/" + "/bootstrap/bootstrap.min.css",
    ];

var app_css_path = [
    root_css_path + "app.css",
    root_css_path + "base.css"
]
gulp
    //Bundle all Third Party Plugins
    .task('vendor_js',function(){
        gulp.src(vendor_js_path)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/assets'));
    })

    //Bundle all Third Party CSS
    .task('vendor_css',function(){
        gulp.src(vendor_css_path)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/assets/css'))
    })
    //Bundle All App styles
    .task('app_css',function(){
        gulp.src(app_css_path)
            .pipe(concat('app.css'))
            .pipe(gulp.dest('dist/assets/css'))
    })
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
            .src('public/assets/css/images/*.*')
            .pipe(gulp.dest('dist/assets/css/images'));
        gulp
            .src('public/assets/css/fonts/*.*')
            .pipe(gulp.dest('dist/assets/css/fonts'));

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
    .task('default', ['vendor_css','vendor_js','app_css','browserify', 'copy', 'connect','open','watch'])
    .task('default2', ['browserify', 'copy']);

