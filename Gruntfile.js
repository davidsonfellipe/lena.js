module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
        '/*\n' +
        ' *  <%= pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n' +
        ' *\n' +
        ' *  Made by <%= pkg.author %>\n' +
        ' *  Under <%= pkg.licenses[0].type %> License\n' +
        ' */\n',
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>',
      },
      extras: {
        src: [
          'demo/assets/js/vendor/jquery/*.js',
          'demo/assets/js/vendor/jquery-drag-drop-plugin/*.js',
          'demo/assets/js/vendor/nvd3/*.js',
        ],
        dest: 'demo/assets/js/vendor/all.js',
      },
    },
  })

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat')

  // Default task(s).
  grunt.registerTask('default', ['concat'])
}
