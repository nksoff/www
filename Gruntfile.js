module.exports = function(grunt) {
    var sourcePath = 'source',
        assetsPath = 'assets';
    var paths = {
        source: sourcePath,
        assets: assetsPath,

        sourceLess: sourcePath + '/less',
        sourceJS: sourcePath + '/js',
        sourceFonts: sourcePath + '/font',
        sourceImages: sourcePath + '/img',

        destCSS: assetsPath + '/css',
        destJS: assetsPath + '/js',
        destFonts: assetsPath + '/font',
        destImages: assetsPath + '/img'
    };

    var libs = [
        'grunt-contrib-copy',
        'grunt-contrib-cssmin',
        'grunt-contrib-less',
        'grunt-contrib-watch'
    ];

    for(var i = 0; i < libs.length; i++) {
        grunt.loadNpmTasks(libs[i]);
    }

    grunt.registerTask('build', [ 'copy', 'less' ]);
    grunt.registerTask('dev', [ 'build', 'watch' ]);
    grunt.registerTask('prod', [ 'build', 'cssmin' ]);

    var config = ({
        less: {
            default: {
                options: {
                    paths: [ paths.source, paths.sourceLess ]
                },
                files: [{
                    src: paths.sourceLess + '/main.less',
                    dest: paths.destCSS + '/main.css'
                }]
            }
        },
        copy: {
            default: {
                files: [{
                    expand: true,
                    cwd: paths.sourceFonts,
                    src: [ '*' ],
                    dest: paths.destFonts
                },
                {
                    expand: true,
                    cwd: paths.sourceImages,
                    src: [ '*' ],
                    dest: paths.destImages
                },
                {
                    expand: true,
                    cwd: paths.sourceJS,
                    src: [ '*' ],
                    dest: paths.destJS
                }
                ]
            }
        },
        cssmin: {
            default: {
                options: {
                    banner: '/* nksoff/www ' + (new Date()).getFullYear() + ' */'
                },
                files: [
                    {
                        src: paths.destCSS + '/main.css',
                        dest: paths.destCSS + '/main.css'
                    }
                ]
            }
        },
        watch: {
            less: {
                files: paths.sourceLess + '/*.less',
                tasks: [ 'less' ]
            },
            others: {
                files: [ paths.sourceFont + '/*', paths.sourceImages + '/*', paths.sourceJS + '/*.js' ],
                tasks: [ 'copy' ]
            }
        }
    });

    grunt.initConfig(config);
};
