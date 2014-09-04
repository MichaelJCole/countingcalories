'use strict';

var dashboard = require('../controllers/dashboard');

module.exports = function(Journal, app, auth) {

  app.route('/dashboard/api/1.0/goal')
    .get(auth.requiresLogin, dashboard.goalGet)
    .post(auth.requiresLogin, dashboard.goalSet);


  app.route('/dashboard/api/1.0/journalEntry')
    .post(auth.requiresLogin, dashboard.journalEntryCreate)
    .get(auth.requiresLogin, dashboard.journalEntryList);

  app.route('/dashboard/api/1.0/journalEntry/:journalId')
    .put(auth.requiresLogin, dashboard.journalEntryUpdate)
    .delete(auth.requiresLogin, dashboard.journalEntryDelete);
};
