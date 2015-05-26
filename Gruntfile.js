'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    rbnetflix: {
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    watch: {
      js: {
        files: ['<%= rbnetflix.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
	  
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
	  
      styles: {
        files: ['<%= rbnetflix.app %>/less/{,*/}*.less'],
        tasks: ['less:development', 'newer:copy:styles', 'autoprefixer']
      },
	  
      gruntfile: {
        files: ['Gruntfile.js']
      },
	  
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= rbnetflix.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= rbnetflix.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
			middleware: function(connect, options, middlewares) {
            var modRewrite = require('connect-modrewrite');
            middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png$ /index.html [L]']));
            return middlewares;
          },
			  open: true,
			  base: [
				'.tmp',
				'<%= rbnetflix.app %>'
			  ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= rbnetflix.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= rbnetflix.dist %>'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= rbnetflix.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },
	
	less: {
	  development: {
		options: {
                compress: true,
                yuicompress: true,
                optimization: 2
        },
		files: {
          '<%= rbnetflix.app %>/styles/app.css': '<%= rbnetflix.app %>/less/app.less'
        }
	  }
	},
    
	clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= rbnetflix.dist %>/*',
            '!<%= rbnetflix.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    wiredep: {
      app: {
        src: ['<%= rbnetflix.app %>/index.html'],
        ignorePath: '<%= rbnetflix.app %>/'
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= rbnetflix.dist %>/scripts/{,*/}*.js',
            '<%= rbnetflix.dist %>/styles/{,*/}*.css',
            '<%= rbnetflix.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= rbnetflix.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    useminPrepare: {
      html: '<%= rbnetflix.app %>/index.html',
      options: {
        dest: '<%= rbnetflix.dist %>'
      }
    },

    usemin: {
      html: ['<%= rbnetflix.dist %>/{,*/}*.html'],
      css: ['<%= rbnetflix.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= rbnetflix.dist %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= rbnetflix.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= rbnetflix.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= rbnetflix.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= rbnetflix.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= rbnetflix.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= rbnetflix.dist %>'
        }]
      }
    },

    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    cdnify: {
      dist: {
        html: ['<%= rbnetflix.dist %>/*.html']
      }    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= rbnetflix.app %>',
          dest: '<%= rbnetflix.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'bower_components/**/*',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= rbnetflix.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= rbnetflix.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
		logLevel: 'INFO'
      }
    },
	
	protractor: {
		options: {
			configFile: 'protractor-e2e.js',
			keepAlive: true,
			noColor: false,
			args: {
			
			}
		},
		run: { },
	}
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
	  'less',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma',
	'protractor:run'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'less',
	'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
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