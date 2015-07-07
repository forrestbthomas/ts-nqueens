var gulp = require('gulp');
var ts = require('gulp-typescript');
 
gulp.task('compile', function () {
  var tsResult = gulp.src('nqueens.ts')
    .pipe(ts({
        out: 'nqueens.js'
      }));
  return tsResult.js
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['compile'], function() {
  gulp.watch('nqueens.ts', ['compile']);
});