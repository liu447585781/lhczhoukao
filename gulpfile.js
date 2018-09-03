var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var minjs = require('gulp-uglify');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');

//编译scss  压缩css
gulp.task('devcss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})

//监听devcss
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devcss'))
})

//压缩js
gulp.task('minjs', function() {
    return gulp.src(['./src/js/**/*.js', '!./src/js/libs/*.js'])
        .pipe(minjs())
        .pipe(gulp.dest('./src/minjs'))
})

//起服务
gulp.task('devserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080, //配置端口号
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname)
                if (pathname === '/favicon.ico') {
                    res.end('')
                    return
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
})

//开发环境
gulp.task('dev', gulp.series('devcss', 'devserver', 'minjs', 'watch'))