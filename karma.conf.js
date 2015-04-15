module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
            // bower:js
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/angular-ui-utils/ui-utils.js',
            'app/bower_components/AngularJS-Toaster/toaster.js',
            'app/bower_components/bootstrap/dist/js/bootstrap.js',
            'app/bower_components/lodash/dist/lodash.compat.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
            'app/bower_components/angular-ui-tree/dist/angular-ui-tree.js',
            'app/bower_components/angular-virtual-scroll/angular-virtual-scroll.min.js',
            'app/bower_components/angular-utils-pagination/dirPagination.js',
            'app/bower_components/angular-ui-select/dist/select.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/html5shiv/dist/html5shiv.js',
            'app/bower_components/respond/dest/respond.src.js',
            'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/chai/chai.js',
            // endbower
            // injector:js
            'app/index.js',
            'app/components/about/about.controller.js',
            'app/components/about/about.js',
            'app/components/contact/contact.controller.js',
            'app/components/contact/contact.js',
            'app/components/home/home.controller.js',
            'app/components/home/home.controller.spec.js',
            'app/components/home/home.js',
            // endinjector
        ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '{app/*.js,app/!(bower_components)/**/!(*spec|*mock).js}': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        dir : 'coverage/',
        reporters: [
            { type: 'html', subdir: '.' },
            { type: 'cobertura', subdir: '.' }
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
