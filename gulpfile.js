var gulp = require('gulp')
var nunjucksRender = require('gulp-nunjucks-render')
var watch = require('gulp-watch')
var batch = require('gulp-batch')
var less = require("gulp-less");
var buildBranch = require('gulp-build-branch');

gulp.task("fui-less", function() {
   gulp.src("node_modules/flat-ui/less/flat-ui.less")
       .pipe(less())
       .pipe(gulp.dest("node_modules/flat-ui/css"));
});

gulp.task('default', function(){

});

gulp.task('watch', function(){
	watch(['docs/pages/**/*.+(html)','docs/templates/*.html', 'docs/partials/*.html', 'docs/css/*.css'], batch(function(events, done){
		gulp.start('nunjucks', done);
	}));
});

// writing up the gulp nunjucks task
gulp.task('nunjucks', function() {

	// configuring the templates folder for nunjucks
	// nunjucksRender.nunjucks.configure(['docs/templates/', 'docs/partials/']);

	// get the pages files
	return gulp.src('docs/pages/**/*.+(html)')
	.pipe(nunjucksRender({
		path: ['docs/templates/', 'docs/partials/']
	}))
	.pipe(gulp.dest('docs'))
});

gulp.task('publish', ['nunjucks'], function() {
  return buildBranch({ folder: 'docs' });
});

gulp.on('err', function(e) {
	console.log(e.err.stack);
});