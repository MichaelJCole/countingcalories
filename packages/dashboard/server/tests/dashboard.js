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
var apiUrlBase = 'http://localhost:9257/dashboard/api/1.0/';

/**
 * Test Suites
 */
describe('<Unit Test>', function() {

  describe('Dashboard API:', function() {

    beforeEach(function(done) {
      var user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });
      // make a mock user
      user.remove();
      user.save(function (err) {
        if (err) throw 'Cant create new user';
      });
    });

    afterEach(function(done) {
      user.remove();
      done();
    });

    describe('Goal API:', function() {
      it('should be able to create goal for user', function(done) {

        // Login as user
        // - should return auth cookie

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

      });
    });

    describe('Journal API:', function() {
      it('should be able to create goal for user', function(done) {

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

      });
    });
  });
});
