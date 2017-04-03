// var app = require('../index');
// var User = require('mongoose').model('User');
// var request = require('supertest');
// var passportStub = require('passport-stub');
// var testdata = require('./fillTestData');
// var expect = require('chai').expect;

// //passportStub.install(app);

// describe('Test for users routing', function(){
// 	describe('Get /Users', function(){
// 		beforeEach(function(done){
// 			testdata.fillTestdata(done);
// 		});

// 		it('should return 403 when not logged in', function(done){
// 			request(app)
// 				.get('/Users')
// 				.expect(403)
// 				.end(function(err, res){
// 					if(err) { return done(err); }
// 					done();
// 				})
// 		});
// 	});
// });