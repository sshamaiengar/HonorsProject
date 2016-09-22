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
	watch(['app/pages/**/*.+(html)','app/templates/*.html', 'app/partials/*.html', 'app/css/*.css'], batch(function(events, done){
		gulp.start('nunjucks', done);
	}));
});

// writing up the gulp nunjucks task
gulp.task('nunjucks', function() {

	// configuring the templates folder for nunjucks
	// nunjucksRender.nunjucks.configure(['app/templates/', 'app/partials/']);

	// get the pages files
	return gulp.src('app/pages/**/*.+(html)')
	.pipe(nunjucksRender({
		path: ['app/templates/', 'app/partials/']
	}))
	.pipe(gulp.dest('app'))
});

gulp.task('publish', ['nunjucks'], function() {
  return buildBranch({ folder: 'app' });
});

gulp.on('err', function(e) {
	console.log(e.err.stack);
});