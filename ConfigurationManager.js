//     ConfigurationManager.js
//     https://github.com/adamjakab/ConfigurationManager
//     (c) 2014-2019 Adam Jakab
//     ConfigurationManager may be freely distributed under the MIT license.
(function() {
    /**
     * Establish the root object, `window` in the browser, or `exports` on the server.
     */
    var root = this;

    //----------------------------------------------------------------------------------------------------------------//
    /**
     * @param {object} [defaultConfig]
     * @returns ConfigurationManager
     * @constructor
     */
    function ConfigurationManager(defaultConfig) {
        /**
         * This will store the configuration passed when initializing
         * It can be used to reset ConfigurationManager to the default values
         * @type {Object}
         * @private
         * @readonly
         */
        var _DEFAULT = {};

        /**
         * All configuration will be stored here
         * @type {Object}
         * @private
         */
        var _OPT = {};

        /**
         * @type {ConfigurationManager}
         */
        var self = this;

        /**
         * //auto setup with "defaultConfig" parameter and retain an unmutable copy in _DEFAULT
         */
        var init = function() {
            self.merge(defaultConfig);
            _DEFAULT = JSON.parse(JSON.stringify(_OPT));
        };

        /**
         * Check if value is one of: string, number, boolean, array, object
         * @param {*} value
         * @return {boolean}
         */
        var isAccaptableValue = function(value) {
            return ((_.isString(value)
                || _.isNumber(value)
                || _.isBoolean(value)
                || _.isArray(value)
                || _.isObject(value)
                || _.isNull(value)
                )
                && !_.isFunction(value)
            );
        };

        /**
         * Get a key value - if key is not found and no defaultValue set it will return null
         * @param {string|Array} key
         * @param {*} [defaultValue]
         * @returns {*}
         */
        this.get = function(key, defaultValue) {
            var keyElements = this.parseKey(key);
            var currentItem = _OPT;
            while(!_.isNull(currentItem) && keyElements.length != 0) {
                var currentKey = _.first(keyElements);
                keyElements = _.rest(keyElements);
                if(currentItem.hasOwnProperty(currentKey)) {
                    currentItem = currentItem[currentKey];
                } else {
                    currentItem = null;
                }
            }
            return(_.isNull(currentItem) && !_.isUndefined(defaultValue) ? defaultValue : currentItem);
        };

        /**
         * Set key to value (chainable)
         * Key can be:
         *       string - a dot separated path to element like "sync.cryptor.bits"
         *       Array  - like: ["sync", "cryptor", "bits"]
         *
         * @param {string|Array} key
         * @param {*} val
         * @returns ConfigurationManager
         */
        this.set = function(key, val) {
            if(!isAccaptableValue(val)) return this;
            var keyElements = this.parseKey(key);
            var currentItem = _OPT;
            var usedKeyElements = [];
            var currentKey, usedKeyChain, isLastElement;
            while(keyElements.length != 0) {
                currentKey = _.first(keyElements);
                usedKeyElements.push(currentKey);
                usedKeyChain = usedKeyElements.join(".");
                keyElements = _.rest(keyElements);
                isLastElement = (keyElements.length == 0);
                if(!isLastElement) {
                    if(!currentItem.hasOwnProperty(currentKey) || !_.isObject(currentItem[currentKey])) {
                        /* The below instruction will create an empty object on the currentKey if it is not an object
                         * This means that the previous value (if there was one) will be lost!
                         */
                        currentItem[currentKey] = {};
                    }
                    currentItem = this.get(usedKeyChain);
                } else {
                    currentItem[currentKey] = val;
                }
            }
            return(this);
        };

        /**
         * Checks if a key is defined
         * @param {string|Array} key
         * @returns {Boolean}
         */
        this.hasKey = function(key) {
            var answer = false;
            var keyElements = this.parseKey(key);
            var currentItem = _OPT;
            while(!_.isNull(currentItem) && keyElements.length != 0) {
                var currentKey = _.first(keyElements);
                keyElements = _.rest(keyElements);
                if(currentItem.hasOwnProperty(currentKey)) {
                    currentItem = currentItem[currentKey];
                    if(_.isEmpty(keyElements)) {
                        answer = true;
                    }
                } else {
                    currentItem = null;
                }
            }
            return(answer);
        };

        /**
         * Merges source object to object found at key
         * if value at key is not an object, merge will be ignored (you can use set() in that case)
         * @param {object} source
         * @param {string|Array} [key]
         */
        this.merge = function(source, key) {
            if(_.isObject(source)) {
                if(!key) {
                    _OPT = _.extend(_OPT, source);
                } else {
                    this.set(key, _.extend(this.get(key), source));
                }
            }
        };


        /**
         * Returns the entire options object
         * @returns {Object}
         */
        this.getAll = function() {
            return _OPT;
        };

        this.toString = function() {
            return(JSON.stringify(_OPT));
        };

        /**
         * Restores the original configuration(the one you passed when creating the instance)
         */
        this.restoreDefaults = function() {
            _OPT = JSON.parse(JSON.stringify(_DEFAULT));
        };

        //auto-initialize on construction
        init();
    }


    /**
     * function for splitting a dot-separated path (x.y.z) to an array of elements
     *
     * @param {string|Array} key
     * @returns []
     */
    ConfigurationManager.prototype.parseKey = function(key) {
        var answer;
        if(_.isString(key)) {
            key = key.toString();
            answer = key.split(".");
        } else if(_.isArray(key)) {
            answer = key;
        }
        //compact and remove all empty and numeric items from array
        answer = _.filter(answer, function(item) {
            return !_.isEmpty(item) && isNaN(item);
        });
        return(answer);
    };



    //----------------------------------------------------------------------------------------------------------------//
    /**
     * Export ConfigurationManager for **NodeJs** or add it as global if in browser
     */
    if (typeof exports !== 'undefined') {
        exports.ConfigurationManager = ConfigurationManager;
    } else {
        root.ConfigurationManager = ConfigurationManager;
    }

    /**
     * AMD registration - registers as anonymous module
     */
    if (typeof define === 'function' && define.amd) {
        define(['underscore'], function(_) {
            return ConfigurationManager;
        });
    }
}.call(this));
