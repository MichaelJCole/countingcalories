'use strict';

/**
 * Module dependencies.
 */
var //mongoose = require('mongoose'),
  //Journal = mongoose.model('Journal'),
  //Goal = mongoose.model('Goal'),
  _ = require('lodash');

/**
 * Set the user's calorie goal
 */
exports.goalSet = function(req, res) {
  res.json({'goal':2345});
  /*
  var goal = new Goal(req.body);
  goal.user = req.user;
  goal.goal = req.calorieGoal;
  goal.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the goal'
      });
    }
    res.json(goal);
  });*/
};

/**
 * Get the user's calorie goal
 */
exports.goalGet = function(req, res) {
  var goal = req.goal;

  goal = _.extend(goal, req.body);

  goal.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the goal'
      });
    }
    res.json(goal);
  });
};

/*
exports.journalList
exports.journalCreate
exports.journalRead
exports.journalUpdate
exports.journalDelete
*/
/**
 * Find article by id
 */
/*
exports.article = function(req, res, next, id) {
  Article.load(id, function(err, article) {
    if (err) return next(err);
    if (!article) return next(new Error('Failed to load article ' + id));
    req.article = article;
    next();
  });
};

/**
 * Create an article
 */
/*
exports.create = function(req, res) {
  var article = new Article(req.body);
  article.user = req.user;

  article.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the article'
      });
    }
    res.json(article);

  });
};

/**
 * Update an article
 */
/*
exports.update = function(req, res) {
  var article = req.article;

  article = _.extend(article, req.body);

  article.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the article'
      });
    }
    res.json(article);

  });
};

/**
 * Delete an article
 */
/*
exports.destroy = function(req, res) {
  var article = req.article;

  article.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the article'
      });
    }
    res.json(article);

  });
};

/**
 * Show an article
 */
/*
exports.show = function(req, res) {
  res.json(req.article);
};

/**
 * List of Articles
 */
/*
exports.all = function(req, res) {
  Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the articles'
      });
    }
    res.json(articles);

  });
};
*/