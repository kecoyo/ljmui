const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const ts = require('gulp-typescript');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const through = require('through2');
const vite = require('vite');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const tsconfig = require('./tsconfig.json');
const packageJson = require('./package.json');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
const pxMultiplePlugin = require('postcss-px-multiple')({ times: 2 });

function clean() {
  return del(['./es/**', './cjs/**', './umd/**']);
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
    .pipe(gulp.dest('./cjs'));
}

function copyAssets() {
  return gulp //
    .src('./src/assets/**/*')
    .pipe(gulp.dest('./es/assets'))
    .pipe(gulp.dest('./cjs/assets'));
}

function buildCJS() {
  return gulp
    .src(['./es/**/*.js'])
    .pipe(
      babel({
        'plugins': ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('./cjs/'));
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
  });
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
    .pipe(gulp.dest('./es/'));
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
    declaration: true,
    emitDeclarationOnly: true,
  });
  return gulp
    .src(['src/**/*.{ts,tsx}'], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .pipe(gulp.dest('./es/'))
    .pipe(gulp.dest('./cjs/'));
}

function getViteConfigForPackage({ env, formats, external }) {
  const name = packageJson.name;
  const isProd = env === 'production';
  return {
    root: process.cwd(),

    mode: env,

    logLevel: 'silent',

    define: { 'process.env.NODE_ENV': `"${env}"` },

    build: {
      cssTarget: 'chrome61',
      lib: {
        name: 'ljmui2',
        entry: './es/index.js',
        formats,
        fileName: format => `${name}.${format}${isProd ? '' : `.${env}`}.js`,
      },
      rollupOptions: {
        external,
        output: {
          dir: './bundle',
          // exports: 'named',
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      minify: isProd ? 'esbuild' : false,
    },
  };
}

async function buildBundles(cb) {
  const envs = ['development', 'production'];
  const configs = envs.map(env =>
    getViteConfigForPackage({
      env,
      formats: ['es', 'cjs', 'umd'],
      external: ['react', 'react-dom'],
    })
  );

  await Promise.all(configs.map(config => vite.build(config)));
  cb && cb();
}

function umdWebpack() {
  return gulp
    .src('./es/index.js')
    .pipe(
      webpackStream(
        {
          output: {
            filename: 'ljmui2.js',
            library: {
              type: 'umd',
              name: 'ljmui2',
            },
          },
          mode: 'production',
          optimization: {
            usedExports: true,
          },
          performance: {
            hints: false,
          },
          resolve: {
            extensions: ['.js', '.json'],
          },
          plugins: [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: false,
              reportFilename: 'report/report.html',
            }),
            new StatoscopeWebpackPlugin({
              saveReportTo: 'report/statoscope/report.html',
              saveStatsTo: 'report/statoscope/stats.json',
              open: false,
            }),
          ],
          module: {
            rules: [
              {
                test: /\.m?js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    'presets': [
                      [
                        '@babel/preset-env',
                        {
                          'loose': true,
                          'modules': false,
                          'targets': {
                            'chrome': '49',
                            'ios': '9',
                          },
                        },
                      ],
                      '@babel/preset-typescript',
                      '@babel/preset-react',
                    ],
                  },
                },
              },
              {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                type: 'asset/inline',
              },
              {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
            ],
          },
          externals: [
            {
              react: {
                commonjs: 'react',
                commonjs2: 'react',
                amd: 'react',
                root: 'React',
              },
              'react-dom': {
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
                amd: 'react-dom',
                root: 'ReactDOM',
              },
            },
          ],
        },
        webpack
      )
    )
    .pipe(gulp.dest('./umd/'));
}

function copyUmd() {
  return gulp.src(['./umd/ljmui2.js']).pipe(rename('ljmui2.compatible.umd.js')).pipe(gulp.dest('./bundle/'));
}

exports.default = gulp.series(
  clean, //
  buildES,
  buildCJS,
  gulp.parallel(buildDeclaration, buildStyle),
  copyAssets,
  buildBundles,
  umdWebpack,
  copyUmd
);
