var express = require('express');
var router = express.Router();
var async = require('async');
var handleError;
var request = require('request');
var mongoose = require('mongoose');
var _ = require('underscore');
UserModel = mongoose.model('User');

function getUsers(req, res){

    var query = {};
	if(req.params.id){
		query._id = req.params.id;
	} 

    var result = UserModel.find(query);
    result.sort({ created: -1 });

    if(req.query.startindex) result.skip(parseInt(req.query.startindex)-1);
    if(req.query.stopindex) result.limit(parseInt(req.query.stopindex));

    result.exec(function (err, data) {

        if (err) { return handleError(req, res, 500, err); }

        if (!returnJSON(req)) {
            res.render('users/users', { users: data});
        }
        else {
            return res.json(data);
        }
    });
}

function returnJSON(req){
    if (req.get('Accept') == "application/json") return true;
    else return false;
}

module.exports = function (user){
    
//Routing
    router.route('/')
        .get(user.can('view users'), getUsers);

    router.route('/:id')
        .get(user.can('view users'), getUsers);

    router.get('*', function(req, res){
        res.send('Invalid URL');
    });

	return router;
};