var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('images-opt', function () {
    gulp.src('img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'));
});


gulp.task('default', ['images-opt'], function(){});
