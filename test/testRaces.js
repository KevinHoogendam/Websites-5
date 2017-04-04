var app = require('../index');
var Race = require('mongoose').model('Race');
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

function makePostRequest(route, statusCode, id, done){
	var data = {
		id: String(id),
		name: 'postTest'
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

function makePutRequest(route, statusCode, id, done){
	var data = {
		name: 'putTest'
	};

	request(app)
      .put(route)
      .send(data)
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
			makePostRequest('/races', 403, idNoLog, done);
		});
		it('should return 201 when logged in as admin', function(done){
			passportStub.login(new User({ roles: ['admin']}));
			makePostRequest('/races', 201, idAdmin, done);
		});
		it('should return 403 when logged in as guest', function(done){
			passportStub.login(new User({ roles: ['guest']}));
			makePostRequest('/races', 403, idGuest, done);
		});
	});
		describe('Put /races', function(){

		it('should return 403 when not logged in', function(done){
			makePutRequest('/races/' + idNoLog, 403, idNoLog, done);
		});
		it('should return 201 when logged in as admin', function(done){
			passportStub.login(new User({ roles: ['admin']}));
			makePutRequest('/races/' + idAdmin, 201, idAdmin, done);
		});
		it('should return 403 when logged in as guest', function(done){
			passportStub.login(new User({ roles: ['guest']}));
			makePutRequest('/races/' + idGuest, 403, idGuest, done);
		});
	});
		describe('Delete /races', function(){

		it('should return 403 when not logged in', function(done){
			makeDeleteRequest('/races/' + idNoLog, 403, done);
		});
		it('should return 200 when logged in as admin', function(done){
			passportStub.login(new User({ roles: ['admin']}));
			makeDeleteRequest('/races/' + idAdmin, 200, done);
		});
		it('should return 403 when logged in as guest', function(done){
			passportStub.login(new User({ roles: ['guest']}));
			makeDeleteRequest('/races/' + idGuest, 403, done);
		});
	});
});