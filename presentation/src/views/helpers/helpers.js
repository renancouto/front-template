/*jslint node:true*/

'use strict';

var config = require('../../data/config.json');

module.exports.path = function (type, filename) {
    return config.paths[type] + filename;
};