//     ConfigurationManager.js 1.0.0
//     https://github.com/adamjakab/ConfigurationManager
//     (c) 2014-2019 Adam Jakab
//     ConfigurationManager may be freely distributed under the MIT license.
(function() {
    /**
     * Establish the root object, `window` in the browser, or `exports` on the server.
     */
    var root = this;

    /**
     * @param {*} obj
     * @returns {ConfigurationManager}
     */
    var ConfigurationManager = function(obj) {
        if (obj instanceof ConfigurationManager) return obj;
        if (!(this instanceof ConfigurationManager)) return new ConfigurationManager(obj);
        this._wrapped = obj;
    };

    // Current version
    ConfigurationManager.VERSION = '0.0.1';

    /**
     * Export ConfigurationManager for **NodeJs** or add it as global if in browser
     */
    if (typeof exports !== 'undefined') {
        exports.ConfigurationManager = ConfigurationManager;
    } else {
        root.ConfigurationManager = ConfigurationManager;
    }


    //----------------------------------------------------------------------------------------------------------------//
    ConfigurationManager.test = function() {
        console.log("ConfigurationManager OK!");
    };




    //----------------------------------------------------------------------------------------------------------------//

    // Extracts the result from a wrapped and chained object.
    ConfigurationManager.prototype.value = function() {
        return this._wrapped;
    };

    // AMD registration - registers as anonymous module
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return ConfigurationManager;
        });
    }
}.call(this));
