module.exports = function (app) {
    var vmManager = require('../modules/vmManager.js');
    var agent = require('../modules/agent.js');
    var request = require('request-promise');
    app.route('/vm')
        .post(function (req, res) {
           if (!req.body.id || !req.body.type) {
               res.status(400).json({msg: 'Missing parameters'});
               return;
           }
           console.log('Creating VM with params', req.body);
           vmManager.create(req.body.type).then(function (id) {
                console.log('Container created with id', id);
                res.status(201).location('/vm/' + id).end();
                vmManager.run(id).then(function (data) {
                    console.log('Successfully started container', id);
                    //Should be notifying the API now.
                }).catch(function (err) {
                    console.error('Error creating container with id ' + id, err);
                    console.log('Error starting container with id', id);
                });    
           }).catch(function (error) {
               res.status(500).json({msg: error.message});
           });    
        });
};
//Allows the offering of cost effective cloud solutions

