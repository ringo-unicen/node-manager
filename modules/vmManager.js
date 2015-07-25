/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/lodash/lodash.d.ts"/>
/// <reference path="../typings/bluebird/bluebird.d.ts" />



var bluebird = require('bluebird');
var Docker = require('dockerode-promise');
var _ = require('lodash');


var config = require('./config').dockerConfig;
console.log('Creating docker client with config', config);
var docker = new Docker(config);

var images = require('./images');

var doLog = function (message) {
    return function (result) {
        console.log(message, result);
        return result;
    };
};

/**
 * Creates a new container for the given service type.
 * @param {String} type The service type.
 */
exports.create = function (typeName) {
    var type = typeName.toLowerCase();
    console.log('Creating VM for type', type);
    var image = images[type];
    if (!image) {
        throw new Error ('Invalid image provided');
    }
    console.log('Actual image to use is', image);
    return docker.createContainer({Image: image})
        .then(_.property('$subject'))
        .then(doLog('Container created successfully')).then(_.property('id'));
};

/**
 * Runs the container identified by the given id.
 */
exports.run = function (id) {
    var container = docker.getContainer(id);
    return container.start().then(function () {
        return container.inspect();
    });
};

