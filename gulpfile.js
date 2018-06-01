// Requis
const gulp = require('gulp');
// Include plugins
const stylus = require('gulp-stylus');
// Minify Css
const csso = require('gulp-csso');
// It s name
const rename = require("gulp-rename");
// Minify Js
const minify = require('gulp-minify');
// Image
const imagemin = require('gulp-imagemin');


var paths = {
    srcStyl:      './asset/starterKit-stylus/style.styl',
    allStyl:      './asset/starterKit-stylus/**/*.styl',
    allJs:        './asset/js/*.js',
    srcCss:       './dist/css/style.css',
    distCss:      './dist/css',
    srcImg:       './asset/images/**/*',
    distImg:       './dist/images/'
};

gulp.task('css', function () {
    return gulp.src( paths.srcStyl )
        .pipe(stylus())
        .pipe(gulp.dest( paths.distCss ));
});

gulp.task('minify', ['css'] , function () {
    return gulp.src( paths.srcCss )
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.distCss));
});

gulp.task('compress', function() {
    gulp.src('./asset/js/*.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('imagemini', () =>
    gulp.src( paths.srcImg )
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest( paths.distImg ))
);

// Tâche "build"
gulp.task('build', ['css', 'compress', 'imagemini'] );

// Tâche "prod" = Build + minifygul
gulp.task('prod', ['minify']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch( paths.allStyl, ['build']);
  gulp.watch( paths.allJs, ['build']);
});

// Tâche par défaut
gulp.task('default', ['build']);
