// Generated on 2014-10-18 using generator-jade-rabbit 0.3.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        configureProxies: 'grunt-connect-proxy',
        injector: 'grunt-asset-injector',
        protractor: 'grunt-protractor-runner'
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
                files: ['<%= yeoman.app %>/{,**/}*.jade'],
                tasks: ['jade:server']
            },
            less: {
                files: ['<%= yeoman.app %>/{,**/}*.less'],
                tasks: ['injector:less', 'injector:css', 'less:server', 'autoprefixer']
            },
            js: {
                files: ['<%= yeoman.app %>/{,**/}*.js'],
                tasks: ['injector:scripts', 'concurrent:karma'],
                options: {
                    livereload: true
                }
            },
            bowerfile:  {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            e2etest: {
                files: ['e2e/*.js'],
                tasks: ['protractor:run']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= yeoman.app %>/{,**/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '.tmp/**/*.html',
                    '.tmp/{,**/}*.css',
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
            proxies: [
            ],
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ],
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            connect.static('.tmp'),
                            connect.static('app')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>',
                    livereload: false,
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            connect.static('dist')
                        ];
                    }
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
                reporter: require('jshint-stylish'),
                force: true
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/{,components/*/,services/,directives/}*.js',
                'test/spec/{,components/*/,services/,directives/}*.js'
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
                   '{.tmp,<%= yeoman.app %>}/{,components/*/,services/,directives/}*.js',
                   '!{.tmp,<%= yeoman.app %>}/{,**/}**/test/**/*.js',
                   '!{.tmp,<%= yeoman.app %>}/{,**/}**/*.spec.js',
                   '!{.tmp,<%= yeoman.app %>}/{,**/}**/*.mock.js']
                ]
            }
          },

          // Inject component less into app.less
          less: {
            options: {
              transform: function(filePath) {
                filePath = filePath.replace('/app/', '');
                return '@import \'' + filePath + '\';';
              },
              starttag: '// injector',
              endtag: '// endinjector'
            },
            files: {
              '<%= yeoman.app %>/index.less': [
                '<%= yeoman.app %>/{,components/*/,services/,directives/}*.less',
                '!<%= yeoman.app %>/index.less'
              ]
            }
          },

          // Inject component css into index.html
          css: {
            options: {
              transform: function(filePath) {
                filePath = filePath.replace('/app/', '');
                filePath = filePath.replace('/.tmp/', '');
                return 'link(rel=\'stylesheet\', href=\'' + filePath + '\')';
              },
              starttag: '// injector:css',
              endtag: '// endinjector'
            },
            files: {
              '<%= yeoman.app %>/index.jade': [
                '<%= yeoman.app %>/{,components/*/,services/,directives/}*.css'
              ]
            }
          },
          // Inject component js into test
          test: {
            options: {
              transform: function(filePath) {
                filePath = filePath.replace('/app/', 'app/');
                //filePath = filePath.replace('/.tmp/', '');
                return '\''+ filePath + '\',';
              },
              starttag: '// injector:js',
              endtag: '// endinjector'
            },
            files: {
              'karma.conf.js': [
                    '{.tmp,<%= yeoman.app %>}/index.js',
                   '{.tmp,<%= yeoman.app %>}/{,components/*/,services/,directives/}**.js'
                ]
            }
          }
        },
        bowerInstall: {
          target: {
            src: '<%= yeoman.app %>/index.jade',
            ignorePath: '../',
            exclude: ['/bootstrap/', 'es5-shim', 'modernizr', 'bootswatch'],
            dependencies: true,
            devDependencies: false,
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
          },
          test: {
            src: 'karma.conf.js',
            exclude: ['es5-shim', 'modernizr', 'bootswatch', 'angular-scenario'],
            dependencies: true,
            devDependencies: true,
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
          }
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
                        '<%= yeoman.dist %>/{,**/}*.js',
                        '<%= yeoman.dist %>/{,**/}*.css',
                        '<%= yeoman.dist %>/img/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%= yeoman.dist %>/{,**/}fonts/{,*/}*.*'
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
                        'assets/{,*/}*.*',
                        '{,*/}*.html',
                        '{*/}fonts/{,*/}*.*'
                    ]
                },  {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist/fonts/',
                    dest: '<%= yeoman.dist %>/fonts/',
                    src: '*.*'
                },
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/fontawesome/fonts',
                    dest: '<%= yeoman.dist %>/fonts/',
                    src: '*.*'
                },
                {
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'bower_components/es5-shim/*.js',
                        'bower_components/json3/lib/*.js'
                    ]
                }]
            },
            styles: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '.tmp/components/',
                    src: '{,*/}*.css'
                },
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '.tmp/',
                    src: 'bower_components/**/*.css'
                },
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist/fonts/',
                    dest: '.tmp/fonts/',
                    src: '*.*'
                },
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/fontawesome/fonts',
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
                '<%= yeoman.dist %>/{,components/*/,services/,directives/}*.js',
                '<%= yeoman.dist %>/{,components/*/,services/,directives/}*.css'
            ],
            uglify: true
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'less:server',
                'copy:styles'
            ],
            karma: [
                'jshint',
                'karma:unit',
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
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true
            }
        },
        protractor: {
            options: {
                keepAlive: false,
                configFile: "protractor.conf.js",
                //noColor: true,
                args: {
                    seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
                    chromeDriver: 'node_modules/protractor/selenium/chromedriver.exe'
                }
            },
            run: {}
        },
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'configureProxies', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'newer:jshint',
            'karma:unit',
            'clean:server',
            'injector',
            'bowerInstall',
            'concurrent:server',
            'jade:server',
            'configureProxies',
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
                'protractor:run'
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
        'karma:unit',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'cssmin',
        'uglify',
        'copy:dist',
        //'modernizr',
        //'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};