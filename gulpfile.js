const gulp = require('gulp')
const less = require('gulp-less')
const path = require('path')
const postcss = require('gulp-postcss')
const babel = require('gulp-babel')
const replace = require('gulp-replace')
const ts = require('gulp-typescript')
const del = require('del')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const through = require('through2')
const vite = require('vite')
const rename = require('gulp-rename')
const autoprefixer = require('autoprefixer')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const tsconfig = require('./tsconfig.json')
const packageJson = require('./package.json')
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default
const pxMultiplePlugin = require('postcss-px-multiple')({ times: 2 })

function clean() {
  return del(['./es/**', './cjs/**'])
}

function buildStyle() {
  return gulp
    .src(['./src/**/*.less'], {
      base: './src/',
      ignore: ['**/demos/**/*', '**/tests/**/*', '*.patch.less'],
    })
    .pipe(
      less({
        paths: [path.join(__dirname, 'src')],
        relativeUrls: true,
      })
    )
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: 'iOS >= 10, Chrome >= 49',
        }),
      ])
    )
    .pipe(gulp.dest('./es'))
    .pipe(gulp.dest('./cjs'))
}

function copyAssets() {
  return gulp
    .src('./src/assets/**/*')
    .pipe(gulp.dest('./es/assets'))
    .pipe(gulp.dest('./cjs/assets'))
}

function buildCJS() {
  return gulp
    .src(['./es/**/*.js'])
    .pipe(
      babel({
        'plugins': ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('./cjs/'))
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
  })
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .pipe(
      babel({
        'plugins': ['./babel-transform-less-to-css'],
      })
    )
    .pipe(gulp.dest('./es/'))
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
    declaration: true,
    emitDeclarationOnly: true,
  })
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .pipe(gulp.dest('./es/'))
    .pipe(gulp.dest('./cjs/'))
}

exports.default = gulp.series(
  clean,
  buildES,
  buildCJS,
  gulp.parallel(buildDeclaration, buildStyle),
  copyAssets
)
