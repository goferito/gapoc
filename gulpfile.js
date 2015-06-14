var gulp = require('gulp')
  , jshint = require('gulp-jshint')
  , stylus = require('gulp-stylus')
  , browserify = require('browserify')
  , reactify = require('reactify')
  , source = require('vinyl-source-stream')
  , nodemon = require('gulp-nodemon')
  , util = require('util')
  
  
var jshintOptions = {
  bitwise: true    // Avoid bitwise operators
, laxcomma: true   // Bad comma breaks
, laxbreak: true   // Bad line breaks
, nonbsp: true     //
, unused: true     // Declared but not used
, maxlen: 80       // Max length line
, undef: true      // Used but not declared
};

var jshintServerOptions = {
  node: true       // Add node globals
, asi: true        // Ignore semicolons
};

var jshintBrowserOptions = {
  browser: true    // Add browser globals
, jquery: true     // Add jQuery globals
, globals: {
    React: true
  , BootstrapModalMixin: true
  }
};

util._extend(jshintServerOptions, jshintOptions);
util._extend(jshintBrowserOptions, jshintOptions);
  
  

var paths = {
  server: [
    '*.js'
  , 'app/*.js'
  , 'app/config/**/*.js'
  , 'app/controllers/**/*.js'
  , 'app/helpers/**/*.js'
  , 'app/io/**/*.js'
  , 'app/models/**/*.js'
  ]
, publicjs: [
    'app/public/js/*.js'
  ]
, styl: [
    'app/public/css/*.styl'
  ]
, noChangeAssets: [
    'app/public/imc/*.*'
  , 'app/public/css/*.css'
  , 'app/public/fonts/*.*'
  , 'app/public/libs/*.*'
  ]
};


gulp.task('lintServer', function(){
  return 
    gulp.src(paths.server)
        .pipe(jshint(jshintServerOptions))
        .pipe(jshint.reporter('default'));
});

/**
 * Copy assets that need no processing
 */
gulp.task('copy', function(){
  return gulp.src(paths.noChangeAssets, {base: 'app/public/'})
             .pipe(gulp.dest('./build'));
});

gulp.task('stylus', function(){
  return gulp.src(paths.styl)
             .pipe(stylus())
             .pipe(gulp.dest('build/css'));
});

gulp.task('publicjs', function(){
 var b = browserify('./app/public/js/app.js')
           .transform(reactify)

 return b.bundle()
         .on('error', function(err){
           console.error(err.message);
           this.emit('end');
         })
         .pipe(source('app.js'))
         .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function(){
  gulp.watch(paths.server, ['lintServer'])
  gulp.watch(paths.styl, ['stylus'])
  gulp.watch(paths.noChangeAssets, ['copy'])
  gulp.watch(paths.publicjs, ['publicjs'])
});

gulp.task('nodemon', function(){
  return nodemon({
    script: 'index.js',
    env: {
      PORT: process.env.PORT || 3000
    },
    watch: [
      'index.js',
      'app/index.js',
      'app/controllers/',
      'app/io/',
      'app/models/',
      'app/libs/',
      'app/config/',
      'app/helpers/'
    ]
  });
});


/**
 * Default tasks, for a dev env
 */
gulp.task('default', ['copy',
                      'stylus',
                      'publicjs',
                      'lintServer',
                      'nodemon',
                      'watch']);

/**
 * Task executed to deploy
 */
gulp.task('deploy', ['copy', 'stylus', 'publicjs']);

