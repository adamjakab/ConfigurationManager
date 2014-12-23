/* Background tests bootstrap*/

//define test spec files to be loaded
var specs = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            specs.push(file);
        }
    }
}
//console.log("SPECS: " + JSON.stringify(specs));

requirejs.config({
    baseUrl: '/base',
    paths: {
        /* PATHS */
        /* MODULES */
        underscore: 'bower_components/underscore/underscore-min'
    },
    shim: {
    },
    deps: []
});


//bootstrap karma with spec files
require([], function() {
    require(specs, function() {
        window.__karma__.start();
    });
});
