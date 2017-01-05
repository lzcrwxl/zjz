/*
 * @Author: iceStone
 * @Date:   2016-01-26 23:13:08
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-01-26 23:42:24
 */

'use strict';

// 载入Gulp模块
var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 注册样式编译任务
gulp.task('style', function() {
  gulp.src(['src/styles/index.less','src/styles/template.less','src/styles/CommonPC.less','src/styles/jquery.bigcolorpicker.less','src/styles/templateDel.less'])
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('D:/phpStudy/WWW/ruanrontrade/Public/Style/station/styles'))
    .pipe(reload({
      stream: true
    }));
});

// 注册脚本合并压缩任务
gulp.task('script', function() {
  gulp.src('src/scripts/*.js')
    //.pipe(uglify())
    .pipe(gulp.dest('D:/phpStudy/WWW/ruanrontrade/Public/Style/station/scripts'))
    .pipe(reload({
      stream: true
    }));
});
//图片压缩
gulp.task('image', function() {
  gulp.src('src/images/**')
    .pipe(gulp.dest('D:/phpStudy/WWW/ruanrontrade/Public/Style/station/images'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('json', function() {
    gulp.src('src/json/*.json')
        .pipe(gulp.dest('D:/phpStudy/WWW/ruanrontrade/Public/Style/station/json'))
        .pipe(reload({
            stream: true
        }));
});
//html压缩
gulp.task('html', function() {
  gulp.src('src/*.html')
    //.pipe(htmlmin({
    //  collapseWhitespace: true,
    //  collapseBooleanAttributes: true,
    //  removeAttributeQuotes: true,
    //  removeComments: true,
    //  removeEmptyAttributes: true,
    //  removeScriptTypeAttributes: true,
    //  removeStyleLinkTypeAttributes: true,
    //}))
    .pipe(gulp.dest('D:/phpStudy/WWW/ruanrontrade/Application/Home/View/Station'))
    .pipe(reload({
      stream: true
    }));
});
//模板压缩
gulp.task('template', function() {
    gulp.src('src/template/*.html')
        //.pipe(htmlmin({
        //    collapseWhitespace: false,
        //    collapseBooleanAttributes: false,
        //    removeAttributeQuotes: false,
        //    removeComments: false,
        //    removeEmptyAttributes: false,
        //    removeScriptTypeAttributes: false,
        //    removeStyleLinkTypeAttributes: false
        //}))
        .pipe(gulp.dest('D:/phpStudy/WWW/ruanrontrade/Public/Style/station/template'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('serve', ['style', 'script', 'image', 'html','template','json'], function() {
  browserSync({
    notify: false,
    port: 2015,
    server: {
      baseDir: ['D:/phpStudy/WWW/ruanrontrade/Application/Home/View/Station']
    }
  });


  gulp.watch('src/styles/*.less', ['style']);
  gulp.watch('src/scripts/*.js', ['script']);
  gulp.watch('src/images/**', ['image']);
  gulp.watch('src/json/*.json', ['json']);
  gulp.watch('src/template/*.html', ['template']);
  gulp.watch('src/*.html', ['html']);
});
