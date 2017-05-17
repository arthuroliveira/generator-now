module.exports = function (grunt) {

    grunt.initConfig({
        folder:null, // Setting initial value
        filechanged: null, // Setting initial value
        pkg: grunt.file.readJSON('package.json'), //This allows us to refer to the values of properties within our package.json file. e.g. <%%= pkg.name %>
        test: "<%= folders_key %>",
        watch: {
            dist: {
                files: [
                  <% if (dist == "") { %>
                    <% for (f in folders_key) { %>'<%= folders_key[f] %>/**/*',
                    <% } %>
                  <% } %>
                  <% if (dist != "") { %>'<%= dist %>/**/*' <% } %>
                ],
                tasks: ['push:<%%= folder %>:<%%= filechanged %>']
            }
        }
    });


    grunt.loadNpmTasks('grunt-servicenow');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
