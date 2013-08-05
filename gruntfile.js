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
                command: 'git pull',
                stdout: true
            },

            removeModules: {
                command: 'rm -rf node_modules'
            },

            installModules: {
                command: 'npm install',
                stdout: true
            }
        },

        // build the templates
        assemble: {
            options: {
                data: SRC + 'data/*.json',
                layoutdir: SRC + 'views/templates/',
                layout: 'base.hbs'
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

        // sass (uses compass)
        compass: {
            dev: {
                options: {
                    sassDir: SRC + 'sass',
                    cssDir: DIST + 'css',
                    outputStyle: 'expanded',
                    require: ['normalize']
                }
            },

            prod: {
                options: {
                    sassDir: SRC + 'sass',
                    cssDir: DIST + 'css',
                    outputStyle: 'compressed',
                    environment: 'production',
                    require: ['normalize']
                }
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
            all: [DIST],
            styles: [DIST + 'css/']
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

            prod: {
                expand: true,
                cwd: DIST,
                src: '*.html',
                dest: DIST
            }
        },

        // watch (livereload)
        watch: {
            options: {
                livereload: WATCH_PORT
            },

            assemble: {
                files: ['gruntfile.js', SRC + 'views/**/*.hbs'],
                tasks: ['clean', 'assemble']
            },

            compass: {
                files: [SRC + 'sass/*.scss'],
                tasks: ['compass']
            },

            scripts: {
                files: [SRC + 'js/**'],
                tasks: ['scripts']
            }
        }
    });

    // modules
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-prettify');

    //tasks
    grunt.registerTask('init', ['shell']);

    grunt.registerTask('scripts', ['jslint', 'copy']);
    grunt.registerTask('styles:dev', ['clean:styles', 'compass:dev']);
    grunt.registerTask('styles:prod', ['clean:styles', 'compass:prod']);

    grunt.registerTask('prod', ['clean:all', 'scripts', 'assemble:prod', 'styles:prod', 'prettify:prod']);
    grunt.registerTask('default', ['clean:all', 'scripts', 'assemble:dev', 'styles:dev', 'connect', 'watch']);
};