var gulp = require('gulp'),
    gls = require('gulp-live-server'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync').create(),
    reloader = browserSync.reload;
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

/*gulp.task('server', function() {
    var server = gls.static('build', 9090);
    server.start();
});*/
// ===========================清除工作任务 start ===================
gulp.task('clean', function() {
    gulp.src('build/**/*.html')
        .pipe(plugins.clean({force: true}));
});
gulp.task('clean-js', function() {
    gulp.src('build/js/**/*.js')
        .pipe(plugins.clean({force: true}));
});
gulp.task('clean-css', function() {
    gulp.src('build/css/**/*.css')
        .pipe(plugins.clean({force: true}));
});

gulp.task('copy', function() {
    gulp.src('src/view/**/*.html')
        .pipe(gulp.dest('build/'));
});
// ===========================清除工作任务 end ===================

// =========================== js 脚本处理任务 start =============
gulp.task('js', ['clean-js'], function() {
    gulp.src('src/js/*.js')
        .pipe(plugins.babel({presets:['es2015']}))
        .pipe(plugins.eslint())
        //.pipe(plugins.jshint.reporter('default'))
        //.pipe(plugins.uglify())
        //.pipe(plugins.concat('all.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(reloader({stream: true}));
});
// =========================== js 脚本处理任务 end =============

// =========================== scss 样式处理任务 start =========
gulp.task('sass',['clean-css'], function() {
    gulp.src('src/scss/*.scss')
        .pipe(plugins.sass())
        .pipe(gulp.dest('build/css/'))
        .pipe(reloader({stream: true}));
});
// =========================== scss 样式处理任务 end ==========

// =========================== 监控任务 start==================
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: './build/'
        }
    });
    gulp.watch('src/scss/**/*.scss',['sass']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/view/**/*.html', ['copy']);
    gulp.watch('build/*.html').on('change', reloader);
});
// =========================== 监控任务 end ==================
// 
// =========================== 默认任务 start=================
gulp.task('default', ['clean', 'copy', 'js', 'sass', 'watch']);