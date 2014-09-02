module.exports = function(grunt) {
  grunt.initConfig({
    project: {
      app: "www",
      src: '<%= project.app %>/src',
      dist: '<%= project.app %>/dist',
      fileparts: '<%= project.app %>/dist/.fileparts',
      scss: [
      ],
      js: [
        '<%= project.src %>/js/libs/angular/angular.js',
        '<%= project.src %>/js/libs/lodash/**/*.js',
        '<%= project.src %>/js/libs/angular-*/**/*.js',
        '<%= project.src %>/js/parse.js',
        '<%= project.src %>/js/theways.js',
        '<%= project.src %>/js/*.js'
      ]
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          // compass: true
        },
        files: {
          '<%= project.dist%>/style.css': '<%= project.src %>/scss/base.scss',
        }
      }
    },
    /*
    uglify: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '<%= project.dist%>/scripts.js': '<%= project.js %>',
        },
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'src/** /*.js', 'test/** /*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
      } */
  });

  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['sass']);

}
