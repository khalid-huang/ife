var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var srcUrl = './task_37/src/' 
var buildUrl =  './task_37/build/'


var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del', 'gutil']
});

//the return means if deal with the task, return to the scream, afterwise the process will end.
gulp.task('jade', function() {
	return gulp.src( srcUrl + 'index.jade')
		.pipe($.jade({pretty: true}))
		.pipe(gulp.dest( buildUrl))
})

gulp.task('sass', ['jade'], function() {
	gulp.src( srcUrl + '*.css')
		.pipe(gulp.dest( buildUrl + 'css'))

	return gulp.src( srcUrl + '*.sass')
		.pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
		.pipe(gulp.dest( buildUrl + 'css'))
})

gulp.task('ls', ['sass'], function() {
	gulp.src(srcUrl + '*.js')
		.pipe(gulp.dest(buildUrl + 'js'));

	return gulp.src(srcUrl + '*.ls')
		.pipe($.livescript({bare:true}))
		.on('error', $.gutil.log)
		.pipe(gulp.dest(buildUrl + 'js'));
})

/*gulp.task('watch', function() {
	gulp.watch( srcUrl + 'sass/*.sass', ['sass']);
	gulp.watch( srcUrl + 'jade/*.jade', ['jade']);
	gulp.watch( srcUrl + 'livescript/*.ls', ['ls']);
})*/

gulp.task('clean', function(cb) {
	return $.del([ buildUrl + 'js', buildUrl + 'css', buildUrl + 'html'], cb);
})

gulp.task('build', ['jade', 'sass', 'ls']);

gulp.task('default', ['clean'], function () {
  gulp.start('build', 'watch');
});


//for the browser reload 

gulp.task('serve', ['ls'], function() {
    browserSync.init({
        server: {
            baseDir: buildUrl
        }
    });
});

gulp.task('serve:restart', ['ls'],function() {
	browserSync.reload();
})

gulp.watch([srcUrl + '*.sass', srcUrl + '*.jade', srcUrl + '*.ls'], ['serve:restart']);