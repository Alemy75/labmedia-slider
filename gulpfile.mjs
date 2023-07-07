import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import webp from "gulp-webp";
import browserSync from "browser-sync";
import concat from "gulp-concat";
import cleanCSS from "gulp-clean-css";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

// Перенос HTML файлов
function moveHtml() {
    return gulp.src("public/**/*.html").pipe(gulp.dest("dist"));
}

// Перенос JS файла
function moveJs() {
    return gulp.src("src/**/*.js").pipe(gulp.dest("dist"));
}


// Компиляция SCSS в CSS
function compileSass() {
    return gulp
        .src("src/scss/index.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(concat("styles.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css"));
}

// Оптимизация изображений
function optimizeImages() {
    return gulp
        .src("src/images/**/*.{jpg,jpeg,png,gif,svg}")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
}

// Преобразование изображений в формат webp
function convertToWebp() {
    return gulp
        .src("src/images/**/*.{jpg,jpeg,png}")
        .pipe(webp())
        .pipe(gulp.dest("dist/images"));
}

// Задача для слежения за изменениями в файлах
function watchFiles() {
    gulp.watch("public/**/*", moveHtml);
    gulp.watch("src/**/*.js", moveJs);
    gulp.watch("src/scss/**/*.scss", compileSass);
    gulp.watch("src/images/**/*.{jpg,jpeg,png,gif,svg}", optimizeImages);
    gulp.watch("src/images/**/*.{jpg,jpeg,png}", convertToWebp);
    gulp.watch("dist/**/*").on("change", browserSync.reload);
}

// Запуск сервера BrowserSync
function browserSyncServe() {
    browserSync.init({
        server: {
            baseDir: "dist/",
            directory: true,
        },
        port: 3000,
    });
}

// Задача по умолчанию (запуск dev-режима)
gulp.task(
    "default",
    gulp.parallel(
        moveHtml,
        moveJs,
        compileSass,
        convertToWebp,
        watchFiles,
        browserSyncServe
    )
);

// const gulp = require("gulp");
// const sass = require("gulp-sass")(require("sass"));
// const autoprefixer = require("gulp-autoprefixer");
// const webp = require("gulp-webp");
// const browserSync = require("browser-sync").create();
// const concat = require("gulp-concat");
// const cleanCSS = require("gulp-clean-css");

// // Перенос HTML файлов
// function moveHtml() {
//   return gulp.src('public/**/*.html')
//     .pipe(gulp.dest('dist'));
// }

// // Компиляция SCSS в CSS
// function compileSass() {
//     return gulp
//         .src("src/scss/**/*.scss")
//         .pipe(sass().on("error", sass.logError))
//         .pipe(autoprefixer())
//         .pipe(concat("styles.css"))
//         .pipe(cleanCSS())
//         .pipe(gulp.dest("dist/css"));
// }

// // Преобразование изображений в формат webp
// function convertToWebp() {
//     return gulp
//         .src("src/images/**/*.{jpg,jpeg,png}")
//         .pipe(webp())
//         .pipe(gulp.dest("dist/images"));
// }

// // Задача для слежения за изменениями в файлах
// function watchFiles() {
//     gulp.watch("public/**/*", moveHtml);
//     gulp.watch("src/scss/**/*.scss", compileSass);
//     gulp.watch("src/images/**/*.{jpg,jpeg,png}", convertToWebp);
//     gulp.watch("dist/**/*").on("change", browserSync.reload);
// }

// // Запуск сервера BrowserSync
// function browserSyncServe() {
//     browserSync.init({
//         server: {
//             baseDir: "dist/",
//             directory: true,
//         },
//         port: 3000,
//     });
// }

// // Задача по умолчанию (запуск dev-режима)
// gulp.task(
//     "default",
//     gulp.parallel(moveHtml, compileSass, convertToWebp, watchFiles, browserSyncServe)
// );
