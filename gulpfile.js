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
var replace = require('gulp-replace');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var PROD_CONSTANTS = {
    "NODE_SERVER" : "paperlessclub.com",
    "NODE_SERVER_IP" : "52.38.25.88",
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
    if(!options.development){
        appBundler.transform('uglifyify', { global: true })
    }
    // The rebundle process
    var rebundle = function () {
        var start = Date.now();
        console.log('Bundling PLC app');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('app.min.js'))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function () {
                console.log('PLC bundle built in ' + (Date.now() - start)/1000 + 's');
            }));
    };

    // Fire up Watchify when developing
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }
    return rebundle();
}

var cssTask = function (options) {
    if (options.development) {
        var run = function () {
            console.log(arguments);
            var start = new Date();
            console.log('Building CSS bundle');
            gulp.src(options.src)
                .pipe(concat('app.min.css'))
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('CSS bundle built in ' + (Date.now() - start)/1000 + 's');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src(options.src)
            .pipe(concat('app.min.css'))
            .pipe(cssmin())
            .pipe(gulp.dest(options.dest));
    }
}

// Starts our development workflow
var root_css_path = './public/assets/css/';
var css_path = [
    root_css_path + "vendorcss/" + "/bootstrap/bootstrap.min.css",
    root_css_path + "vendorcss/" + "/font-awesome/font-awesome.min.css",
    root_css_path + "vendorcss/" + "/_datepicker.css",
    root_css_path + "registration.css",
    root_css_path + "react-tags.css",
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

/**
 * Kick Off API server
 */
var nodemon = require('gulp-nodemon');

function startAPIServer(options){
    
    nodemon({ script: 'routes/secure-node-app.js'})
        .on('restart', function () {
            console.log('restarted!')
        })
}
/**
 * Kick Off UI server
 */
var    exec = require('child_process').exec;
function startPLCServer(options){
    if(options["development"]){
        exec('node plc-server.js', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
        return;
    }
    exec('node plc-server.js &', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
};

gulp.task('plc-api',function () {
    startAPIServer({
        development : true
    });
});

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

    startPLCServer({
        development : true
    });
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
    
    startPLCServer({
        development : false
    });
    startAPIServer({
        development : false
    });

});
