/*jslint node:true*/
/*global GLOBAL*/

'use strict';

function Path(path, filename, extension) {
    this.path = GLOBAL.config[path] + filename + (extension || '');
    return this;
}

module.exports = {
    img: function (filename) {
        return new Path('images', filename).path;
    },

    css: function (filename) {
        return new Path('styles', filename, '.css').path;
    },

    js: function (filename) {
        return new Path('scritps', filename, '.js').path;
    }
};