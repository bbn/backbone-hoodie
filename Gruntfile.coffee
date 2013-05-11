module.exports = (grunt) ->

  grunt.initConfig
  
    coffee:
      compile:
        files:
          "backbone-hoodie.js":  "backbone-hoodie.coffee"

    watch:
      coffee:
        files: ["backbone-hoodie.coffee"]
        tasks: ['coffee:compile']


  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"