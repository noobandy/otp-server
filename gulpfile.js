var gulp = require("gulp");
var blanket = require("gulp-blanket-mocha");

gulp.task('test', function () {
    gulp.src(['test/*.js'], { read: false })
        .pipe(blanket({
            instrument:['models/OtpGenerator.js','models/RandomKeyGenerator.js',],
            captureFile: 'coverage.html',
            reporter: 'html-cov'
        }));
});
