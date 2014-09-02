'use strict';

var dashboard = require('../controllers/dashboard');

module.exports = function(Journal, app, auth) {

  app.route('/api/1.0/calorieGoal')
    .get(auth.requiresLogin, dashboard.goalSet)
    .post(auth.requiresLogin, dashboard.goalGet);

/*
  app.route('/api/1.0/journal/:journalId')
    .get(auth.requiresLogin, dashboard.journalList);

  app.route('/api/1.0/journal/:journalId')
    .post(auth.requiresLogin, dashboard.journalCreate)
    .get(auth.requiresLogin, dashboard.journalRead)
    .put(auth.requiresLogin, dashboard.journalUpdate)
    .delete(auth.requiresLogin, dashboard.journalDelete);

  // Finish with setting up the articleId param
  app.param('journalId', dashboard.journalEntry);
*/
};
