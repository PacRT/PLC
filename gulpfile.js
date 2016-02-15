var concat = require('gulp-concat'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    browserSync = require('browser-sync').create(),
    minify = require('gulp-minify');
var argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var assign = require('lodash.assign');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var util = require('util');
var exec = require('child_process').exec;
var root_js_path = './bower_components/';
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
    root_css_path + "vendorcss/" + "/font-awesome/font-awesome.min.css",
];

var app_css_path = [
    root_css_path + "registration.css",
    root_css_path + "base.css"
]
gulp
    //Bundle all Third Party Plugins
    .task('vendor_js',function(){
        gulp.src(vendor_js_path)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/assets'));
    })

    //Bundle all Third Party CSS
    .task('vendor_css',function(){
        gulp.src(vendor_css_path)
        .pipe(concat('vendor.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/assets/css/vendorcss'))
    })
    // performs magic
    .task('transform', function(){
        var b = browserify({
            entries: ['public/js/app.js'],
            cache: {},
            packageCache: {},
            debug : argv.prod ? true : false,
            transform : [reactify]
        });
        b.bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init())
            // Add transformation tasks to the pipeline here.
            .pipe(gulpif(argv.prod, uglify())).on('error', gutil.log) // keep uglify() and this line together ,if not together,error debugging on minification will be harder....
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/js/'));
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
            .src('public/assets/css/vendorcss/fonts/*.*')
            .pipe(gulp.dest('dist/assets/css/fonts'))
        gulp
            .src(app_css_path)
            .pipe(concat('app.css'))
            //s.pipe(gulpif(argv.prod, uglify())).on('error', gutil.log)
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dist/assets/css'));

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
        gulp.watch("public/**/*.js",[""])
            .on("change", browserSync.reload());
    })

    .task('reload',['transform', 'copy'],browserSync.reload())

    .task('server', ['vendor_css','vendor_js','transform','copy'], function() {
        browserSync.init({
            server: "./dist",
            port: 7979
        });
        gulp.watch("public/**/*.*",["reload"]);
    }).

    task("redis-server",function(){
        exec('redis-server',function (error, stdout, stderr) {
           console.log(stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    }).

    task("seaweedfs-server",function(){
        exec('./seaweedfs/weed server -master.port=9333 -volume.port=8080 -dir="./seaweedfs/data"',function (error, stdout, stderr) {
            sys.print('stdout: ' + stdout);
            sys.print('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    });


