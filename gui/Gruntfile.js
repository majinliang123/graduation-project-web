'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            build: ['Gruntfile.js', 'gui.js', 'script/*/*.js']
        },
        "bower": {
            "install": {
                options: {
                    copy: false,
                    targetDir: 'component',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    prune: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-task');

    // Default task
    grunt.registerTask('default', ['jshint']);
};