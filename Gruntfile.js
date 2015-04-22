module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                src: [ "Source/Utilities.js",
                        "Source/AudioTrack.js",
                        "Source/Video.js",
                        "Source/Memory.js", 
                        "Source/Event.js",
                        "Source/BlockEvent.js",
                        "Source/MouseEvent.js",
                        "Source/KeyboardEvent.js",
                        "Source/AssetManager.js",
                        "Source/Block.js",
                        "Source/ActorBlock.js",
                        "Source/FragmentBlock.js",
                        "Source/PlayerBlock.js",
                        "Source/SoundBlock.js",
                        "Source/StereoBlock.js",
                        "Source/MovieBlock.js",
                        "Source/CinemaBlock.js",
                        "Source/TextBlock.js",
                        "Source/ImageTextBlock.js",
                        "Source/ParagraphBlock.js",
                        "Source/ImageParagraphBlock.js",
                        "Source/VideoBlock.js",
                        "Source/DrawingBlock.js",
                        "Source/ImageDrawingBlock.js",
                        "Source/CanvasFrame.js",
                        "Source/CanvasManager.js",
                        "Source/SmokeTestBehaviors.js",
                        "Source/SmokeTestConstraints.js"],
                dest: 'Source/BlocksJS.js'
            }
        },

        uglify: {
            build: {
                src: 'Source/BlocksJS.js',
                dest: 'Source/BlocksJS.min.js'
            }
        },

        watch: {
            scripts: {
                files: ['Source/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        },

        copy: {
            build: {
                cwd: 'C:/xampp/htdocs/BlocksV2',
                src: '**/*',
                dest: 'C:/TestBuild',
                expand: true
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'watch', 'copy']);
    grunt.registerTask('buildcopy', ['copy:build']);

};

