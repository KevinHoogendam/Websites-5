var app = require('../index');
var User = require('mongoose').model('User');
var mongoose = require('mongoose');
var request = require('supertest');
var should = require('should');
var expect = require('chai').expect;
var passportStub = require('passport-stub');
var bodyParser = require('body-parser');
var idNoLog = mongoose.Types.ObjectId()
var idGuest = mongoose.Types.ObjectId()
var idAdmin = mongoose.Types.ObjectId()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

function makeLoginRequest(route, statusCode, done){
	var data = {
		username: 'test',
		password: 'test'
	};

	request(app)
      .post(route)
      .send(data)
      .expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
		});
};

function makeSignupRequest(route, statusCode, done){
	var data = {
		username: 'test',
		password: 'test'
	};

	request(app)
      .post(route)
      .send(data)
      .expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
		});
};

function makeLogoutRequest(route, statusCode, done){
	request(app)
      .get(route)
      .expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }
			done(null, res);
		});
};

describe('Test for user routing', function(){
	describe('Get /users', function(){

		it('should return 403 when not logged in', function(done){
			makeGetRequest('/users', 403, done);
		});
		it('should return 200 when logged in as admin', function(done){
			passportStub.login(new User({ roles: ['admin']}));
			makeGetRequest('/users', 200, done);
		});
		it('should return 403 when logged in as guest', function(done){
			passportStub.login(new User({ roles: ['guest']}));
			makeGetRequest('/users', 403, done);
		});
	});
		describe('Local login functions', function(){

		it('should return 302 when signing up', function(done){
			makeSignupRequest('/signup', 302, done);
		});
		it('should return 302 when loging in', function(done){
			makeLoginRequest('/login', 302, done);
		});
		it('should return 302 when loging out', function(done){
			passportStub.login(new User({username: 'test', password: "test", roles: ['guest']}));
			makeLogoutRequest('/logout', 302, done);
		});
	});
});