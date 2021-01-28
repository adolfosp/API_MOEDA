module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss', '*.sass'],  
          dest: 'css',
          ext: '.css',
        }]
      }
    },

    watch: {
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          event: ['added', 'changed'],
        },
      }
    },
  });

  grunt.registerTask("default", ['watch']);

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");

};