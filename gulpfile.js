// var gulp = require('gulp');
// var browserSync = require('browser-sync').create();
// var sass = require('gulp-sass');
// var sourcemaps = require('gulp-sourcemaps');

// gulp.task('sass', function(done) {
//     gulp.src("src/scss/*.scss")
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest("src/css"))
//         .pipe(browserSync.stream());

//     done();
// });

// gulp.task('serve', function(done) {

//     browserSync.init({
//         server: {
//             baseDir: "src/"
//         }
//     });

//     gulp.watch("src/sass/*.sass", gulp.series('sass'));
//     gulp.watch("src/*.html").on('change', () => {
//       browserSync.reload();
//       done();
//     });
  

//     done();
// });

// gulp.task('default', gulp.series('sass', 'serve'));


var gulp            = require('gulp');
var sass            = require('gulp-sass');
var browserSync      = require('browser-sync').create();
var autoprefixer     = require('gulp-autoprefixer');
var plumber          = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('browser-sync', function(done) { 
  browserSync.init({
    server: {
      baseDir: 'src/'
    },
  });
  
  browserSync.watch('src/*').on('change', browserSync.reload);
  
  done()
}); 

gulp.task('sass', function(done){
  gulp.src('src/scss/*.scss')
    .pipe(plumber({
      errorHandler : function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    .pipe(sass({outputStyle: 'compact'}))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
   .pipe(gulp.dest('src/css'))
   .pipe(browserSync.reload({stream: true}));
  
  done()
});

gulp.task('watch', gulp.series('sass', 'browser-sync', function(done) {
  gulp.watch('src/scss/*', gulp.series('sass'));
  
  done()
}));
