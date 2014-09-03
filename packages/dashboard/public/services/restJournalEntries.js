'use strict';

angular.module('mean.dashboard')

.factory('JournalEntry', function($resource){
  return $resource('/dashboard/api/1.0/journalEntry', {});
});
