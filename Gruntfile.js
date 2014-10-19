// Generated on 2014-10-18 using generator-jade-rabbit 0.3.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    
    require('jit-grunt')(grunt, {
        //shell: 'grunt-shell-spawn',
        //express: 'grunt-express-server',
        useminPrepare: 'grunt-usemin',
        //ngtemplates: 'grunt-angular-templates',
        //cdnify: 'grunt-google-cdn',
        //protractor: 'grunt-protractor-runner',
        injector: 'grunt-asset-injector'
    });

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            jade: {
                files: ['<%= yeoman.app %>{,*/}/*.jade', '<%= yeoman.app %>/**/{,*/}*.jade'],
                tasks: ['jade:server']
            },
            less: {
                files: ['<%= yeoman.app %>/{,**/}*.less'],
                tasks: ['less:server', 'autoprefixer']
            },
            js: {
                files: ['<%= yeoman.app %>/components/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= yeoman.app %>/components/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '.tmp/**/*.html',
                    '.tmp/components/{,*/}*.css',
                    '<%= yeoman.app %>/img/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '127.0.0.1'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp',
            jade: {
                files: [{
                    dot: false,
                    src: [
                        '<%= yeoman.app %>/index.html',
                        '<%= yeoman.app %>/**/*.html'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/components/{,*/}*.js',
                '!<%= yeoman.app %>/components/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        injector: {
          options: {

          },
          // Inject application script files into index.html (doesn't include bower)
          scripts: {
            options: {
              transform: function(filePath) {
                filePath = filePath.replace('/app/', '');
                filePath = filePath.replace('/.tmp/', '');
                return 'script(src=\'' + filePath + '\')';
              },
              starttag: '// injector:js',
              endtag: '// endinjector'
            },
            files: {
              '<%= yeoman.app %>/index.jade': [
                  ['{.tmp,<%= yeoman.app %>}/index.js',
                   '{.tmp,<%= yeoman.app %>}/components/**/*.js',
                   '!{.tmp,<%= yeoman.app %>}/{app,components}/**/test/**/*.js',
                   '!{.tmp,<%= yeoman.app %>}/{app,components}/**/*.spec.js',
                   '!{.tmp,<%= yeoman.app %>}/{app,components}/**/*.mock.js']
                ]
            }
          },

          // Inject component less into app.less
          less: {
            options: {
              transform: function(filePath) {
                filePath = filePath.replace('/app/', '');
                filePath = filePath.replace('/app/components/', '');
                return '@import \'' + filePath + '\';';
              },
              starttag: '// injector',
              endtag: '// endinjector'
            },
            files: {
              '<%= yeoman.app %>/index.less': [
                '<%= yeoman.app %>/components/**/*.less',
                '!<%= yeoman.app %>/index.less'
              ]
            }
          },

          // Inject component css into index.html
          css: {
            options: {
              transform: function(filePath) {
                filePath = filePath.replace('/client/', '');
                filePath = filePath.replace('/.tmp/', '');
                return 'link(rel=\'stylesheet\', href=\'' + filePath + '\')';
              },
              starttag: '// injector:css',
              endtag: '// endinjector'
            },
            files: {
              '<%= yeoman.app %>/index.jade': [
                '<%= yeoman.app %>/{app,components}/**/*.css'
              ]
            }
          }
        },
        bowerInstall: {
          target: {
            src: '<%= yeoman.app %>/index.jade',
            ignorePath: '../',
            exclude: ['/bootstrap/', '/es5-shim/', '/modernizr/', 'bootswatch'],
            fileTypes: {
              js: {
                block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                detect: {
                  js: /'.*\.js'/gi
                },
                replace: {
                  js: 'script(src=\'{{filePath}}\')'
                }
              }
            }
          }/*,
          test: {
            src: 'karma.conf.js',
            fileTypes: {
              js: {
                block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                detect: {
                  js: /'.*\.js'/gi
                },
                replace: {
                  js: '\'{{filePath}}\','
                }
              }
            }
          }*/
        },
        less: {
            options: {
                paths: ['<%= yeoman.app %>/bower_components'],
            },
            dist: {
                options: {
                    yuicompress: true,
                    report: 'gzip'
                },
                files: {
                    '.tmp/index.css': '<%= yeoman.app %>/index.less'
                }
            },
            server: {
                options: {
                    dumpLineNumbers: 'all'
                },
                files: {
                    '.tmp/index.css': '<%= yeoman.app %>/index.less'
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/components/',
                    src: '{,*/}*.css',
                    dest: '.tmp/components/'
                }]
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/{,components}/{,*/}*.js',
                        '<%= yeoman.dist %>/{,components}/{,*/}*.css',
                        '<%= yeoman.dist %>/img/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%= yeoman.dist %>/{,components}/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        ngAnnotate: {
            dist: {
                files: {
                    '.tmp/concat/scripts/main.js': ['.tmp/concat/scripts/main.js']
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            },
            html: ['.tmp/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= yeoman.dist %>/img'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/img'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp',
                    src: '{,**/}*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%= yeoman.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= yeoman.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%= yeoman.dist %>/scripts/scripts.js': [
        //                 '<%= yeoman.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'img/{,*/}*.webp',
                        '{,*/}*.html',
                        'components/fonts/{,*/}*.*'
                    ]
                },  {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist/fonts/',
                    dest: '<%= yeoman.dist %>/fonts/',
                    src: '*.*'
                }]
            },
            styles: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '.tmp/components/',
                    src: '{,*/}*.css'
                },  {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist/fonts/',
                    dest: '.tmp/fonts/',
                    src: '*.*'
                }]
            }
        },

        
        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= yeoman.dist %>/scripts/modernizr.js',
            files: [
                '<%= yeoman.dist %>/{,**/}*.js',
                '<%= yeoman.dist %>/{,**/}*.css',
                '!<%= yeoman.dist %>/{,*/}/vendor/*'
            ],
            uglify: true
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'less:server',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'less:dist',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },
        jade: {
            server: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '.tmp',
                    src: ['*.jade', '**/*.jade'],
                    ext: '.html'
                }]
            },
            dist: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.app %>',
                    src: ['*.jade', '**/.jade'],
                    ext: '.html'
                }]
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'newer:jshint',
            'clean:server',
            'injector',
            'bowerInstall',
            'concurrent:server',
            'jade:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer',
            ]);
        }

        grunt.task.run([
            'connect:test'
        ]);
    });

    grunt.registerTask('build', [
        'newer:jshint',
        'clean:dist',
        'jade',
        'useminPrepare',
        'clean:jade',
        'injector',
        'bowerInstall',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};