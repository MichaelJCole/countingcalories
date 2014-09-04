'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Goal Schema
 */
var GoalSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  goal: {
    type: Number,
    required: true,
  }
});

/**
 * Validations
 */
GoalSchema.path('goal').validate(function(goal) {
  // Date cannot be blank
  return goal < 0;
}, 'Goal cannot be negative');

/**
 * Statics
 */
/*GoalSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};
*/
mongoose.model('Goal', GoalSchema);


/**
 * Journal Schema
 */
var JournalSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  calories: {
    type: Number,
    required: true
  }
});

/**
 * Validations
 */
JournalSchema.path('date').validate(function(date) {
  // Date cannot be blank
  return !!date;
}, 'Date cannot be blank');
JournalSchema.path('description').validate(function(description) {
  // Cannot be blank
  return !!description;
}, 'Description cannot be blank');
JournalSchema.path('calories').validate(function(calories) {
  // Must be > 0
  return calories > 0;
}, 'Calories cannot be negative');

/**
 * Statics
 *//*
JournalSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};*/

mongoose.model('Journal', JournalSchema);
