var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var historyApiFallback = require('connect-history-api-fallback');
var replace = require('gulp-replace');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'jquery'
];
var PROD_CONSTANTS = {
    "NODE_SERVER" : "52.36.241.238",
    "NODE_PORT"   : 3333,
    "SEAWEEDFS_ENDPOINT" : "127.0.0.1:9333"
};
var DEV_CONSTANTS = {
    "NODE_SERVER" : "127.0.0.1",
    "NODE_PORT"   : 3333,
    "SEAWEEDFS_ENDPOINT" : "127.0.0.1:9333"
};
var browserifyTask = function (options) {

    // Our app bundler
    var appBundler = browserify({
        entries: [options.src], // Only need initial file, browserify finds the rest
        transform: [[babelify, {presets: ['es2015','react']}]], // We want to convert JSX to normal javascript
        debug: options.development, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
    });

    // The rebundle process
    var rebundle = function () {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('app.js'))
            .pipe(gulpif(options.development,replace("#NODE_SERVER#", DEV_CONSTANTS.NODE_SERVER)))
            .pipe(gulpif(options.development,replace("#NODE_PORT#", DEV_CONSTANTS.NODE_PORT)))
            .pipe(gulpif(!options.development,replace("#NODE_SERVER#", PROD_CONSTANTS.NODE_SERVER)))
            .pipe(gulpif(!options.development,replace("#NODE_PORT#", PROD_CONSTANTS.NODE_PORT)))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(options.dest))
            .pipe(gulpif(options.development, livereload()))
            .pipe(notify(function () {
                console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
            }));
    };

    // Fire up Watchify when developing
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }

    rebundle();

    // We create a separate bundle for our dependencies as they
    // should not rebundle on file changes. This only happens when
    // we develop. When deploying the dependencies will be included
    // in the application bundle


        var vendorsBundler = browserify({
            debug: true,
            require: dependencies
        });

        // Run the vendor bundle
        var start = new Date();
        console.log('Building VENDORS bundle');
        vendorsBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function () {
                console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
            }));


}

var cssTask = function (options) {
    if (options.development) {
        var run = function () {
            console.log(arguments);
            var start = new Date();
            console.log('Building CSS bundle');
            gulp.src(options.src)
                .pipe(concat('app.css'))
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src(options.src)
            .pipe(concat('app.css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(cssmin())
            .pipe(gulp.dest(options.dest));
    }
}

// Starts our development workflow
var root_css_path = './public/assets/css/';
var css_path = [
    root_css_path + "vendorcss/" + "/bootstrap/bootstrap.min.css",
    root_css_path + "vendorcss/" + "/font-awesome/font-awesome.min.css",
    "./node_modules/materialize-tags/dist/css/materialize-tags.min.css",
    root_css_path + "registration.css",
    root_css_path + "base.css"
];


gulp.task('copy-static',function(){
    gulp
        .src('public/index.html')
        .pipe(gulp.dest('dist'));
    gulp
        .src('public/assets/css/images/*.*')
        .pipe(gulp.dest('dist/assets/css/images'));
    gulp
        .src('public/assets/css/vendorcss/fonts/*.*')
        .pipe(gulp.dest('dist/assets/fonts'));
});
var nodemon = require('gulp-nodemon');

function startNodeApp(options){
    
    nodemon({ script: 'routes/node-app.js'})
        .on('restart', function () {
            console.log('restarted!')
        })
}

gulp.task('default',['copy-static'], function () {
    livereload.listen();

    browserifyTask({
        development: true,
        src: 'public/js/app.js',
        dest: 'dist/js/'
    });


    cssTask({
        development: true,
        src: css_path,
        dest: 'dist/assets/css'
    });

    connect.server({
        root: 'dist',
        port: 7979,
        middleware: function(connect, opt){
            console.log("in history fallback!!!")
            return [historyApiFallback({
            })];
        }
    });
    startNodeApp({
        development : true
    })


});
gulp.task('deploy', ['copy-static'] , function () {

    browserifyTask({
        development: false,
        src: 'public/js/app.js',
        dest: 'dist/js/'
    });

    cssTask({
        development: false,
        src:css_path ,
        dest: 'dist/assets/css'
    });

    connect.server({
        root: 'dist',
        port: 7979,
        middleware: function(connect, opt){
            console.log("in history fallback!!!")
            return [historyApiFallback({
            })];
        }
    });

    startNodeApp({
        development : false
    })

});