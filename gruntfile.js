/*jslint node:true*/

module.exports = function (grunt) {
    'use strict';

    // config
    var SRC =  './presentation/src/',
        DIST = './presentation/dist/',

        config = grunt.file.readJSON(SRC + 'data/config.json'),

        SERVER_PORT = config.ports.server,
        WATCH_PORT = config.ports.watch;

    // setup
    grunt.initConfig({

        // build the templates
        assemble: {
            options: {
                data: SRC + 'data/*.json',
                layoutdir: SRC + 'views/templates/',
                layout: 'base.hbs'
            },

            files: {
                expand: true,
                cwd: SRC + 'views/',
                src: '*.hbs',
                dest: DIST
            }
        },

        // create server
        connect: {
            server: {
                options: {
                    port: SERVER_PORT,
                    base: DIST,
                    keepalive: false
                }
            }
        },

        // sass (uses compass)
        compass: {
            dev: {
                options: {
                    sassDir: SRC + 'sass',
                    cssDir: DIST + 'css',
                    outputStyle: 'compact',
                    environment: 'production',
                    require: [ 'normalize' ]
                    // specify: []
                }
            }
        },

        // clean DIST folder
        clean: [ DIST ],

        // watch (livereload)
        watch: {
            options: {
                livereload: WATCH_PORT
            },

            assemble: {
                files: [ 'gruntfile.js', SRC + 'views/**.hbs' ],
                tasks: [ 'clean', 'assemble' ]
            }
        }
    });

    // modules
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');

    //tasks
    grunt.registerTask('default', ['assemble', 'compass', 'connect', 'watch']);
};