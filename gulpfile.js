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

gulp.task('default', ['nunjucks'], function(){

});

gulp.task('watch', function(){
	return gulp.watch(['docs/pages/*.html','docs/pages/probsolve/*.html','docs/pages/webdev/*.html','docs/pages/gamedev/*.html','docs/templates/*.html','docs/templates/probsolve/*.html', 'docs/templates/webdev/*.html', 'docs/templates/gamedev/*.html','docs/partials/*.html', 'docs/css/*.css'], batch(function(events, done){
		gulp.start('nunjucks');
		done();
	}));
});

// writing up the gulp nunjucks task
gulp.task('nunjucks', ['nunjucks-ps', 'nunjucks-wd', 'nunjucks-gd'], function() {

	// configuring the templates folder for nunjucks
	// nunjucksRender.nunjucks.configure(['docs/templates/', 'docs/partials/']);

	// get the pages files
	return gulp.src('docs/pages/*.+(html)')
	.pipe(nunjucksRender({
		path: ['docs/templates/', 'docs/partials/']
	}))
	.pipe(gulp.dest('docs'))
});

gulp.task('nunjucks-ps', function(){

	return gulp.src('docs/pages/probsolve/*.+(html)')
	.pipe(nunjucksRender({
		path: ['docs/templates/probsolve/', 'docs/partials/']
	}))
	.pipe(gulp.dest('docs/probsolve'))
});

gulp.task('nunjucks-wd', function(){
	return gulp.src('docs/pages/webdev/*.+(html)')
	.pipe(nunjucksRender({
		path: ['docs/templates/webdev/', 'docs/partials/']
	}))
	.pipe(gulp.dest('docs/webdev'))
});

gulp.task('nunjucks-gd', function(){
	return gulp.src('docs/pages/gamedev/*.+(html)')
	.pipe(nunjucksRender({
		path: ['docs/templates/gamedev/', 'docs/partials/']
	}))
	.pipe(gulp.dest('docs/gamedev'))
});

gulp.on('err', function(e) {
	console.log(e.err.stack);
});