'use strict';

/**
 * Module dependencies.
 */
var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var _ = require('lodash');// jshint ignore:line
var User = mongoose.model('User');
var Goal = mongoose.model('Goal');
var Journal = mongoose.model('Journal');

/**
 * Globals
 */
var serverURL = 'http://localhost:3000';
var user;
var sessionCookie;


/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Dashboard API:', function() {
    beforeEach(function(done) {
      // Add the user to the database through mongoDB
      user = new User({
        name: 'Full name',
        email: 'test@michaelcole.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        done();
      });
    });

    afterEach(function(done) {
      // Remove the added user.
      user.remove(function() {
        done();
      });
    });

    describe('Goal API:', function() {


      // Test server is up and we can get home page
      it('should create get the home page', function(done) {

        request(serverURL)
          .get('/')
          .end(function(err, res){
            _.delay(function(){
              done();
            },500);
          });
      });

      // Test the user can logout
      it('should logout the user', function(done) {
        request(serverURL)
          .get('/logout')
          // end handles the response
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            // this is should.js syntax, very clear
            res.should.have.status(302);
            done();
          });
      });

      // Login the user
      it('should login the user', function(done) {
        request(serverURL)
          .post('/login')
          .send({email: user.email, password: user.password })
          // end handles the response
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            sessionCookie = res.headers['set-cookie'];
            console.log(sessionCookie);
            // this is should.js syntax, very clear
            res.should.have.status(200);
            done();
          });
      });

      // GET: <base>/goal
      // - should return json of goal
      it('should get the goal', function(done) {
        request(serverURL)
          .get('/dashboard/api/1.0/goal')
          .set('Cookie', sessionCookie)
          // end handles the response
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            // this is should.js syntax, very clear
            res.should.have.status(200);
            done();
          });
      });

      // POST: <base>/goal
      // - should return 2000
      it('should set the goal to 2000', function(done) {
        request(serverURL)
          .post('/dashboard/api/1.0/goal')
          .set('Cookie', sessionCookie)
          .send({goal: 2000 })
          // end handles the response
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            // this is should.js syntax, very clear
            res.should.have.status(200);
            done();
          });
      });


      // GET: <base>/goal and check it's 2000
      // - should return json of goal
      it('should get the goal and check its 2000', function(done) {
        request(serverURL)
          .get('/dashboard/api/1.0/goal')
          .set('Cookie', sessionCookie)
          // end handles the response
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            // this is should.js syntax, very clear
            res.should.have.status(200);
            res.body.should.have.property('goal');
            res.body.goal.should.equal(2000);                    
            done();
          });
      });

      // POST: <base>/goal  w/ invalid goal -1
      // - should return error
      it('should fail if the goal is set incorrectly e.g. -1', function(done) {
        request(serverURL)
          .post('/dashboard/api/1.0/goal')
          .set('Cookie', sessionCookie)
          .send({goal: -1 })
          // end handles the response
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            // this is should.js syntax, very clear
            res.should.have.status(200);  // TODO: fixme!
            done();
          });
      });


      // GET: <base>/goal
      // - should return 2000

      // Logout
      // - ok

      // POST: <base>/goal  w/ 2000
      // - should return authentication error

      // GET: <base>/goal
      // - should return authentication error


    });

    describe('Journal API:', function() {
      it('should CRUD journalEntries for user', function(done) {

        // Login as user
        // - should return auth cookie

        // GET: <base>/journalEntry
        // - should return empty list

        // POST: <base>/journalEntry  w/ new journalEntry
        // - should return posted journal entry

        // GET: <base>/journalEntry
        // - should return list with prev entry

        // PUT: <base>/journalEntry/:id w/ valid data
        // - should return updated journal entry

        // GET: <base>/journalEntry
        // - should return updated journal entry

        // POST: <base>/journalEntry  w/ new journalEntry
        // - should return two entries

        // DELETE: <base>/journalEntry/:id 
        // - should return deleted journal entry

        // GET: <base>/journalEntry
        // - should return one journal entry

        // Logout
        // - ok

        // GET: <base>/journalEntry
        // POST: <base>/journalEntry  w/ new journalEntry
        // GET: <base>/journalEntry
        // PUT: <base>/journalEntry/:id w/ valid data
        // DELETE: <base>/journalEntry/:id 
        // - should all return authentication error

        done();
      });
    });
  });
});
