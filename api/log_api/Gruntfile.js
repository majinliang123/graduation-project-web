'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc:'.jshintrc'
            },
            build: ['Gruntfile.js','app/api.js','app/*/*.js']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task
    grunt.registerTask('default', ['jshint']);
};