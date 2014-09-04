'use strict';

angular.module('mean.dashboard')

.factory('JournalEntry', ['$resource',
  function($resource){
    return $resource('dashboard/api/1.0/journalEntry/:journalEntryId/', {
      journalEntryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
