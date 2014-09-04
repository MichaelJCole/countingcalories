'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Journal = mongoose.model('Journal'),
  Goal = mongoose.model('Goal'),
  _ = require('lodash');  // jshint ignore:line


/**
 * Find Goal by user.id
 */
exports.goalSet = function(req, res, next) {
  Goal.findOneAndUpdate( 
    {'user' : req.user._id },
    { goal: req.body.goal }, 
    { upsert: true }, 
    function(err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err});       
      }
      res.json('ok');
    } 
  );
};


/**
 * Get the user's calorie goal
 */
exports.goalGet = function(req, res) {
  Goal.findOne( 
    {'user' : req.user._id },
    function(err, obj) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err});       
      }
      res.json({ goal: obj.goal });
    } 
  );
};

/**
 * Get the user's list of journal entries
 */
exports.journalEntryList = function(req, res) {
  Journal.find().sort('-date').exec(function(err, journal) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the journalEntries'
      });
    }
    res.json(journal);

  });
};

/**
 * Get the user's list of journal entries
 */
exports.journalEntryCreate = function(req, res) {
  var journal = new Journal(req.body);
  journal.user = req.user;

  journal.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the journalEntry',
        err: err
      });
    }
    res.json(journal);
  });
};

/**
 * Delete a journal entries
 */
exports.journalEntryDelete = function(req, res) {
  var _id = req.body._id;

  var journal = Journal.find(/* where _id and user */);

  journal.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the journalEntry'
      });
    }
    res.json(journal);
  });
};
/*
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