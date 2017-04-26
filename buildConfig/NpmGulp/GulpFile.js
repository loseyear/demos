// Load plugins
var           gulp = require('gulp'),                      // 基础库
              sass = require('gulp-sass'),                 // SCSS
      autoprefixer = require('gulp-autoprefixer'),         // aotuprefixer
         minifycss = require('gulp-minify-css'),           // 压缩 css
            jshint = require('gulp-jshint'),               // JS 检查
            uglify = require('gulp-uglify'),               // JS 压缩混淆
          imagemin = require('gulp-imagemin'),             // 图片压缩
            rename = require('gulp-rename'),               // 重命名
            concat = require('gulp-concat'),               // 合并文件
             cache = require('gulp-cache'),                // 缓存
        livereload = require('gulp-livereload'),           // 自动刷新
              html = require('gulp-htmlmin'),              // html 压缩
//              haml = require('gulp-ruby-haml'),            // haml 模版
        sourcemaps = require('gulp-sourcemaps'),           // 生成 JS 信息文件
             babel = require('gulp-babel'),                // babel
               rev = require('gulp-rev'),                  // rev
      revCollector = require('gulp-rev-collector'),        // rev-collector
               del = require('del');                       // del

var      pathEntry = './entry',
           pathDev = './dev',
         pathBuild = './rev';


// html
gulp.task('html', function() {
    var options = {
                       removeComments: true,  //清除HTML注释
                   collapseWhitespace: true,  //压缩HTML
            collapseBooleanAttributes: true,  //省略布尔属性的值
                removeEmptyAttributes: true,  //删除所有空格作属性值
           removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
                             minifyJS: true,  //压缩页面JS
                            minifyCSS: true   //压缩页面CSS
    };
    gulp.src(['./dev/rev/*.json', pathEntry + '/*.html'])
        .pipe(html(options))
        //.pipe(revCollector())
        .pipe(gulp.dest(pathDev));
});
//gulp.task('rev', function() {
//gulp.src(['./rev/*.json', './application/**/header.php'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
//    .pipe(revCollector())                                   //- 执行文件内css名的替换
//    .pipe(gulp.dest('./application/'));                     //- 替换后的文件输出的目录
//});
// Styles
gulp.task('styles', function() {
    gulp.src(pathEntry + '/styles/*.scss')
        .pipe(concat('main.scss'))
        .pipe(sass({ style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        //.pipe(rev())
        .pipe(gulp.dest(pathDev + '/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(pathDev + '/styles'));
        //.pipe(rev.manifest())
        //.pipe(gulp.dest(pathDev + '/rev'));
});

// Scripts
gulp.task('scripts', function() {
    var config = {
        mangle: {except: ['define', 'require', 'module', 'exports']},
        compress: false
    };
    gulp.src(pathEntry + '/scripts/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(pathDev + '/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify(config))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(pathDev + '/scripts'));
});

// Images
gulp.task('images', function() {
    gulp.src(pathEntry + '/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(pathDev + '/images'));
});

// Clean
gulp.task('clean', function(cb) {
    del([pathDev + '/*.html', pathDev + '/styles', pathDev + '/scripts', pathDev + '/images'], cb());
});

// Default task
gulp.task('default',['clean'], function(cb) {
    gulp.start('styles', 'scripts', 'images', 'html');
});

// Watch
gulp.task('watch', function() {
    gulp.watch(pathEntry + '/styles/**/*.scss', ['styles']);
    gulp.watch(pathEntry + '/scripts/**/*.js', ['scripts']);
    gulp.watch(pathEntry + '/images/**/*', ['images']);
    gulp.watch(pathEntry + '/*.html', ['html']);

    livereload.listen();
    gulp.watch([pathDev + '/**']).on('change', livereload.changed);
});

