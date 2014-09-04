'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Journal = mongoose.model('Journal'),
  Goal = mongoose.model('Goal'),
  _ = require('lodash');  // jshint ignore:line


// Goals

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
      if (obj === null) obj = {goal: ''}; // if obj isn't set, then set to empty
      res.json({ goal: obj.goal });
    } 
  );
};


// Journal Entries

/**
 * Get the user's list of journal entries
 */
exports.journalEntryList = function(req, res) {
  Journal.find({'user' : req.user._id })
    .sort('-date')
    .exec(function(err, journal) {
      if (err) {
        return res.json(500, {
          error: 'Cannot list the journalEntries'
        });
      }
      res.json(journal);
    }
  );
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
exports.journalEntryUpdate = function(req, res) {
  var data = {
    date: req.body.date,
    description: req.body.description,
    calories: req.body.calories
  };
  Journal.findOneAndUpdate( 
    {_id: req.params.journalId, 'user' : req.user._id }, 
    data, 
    { upsert: true}, 
    function(err, journal) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Cannot update the journalEntry'
        });
      }
      res.json(journal);
    }
  );
};


/**
 * Delete a journal entry
 */
exports.journalEntryDelete = function(req, res) {
  Journal.findOneAndRemove(
    {_id: req.params.journalId, 'user' : req.user._id }, 
    function(err, journal) {
      if (err) {
        return res.json(500, {
          error: 'Cannot delete the journalEntry'
        });
      }
      res.json(journal);
    }
  );
};
