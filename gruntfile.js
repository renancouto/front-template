/*jslint node:true*/

module.exports = function (grunt) {
    'use strict';

    // config
    var SRC = './presentation/src/',
        DIST = './presentation/dist/',

        config = grunt.file.readJSON(SRC + 'data/config.json'),

        SERVER_PORT = config.ports.server,
        WATCH_PORT = config.ports.watch;

    // setup
    grunt.initConfig({

        // initializer
        shell: {
            git: {
                command: 'git pull'
            },

            removeModules: {
                command: 'rm -rf node_modules'
            },

            installModules: {
                command: 'npm install'
            }
        },

        // build the templates
        assemble: {
            options: {
                data: SRC + 'data/*.json',
                layoutdir: SRC + 'views/templates/',
                layout: 'base.hbs',
                helpers: SRC + 'views/helpers/*.js'
            },

            dev: {
                options: {
                    dev: true,
                    prod: false
                },

                expand: true,
                cwd: SRC + 'views/',
                src: '*.hbs',
                dest: DIST
            },

            prod: {
                options: {
                    dev: false,
                    prod: true
                },

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

        // stylesheets
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },

                files: [{
                    expand: true,
                    cwd: SRC + 'sass',
                    src: '*.scss',
                    dest: DIST + 'css',
                    ext: '.css'
                }]
            },

            prod: {
                options: {
                    outputStyle: 'compressed'
                },

                files: [{
                    expand: true,
                    cwd: SRC + 'sass',
                    src: '*.scss',
                    dest: DIST + 'css',
                    ext: '.css'
                }]
            }
        },

        // lint js files
        jslint: {
            client: {
                src: [SRC + 'js/**/*.js', '!' + SRC + 'js/vendor/**']
            }
        },

        // clean DIST folder
        clean: {
            all: DIST,
            styles: DIST + 'css/',
            scripts: DIST + 'js/',
            views: DIST + '*.html',
            images: DIST + 'img/'
        },

        // copy files from SRC to DIST
        copy: {
            js: {
                expand: true,
                cwd: SRC,
                src: ['js/**/*.js', '!js/vendor/**'],
                dest: DIST
            },

            jsVendor: {
                expand: true,
                cwd: SRC,
                src: ['js/vendor/jquery/jquery.js'],
                dest: DIST,
                rename: function (dest, src) {
                    return dest + 'js/vendor/' + src.split('/').slice(-1)[0];
                }
            }
        },

        // prettify html output
        prettify: {
            options: {
                preserve_newlines: false,
                max_preserve_newlines: 1,
                indent_size: 4
            },

            all: {
                expand: true,
                cwd: DIST,
                src: '*.html',
                dest: DIST
            }
        },

        // minify html output
        htmlmin: {
            options: {
                collapseWhitespace: true
            },

            all: {
                expand: true,
                cwd: DIST,
                src: ['**/*.html', '**/*.hbs'],
                dest: DIST
            }
        },

        // verify lowercase
        verifylowercase: {
            all: {
                src: [DIST + '**']
            }
        },

        // minify images
        imagemin: {
            dev: {
                options: {
                    optimizationLevel: 0
                },

                files: [{
                    expand: true,
                    cwd: SRC,
                    src: 'img/**/*.{gif,jpg,png}',
                    dest: DIST
                }]
            },

            prod: {
                options: {
                    optimizationLevel: 7    // may be a lot slow
                },

                files: [{
                    expand: true,
                    cwd: SRC,
                    src: 'img/**/*.{gif,jpg,png}',
                    dest: DIST
                }]
            }
        },

        // watch (livereload)
        watch: {
            options: {
                livereload: WATCH_PORT
            },

            assemble: {
                files: ['gruntfile.js', SRC + 'views/**/*.hbs', SRC + 'data/*.json'],
                tasks: ['views:dev']
            },

            sass: {
                files: [SRC + 'sass/*.scss'],
                tasks: ['styles:dev']
            },

            scripts: {
                files: [SRC + 'js/**'],
                tasks: ['scripts']
            }
        }
    });

    // modules
    grunt.loadNpmTasks('assemble');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //tasks
    grunt.registerTask('start', ['shell']);

    grunt.registerTask('views:dev', ['clean:views', 'assemble:dev', 'htmlmin:all']);
    grunt.registerTask('views:prod', ['clean:views', 'assemble:prod', 'htmlmin:all']);
    grunt.registerTask('scripts', ['clean:scripts', 'jslint', 'copy']);
    grunt.registerTask('styles:dev', ['clean:styles', 'sass:dev']);
    grunt.registerTask('styles:prod', ['clean:styles', 'sass:prod']);
    grunt.registerTask('images:dev', ['clean:images', 'imagemin:dev']);
    grunt.registerTask('images:prod', ['clean:images', 'imagemin:prod']);

    grunt.registerTask('prod', ['clean:all', 'scripts', 'styles:prod', 'views:prod', 'images:prod']);
    grunt.registerTask('dev', ['scripts', 'styles:dev', 'views:dev', 'images:dev', 'connect', 'watch']);
};