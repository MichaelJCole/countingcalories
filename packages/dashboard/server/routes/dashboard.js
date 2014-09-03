'use strict';

var dashboard = require('../controllers/dashboard');

module.exports = function(Journal, app, auth) {

  app.route('/dashboard/api/1.0/goal')
    .get(auth.requiresLogin, dashboard.goalGet)
    .post(auth.requiresLogin, dashboard.goalSet);


  app.route('/dashboard/api/1.0/journalEntry')
    .post(auth.requiresLogin, dashboard.journalEntryCreate)
    .get(auth.requiresLogin, dashboard.journalEntryList);
/*
  app.route('/dashboard/api/1.0/journalEntry/:journalId')
    .get(auth.requiresLogin, dashboard.journalRead)
    .put(auth.requiresLogin, dashboard.journalUpdate)
    .delete(auth.requiresLogin, dashboard.journalDelete);

  // Finish with setting up the articleId param
  app.param('journalId', dashboard.journalEntry);
*/
};
