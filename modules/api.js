var request = require('request-promise');
var _ = require('lodash');


var config = require('./config').apiConfig;
console.log('Using API config', config);

var urlTemplate = _.template('http://<%= config.host %>:<%= config.port %><%= config.uri %>');

exports.addVmInfo = function (id, vmInfo) {
    var nodePath = urlTemplate({config: _.merge(config, {uri: '/node/' + id + '/created'})});
    console.log('Posting node info to', nodePath);
    return request({
        method: 'post',
        url: nodePath,
        body: vmInfo,
        json: true
    });
};
