var gulp = require('gulp');
var watch = require('gulp-watch');
var eslint = require('gulp-eslint');
var async = require('async');
var concat = require('gulp-concat');
const c = require('ansi-colors');
var path = require('path');

gulp.task('watch', function (cb) {
    // Endless stream mode
    return watch('app/**/*.js', function (file) {

        console.log(c.green(`Arquivo alterado: ${file.relative}`));

        return gulp.src(file.path)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.results(results => {
                if (results.errorCount === 0 && results.warningCount === 0) {
                    console.log(c.green(`Sem erros :)`));

                    let base = `${path.dirname(file.relative)}/**/*.js`;

                    gulp.src(base)
                        .pipe(concat('file.js'))
                        .pipe(gulp.dest("build"));

                } else {
                    console.log(c.yellow(`Avisos : ${results.warningCount}`));
                    console.log(c.red(`Erros  : ${results.errorCount}`));
                }
            }));
    });
});