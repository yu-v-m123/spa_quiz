const mix = require('laravel-mix');

mix.js('resources/js/home.js', 'public/js').vue()
  .js('resources/js/quiz.js', 'public/js').vue()
  .sass('resources/sass/app.scss', 'public/css', {
    implementation: require('dart-sass')
  });

mix.browserSync({
  files: [
    "public/**/*.*"
  ],
  proxy: "http://localhost:8000"
});