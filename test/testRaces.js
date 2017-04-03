var app = require('../index');
var Race = require('mongoose').model('Race');
var User = require('mongoose').model('User');
var request = require('supertest');
var expect = require('chai').expect;
var passportStub = require('passport-stub');

passportStub.install(app);

function makeGetRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

function makePostRequest(route, statusCode, done){
	request(app)
		.post(route)
		.set('Content-Type', 'application/json')
		.send({"Race":{"name":"postTest"}})
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

function makePutRequest(route, statusCode, done){
	request(app)
		.put(route)
		.send({"Race":{"name":"putTest"}})
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

function makeDeleteRequest(route, statusCode, done){
	request(app)
		.delete(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

describe('Test for race routing', function(){
	describe('Get /races', function(){

		it('should return 403 when not logged in', function(done){
			makeGetRequest('/races', 403, done);
		});
		it('should return 200 when logged in as admin', function(done){
			passportStub.login(new User({ roles: ['admin']}));
			makeGetRequest('/races', 200, done);
		});
		it('should return 200 when logged in as guest', function(done){
			passportStub.login(new User({ roles: ['guest']}));
			makeGetRequest('/races', 200, done);
		});
	});
	describe('Post /races', function(){

		it('should return 403 when not logged in', function(done){
			makePostRequest('/races', 403, done);
		});
		it('should return 200 when logged in as admin', function(done){
			passportStub.login(new User({ roles: ['admin']}));
			makePostRequest('/races', 200, done);
		});
		it('should return 403 when logged in as guest', function(done){
			passportStub.login(new User({ roles: ['guest']}));
			makePostRequest('/races', 403, done);
		});
	});
		describe('Put /races', function(){

		it('should return 403 when not logged in', function(done){
			makePutRequest('/races', 403, done);
		});
		it('should return 200 when logged in as admin', function(done){
			passportStub.login(new User({ roles: ['admin']}));
			makePutRequest('/races', 200, done);
		});
		it('should return 403 when logged in as guest', function(done){
			passportStub.login(new User({ roles: ['guest']}));
			makePutRequest('/races', 403, done);
		});
	});
		describe('Delete /races', function(){

		it('should return 403 when not logged in', function(done){
			makeDeleteRequest('/races', 403, done);
		});
		it('should return 200 when logged in as admin', function(done){
			passportStub.login(new User({ roles: ['admin']}));
			makeDeleteRequest('/races', 200, done);
		});
		it('should return 403 when logged in as guest', function(done){
			passportStub.login(new User({ roles: ['guest']}));
			makeDeleteRequest('/races', 403, done);
		});
	});
});