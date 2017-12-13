module.exports = function(grunt) {
    
      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: 'src/<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
          }
        },
        sass: {
            devel: {
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: [
                        'scss/*.scss'
                    ],
                    dest: 'public/css',
                    ext: '.css'
                }],
                options: {
                    sourceComments: true, // Change to true for debugging
                    outputStyle: 'expanded',
                    sourceMap: true,
                    includePaths: [
                        'node_modules/foundation-sites/scss'
                    ]
                }
            }
        }
      });
    
      // Load the plugin that provides the "uglify" task.
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-sass');
      // Default task(s).
      grunt.registerTask('default', ['sass:devel']);
    };