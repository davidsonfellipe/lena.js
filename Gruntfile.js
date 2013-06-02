module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
        banner: "/*\n" +
            " *  <%= pkg.name %> - v<%= pkg.version %>\n" +
            " *  <%= pkg.description %>\n" +
            " *  <%= pkg.homepage %>\n" +
            " *\n" +
            " *  Made by <%= pkg.author %>\n" +
            " *  Under <%= pkg.licenses[0].type %> License\n" +
            " */\n"
    },
    concat: {
      options: {
        banner: "<%= meta.banner %>",
        separator: ';'
      },
      dist: {
        src: ['lib/lena.js', 'lib/filters/*.js'],
        dest: 'dist/lena.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/lena.js',
        dest: 'dist/lena.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};