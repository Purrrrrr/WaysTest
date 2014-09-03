module.exports = function(grunt) {
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
          '<%= project.src %>/js/libs/angular/angular.js'
        ],
        angular_libs: [
          '<%= project.src %>/js/libs/angular-*/**/*.js',
        ],
        main: [
          '<%= project.src %>/js/parse.js',
          '<%= project.src %>/js/theways.js',
          '<%= project.src %>/js/components/**/*.js',
          '<%= project.src %>/js/*.js'
        ]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compact',
          // sourcemap: 'auto',
          // compass: true
        },
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
      files: ['gruntfile.js', '<%= project.src%>/js/*.js'],
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          console: true,
          module: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', '<%= project.css %>'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'sass', 'newer:uglify:dist']);

}
