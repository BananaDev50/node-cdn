module.exports = function (gulp, plugins, locations) {

    // Lint Task
    gulp.task('testproject:lint', () => {
        gulp.src(locations.src + '/src/js/*.js')
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'));
    });

    // Compile Our Sass
    gulp.task('testproject:sass', () => {
        gulp.src(locations.src + '/src/sass/styles.scss')
            .pipe(plugins.sass())
            .pipe(gulp.dest(locations.dest.css));
    });

    // Concatenate & Minify JS
    gulp.task('testproject:scripts', () => {
        gulp.src(locations.src + '/src/js/*.js')
            .pipe(plugins.concat('testproject.js'))
            .pipe(gulp.dest(locations.dest.js))
            .pipe(plugins.rename('testproject.min.js'))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(locations.dest.js));
    });

    // Watch Files For Changes
    gulp.task('testproject:watch', () => {
        gulp.watch(locations.project + '/src/js/*.js', ['testproject:lint', 'testproject:scripts']);
        gulp.watch(locations.project + '/src/sass/*.scss', ['testproject:sass']);
    });

    gulp.task('testproject', [
        'testproject:lint',
        'testproject:sass',
        'testproject:scripts',
        'testproject:watch'
    ]);
};
