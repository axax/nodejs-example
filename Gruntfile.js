// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    
    
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js']
    },
    
    
    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/app.min.js': 'src/**/*.js'
        }
      }
    },
    
    
    // compile less stylesheets to css -----------------------------------------
    less: {
      build: {
        files: {
          'dist/css/style.css': ['src/**/*.less','src/**/*.css']
        }
      }
    },
    
    
    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'dist/css/style.css'
        }
      }
    },
    
    
    // configure watch to auto update ----------------
    watch: {

      // for stylesheets, watch css and less files 
      // only run less and cssmin stylesheets: { 
      files: ['src//*.css', 'src//*.less'], 
      tasks: ['less', 'cssmin'],

      // for scripts, run jshint and uglify 
      scripts: { 
        files: 'src/**/*.js', tasks: ['jshint', 'uglify'] 
      } 
    },
    
    // grunt-express-server
    express: {
        options: {
          script: 'env/server.js',
          port: 9000
        },
        build: {}
    },
    
    

    // grunt-open will open your browser at the project's URL
    // https://www.npmjs.org/package/grunt-open
    open: {
        build : {
            path : 'http://localhost:9000',
            app: 'Firefox'
        }
    }



  });
  
  
  
  // ============= // CREATE TASKS ========== //
  grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin']); 
  
  // Creates the `server` task
  grunt.registerTask('server', ['express','open','watch']);
  

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.loadNpmTasks('grunt-open');
  
  
  grunt.loadNpmTasks('grunt-express-server');
  
  
  

};