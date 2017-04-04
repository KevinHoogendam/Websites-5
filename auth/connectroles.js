var ConnectRoles = require('connect-roles');
var express = require('express');

module.exports = function(){
	var roles = new ConnectRoles({
  		failureHandler: function (req, res, action) {
	    	// optional function to customise code that runs when 
	    	// user fails authorisation 
	    	var accept = req.headers.accept || '';
	    	res.status(403);
	    	// If we're requesting html, render view
	    	if (~accept.indexOf('html')) {
	      		res.render('access-denied', {action: action});
    		} else { // Else send plain text
	      		res.send('Access Denied - You don\'t have permission to: ' + action);
	    	}
	  	}
	});



		// Anonymous users can only see home page
	roles.use(function (req, action) {
		// isAuthenticated is Passport.js
  		if (!req.isAuthenticated()) return action === 'access home page';
	});

		// Admins can do everything
	roles.use(function (req) {
  		if(req.user.hasAnyRole('admin')){
  			return true;
  		};
	});

	roles.use('view races', function (req) {
  		if(req.user.local.username == req.params.id){
  			return true;
  		};
  		// Don't return false, this way we can get into the next checker.
	});

	roles.use('edit races', function (req) {
  		if(req.user.hasAnyRole('admin') && req.user.local.username == req.params.id){
  			return true;
  		};
  		// Don't return false, this way we can get into the next checker.
	});

	return roles;
};