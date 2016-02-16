var concat = require('gulp-concat'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    minify = require('gulp-minify'),
    argv = require('yargs').argv,
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
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var replace = require('gulp-replace');


var util = require('util');
var exec = require('child_process').exec;
var root_js_path = './bower_components/';
var root_css_path = './public/assets/css/';
var PROD_CONSTANTS = {
    "NODE_SERVER" : "paperlessclub.org",
    "NODE_PORT"   : 3333,
    "SEAWEEDFS_ENDPOINT" : "paperlessclub.org:9333"
};
var DEV_CONSTANTS = {
    "NODE_SERVER" : "127.0.0.1",
    "NODE_PORT"   : 3333,
    "SEAWEEDFS_ENDPOINT" : "127.0.0.1:9333"
};
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
    .task('transform', function(){
        var start = Date.now();
        var opts = {
            entries: ['public/js/app.js'],
            cache: {},
            packageCache: {},
            transform : [reactify],
            debug : argv.prod ? false : true ,
            fullPaths : argv.prod ? false : true
        };
        var appBundler = browserify(opts);
        var bundler = function(){
            appBundler.bundle()
                .on('error', gutil.log)
                .pipe(source('app.js'))
                //.pipe(gulpif(!argv.prod,sourcemaps.init()))
                // Add transformation tasks to the pipeline here.
                .pipe(gulpif(argv.prod, (replace("#NODE_SERVER#", PROD_CONSTANTS.NODE_SERVER))))
                .pipe(gulpif(argv.prod, (replace("#NODE_PORT#"  , PROD_CONSTANTS.NODE_PORT  ))))
                .pipe(replace("#NODE_SERVER#", DEV_CONSTANTS.NODE_SERVER))
                .pipe(replace("#NODE_PORT#"  , DEV_CONSTANTS.NODE_PORT  ))
                .pipe(gulpif(argv.prod, streamify(uglify()))).on('error', gutil.log) // keep uglify() and this line together ,if not together,error debugging on minification will be harder....
                .pipe(rename({suffix: '.min'}))
                //.pipe(gulpif(!argv.prod,sourcemaps.write('./')))
                .pipe(gulp.dest('dist/js/'))
                .pipe(livereload())
                .pipe(notify(function () {
                    console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
                }));
        }
        if (!argv.prod) {
            b = watchify(appBundler);
            appBundler.on('update', bundler);
        }
        bundler();
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
        if(argv.prod){
            gulp.src('routes/constants/constant.js')
                .pipe(replace("#SEAWEEDFS_ENDPOINT#",PROD_CONSTANTS.SEAWEEDFS_ENDPOINT))
                .pipe(gulp.dest('routes/constants'));
        }else{
            gulp.src('routes/constants/constant.js')
                .pipe(replace("#SEEWEEDFS_ENDPOINT#",DEV_CONSTANTS.SEAWEEDFS_ENDPOINT))
                .pipe(gulp.dest('routes/constants'));

        }
        nodemon({ script: 'routes/node-app.js'})
        .on('restart', function () {
            console.log('restarted!')
        })
    })
    .task('server', ['vendor_css','vendor_js','transform','copy'], function() {
        var server = livereload.listen();
        connect.server({
            root: 'dist/',
            port: 7979
        });
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


