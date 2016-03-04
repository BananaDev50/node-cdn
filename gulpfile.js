// THE CORE ... gulp
const gulp = require('gulp'),
    file = require("file"),
    path = require("path");

// Plugins object
var plugins = require('gulp-load-plugins')();

// Variable to store available projects
var projects = [];

// Load all buildfiles
file.walkSync(path.join(__dirname, "projects"), function(folder, innerFolders, files) {
    for (var i = 0, len = files.length; i < len; i++) {
        if (files[i] == 'buildfile.js') {
            var name = folder.split(path.sep).slice(-1)[0];
            require(path.join(folder, files[i]))(gulp, plugins, {dest: {css: 'compiled/css/' + name, js: 'compiled/js/' + name}, src: folder});
            projects.push(name);
        }
    }
});

// Default Task
gulp.task('default', projects);
