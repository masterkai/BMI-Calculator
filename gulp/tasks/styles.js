var gulp = require('gulp'),
postcss = require('gulp-postcss'),
//autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
cssnext = require('postcss-cssnext'),
hexrgba = require('postcss-hexrgba'),
colourFunctions = require('postcss-colour-functions');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, cssnext, nested, hexrgba, colourFunctions]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});