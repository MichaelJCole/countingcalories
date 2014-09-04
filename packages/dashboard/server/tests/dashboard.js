'use strict';

/**
 * Module dependencies.
 */
var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Goal = mongoose.model('Goal');
var Journal = mongoose.model('Journal');

/**
 * Globals
 */
var user;
var serverURL = 'http://localhost:3001';
/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Dashboard API:', function() {
    beforeEach(function(done) {
      // Add the user to the database through mongoDB
      user = new User({
        name: 'Full name',
        email: 'test99@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        // After saved, we're done.
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
      it('should create goals for user', function(done) {

        // Login as user
        // - should return auth cookie
        request(serverURL)
        .post('/login')
        .send({email: user.email, password: user.password })
        // end handles the response
            .end(function(err, res) {
              if (err) {
                throw err;
              }
              // this is should.js syntax, very clear
              res.should.have.status(200);
        });

        // GET: <base>/goal
        // - should return ""

        // POST: <base>/goal  w/ goal = 2000
        // - should return json of goal

        // GET: <base>/goal
        // - should return 2000

        // POST: <base>/goal  w/ invalid goal -1
        // - should return error

        // GET: <base>/goal
        // - should return 2000

        // Logout
        // - ok

        // POST: <base>/goal  w/ 2000
        // - should return authentication error

        // GET: <base>/goal
        // - should return authentication error

        done();
      });
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
