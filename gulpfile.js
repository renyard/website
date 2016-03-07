var gulp = require('gulp'),
    gutil = require('gulp-util'),
    merge = require('merge-stream'),
    del = require('del'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    gm = require('gulp-gm'),
    imagemin = require('gulp-imagemin'),
    cp = require('child_process');

gulp.task('clean', () => {
    return del('dist/');
});

gulp.task('jekyll', ['clean', 'js', 'css', 'fonts', 'images'], (done) => {
    var proc = cp.spawn('jekyll', ['build']);

    proc.stderr.setEncoding('utf-8');

    proc.on('close', done);

    proc.stderr.on('data', (data) => {
        gutil.log(gutil.colors.red(data));
    });
});

gulp.task('js', ['clean'], () => {
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('css', ['clean'], () => {
    var lib, scss;

    lib = gulp.src([
        // Bootstrap
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/font-awesome/css/font-awesome.css',
        'bower_components/5765395/solarized-dark.css'
    ])

    scss = gulp.src('css/**/*.scss')
    .pipe(sass().on('error', sass.logError));

    return merge(lib, scss)
    .pipe(cssmin())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('fonts', ['clean'], () => {
    gulp.src('bower_components/font-awesome/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('images', ['clean'], () => {
    var images,
        backgrounds;

    images = gulp.src(['images/**/*', '!images/background/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'));

    backgrounds = gulp.src('images/background/**/*')
    .pipe(gm((gmfile) => {
        return gmfile.resize(910);
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/background/'));

    return merge(images, backgrounds);
});

gulp.task('watch', ['clean', 'default'], () => {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });

    gulp.watch([
        '**/*.{js,css,md,html,scss}',
        '!lib/**/*',
        '!dist/**/*'
    ], ['jekyll'], browserSync.reload);
});

gulp.task('default', ['clean', 'jekyll']);
