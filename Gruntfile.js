module.exports = function(grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    project: {
      app: "www",
      src: '<%= project.app %>/src',
      dist: '<%= project.app %>/dist',
      components: '<%= project.src %>/components',
      css: {
        main: '<%= project.src %>/scss/base.scss',
      },
      js: {
        base_libs: [
          '<%= project.src %>/js/libs/parse/*.js',
          '<%= project.src %>/js/libs/lodash/**/*.js',
          '<%= project.src %>/js/libs/angular/angular.js',
          '<%= project.src %>/js/libs/ionic/ionic.js'
        ],
        angular_libs: [
          '<%= project.src %>/js/libs/angular-*/**/*.js',
          '<%= project.src %>/js/libs/ng-*/**/*.js',
          '<%= project.src %>/js/libs/ionic/ionic-angular.js',
        ],
        main: [
          '<%= project.src %>/js/parse.js',
          '<%= project.src %>/js/theways.js',
          '<%= project.src %>/js/utils.js',
          '<%= project.src %>/js/services/**/*.js',
          '<%= project.src %>/js/controllers.js',
          '<%= project.src %>/js/components/**/*.js',
        ]
      }
    },
    sass: {
      dist: {
        files: {
          '<%= project.dist%>/style.css': '<%= project.css.main %>',
        }
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '<%= project.dist%>/libraries.js': '<%= project.js.base_libs %>',
          '<%= project.dist%>/angular-libraries.js': '<%= project.js.angular_libs %>',
          '<%= project.dist%>/scripts.js': '<%= project.js.main %>',
        },
      }
    },
    jshint: {
      // define the files to lint
      files: [
        'Gruntfile.js', 
        '<%= project.js.main %>',
      ],
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          console: true,
          module: true
        }
      }
    },
    fastWatch: {
      all: {
        dir: '.',
        ignoreSubDir: ['www/dist'],
        trigger: {
          server: {
            care: ["*.js","*.scss"],
            tasks: ['default']
          }
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-fast-watch');

  grunt.registerTask('default', ['sass', 'newer:uglify:dist', 'jshint']);

};
