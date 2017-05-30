'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            build: ['Gruntfile.js', 'gui.js', 'script/*/*.js']
        },
        bower: {
            'install': {
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
        },
        less: {
            compile: {
                files: {
                    'style/dist.css': 'less/*.less'
                }
            }
        },

        //css压缩插件
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'style/dist.min.css': [
                        'style/dist.css'
                    ]
                }
            }
        }

    });

    // Load the plugin that provides the 'uglify' task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task
    grunt.registerTask('default', ['jshint']);
};