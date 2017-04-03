var ConnectRoles = require('connect-roles');

module.exports = function(){
	var roles = new ConnectRoles({
  		failureHandler: function (req, res, action) {
      		res.render('access-denied', {action: action});
	  	}
	});

	// Admins can do everything
	roles.use(function (req) {
  		if(req.user.hasAnyRole('admin')){
  			return true;
  		};
	});

	roles.use('view races', function (req) {
		// /authors/:id/books/
		// /authors/:id/books/:bookId
  		if(req.user.local.username == req.params.id){
  			return true;
  		};
  		// Don't return false, this way we can get into the next checker.
	});

	roles.use('edit races', function (req) {
		// /authors/:id/books/
		// /authors/:id/books/:bookId
  		if(req.user.hasAnyRole('admin') && req.user.local.username == req.params.id){
  			return true;
  		};
  		// Don't return false, this way we can get into the next checker.
	});

	return roles;
};