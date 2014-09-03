'use strict';

angular.module('mean.dashboard')

.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})

.controller('DashboardController', ['$scope', '$http', '$filter', 'Global', 'JournalEntry',
  function($scope, $http, $filter, Global, JournalEntry) {

    // Constants and globals
    $scope.ALERT_TIMEOUT = 3*1000;
    $scope.MIN_SPRITE_ENTRIES = 3;
    $scope.global = Global;
    $scope.package = {
      name: 'dashboard'
    };


    // Controller state

    // UI
    $scope.showDateFilter = false;
    $scope.showTimeFilter = false;
    $scope.timePickerOpen = false;
    $scope.datePickerOpen = false;

    $scope.alerts={ goal:[], add:[], filter:[], edit:[] };

    // Model
    // $scope.goal;  // loaded in Data Events below
    $scope.journalEntries = []; // loaded in Data Events below
    $scope.journalEntriesGrouped = [];
    $scope.journalEntry = { date: new Date(), description: '', calories: ''};

    $scope.filter = {
      date: {
        from: 'Jan 1',
        to: 'Jan 4',
        active: true
      },
      time: {
        from: '12p',
        to: '1p',
        active: true
      }
    };
    // Methods

    // Date picker open
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.datePickerOpen = true;
      $scope.timePickerOpen = false;
    };
    $scope.initDate = new Date();


    // Events / handlers

    // Open/close pickers
    $scope.$watch('timePickerOpen', function(newValue, oldValue) {
      if (newValue) {
        $scope.datePickerOpen = false;
      }
    });

    // Alerts
    $scope.addAlert = function(alertGroup, message, type) {
      // Add the alert to the group
      var alert = {msg: message, type: type};
      $scope.alerts[alertGroup].push(alert);

      // Set a timeout to close the oldest one
      _.delay(function() {
        $scope.alerts[alertGroup].splice(0, 1); // remove the oldest alert at from of array.
        $scope.$apply();
      },$scope.ALERT_TIMEOUT);
    };


    // Data Events - Goal
    
    // Load goal from API
    $http.get('dashboard/api/1.0/goal')
      .success(function(data, status, headers, config) {
        $scope.goal = data.goal;
        $scope.groupJournalEntries(); // readjust colors
      })
      .error(function(data, status, headers, config) {
        $scope.addAlert('goal', 'Server error', 'danger');
      });

    // Function to save goal when changes
    $scope.onGoalChange = function(goal) {
      $http.post('dashboard/api/1.0/goal', angular.toJson({goal: goal}))
        .success(function() {
          $scope.addAlert('goal', 'Yes!', 'success');
          $scope.groupJournalEntries(); // readjust colors
        })
        .error(function() {
          $scope.addAlert('goal', 'Server error', 'danger');
        });
    };


    // Data Events - Journal Entries

    $scope.journalEntries = [];
    JournalEntry.query(function(response) {
      $scope.journalEntries = response;
      // Transform them into a nested structure for UI
      $scope.groupJournalEntries();
    });

    // ng-submit for the add form
    $scope.addSaveRow = function() {
      JournalEntry.save($scope.journalEntry)
        .$promise.then(function(response) {
          console.log(response);
        });
      // FIXME: put this code in a http callback
      $scope.journalEntries.push($scope.journalEntry);
      $scope.groupJournalEntries();
      $scope.journalEntry = { date: new Date(), description: '', calories: ''};
      $scope.addAlert('add', 'Added', 'success');
    };

    // onaftersave for the edit forms
    $scope.editSaveRow = function($data) {
      // FIXME: put this code in a http callback
      // is model automatically updated?
      $scope.addAlert('edit', 'Saved', 'success');
      $scope.groupJournalEntries();
      console.log('editSaveRow');
      console.log($data);
    };

    // delete button on inline edit
    $scope.editDeleteRow = function($index) {
      // FIXME: put this code in a http callback
      // is model automatically updated?
      $scope.addAlert('edit', 'Deleted', 'success');
      $scope.journalEntries.splice($index, 1);
      $scope.groupJournalEntries();
    };


    // filters look into angular filter on the collection.  Not the constant!  Use filter called 'filter'
    // https://docs.angularjs.org/api/ng/filter/filter

 
    // Transform the linear array into a grouped array by days.    
    $scope.groupJournalEntries = function() {
      
      // Group into days
      var temp = _.groupBy($scope.journalEntries, function(item) {
        var date = new Date(item.date);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      });

      // Transform grouped array into nested objects
      $scope.journalEntriesGrouped = [];
      _.forEach(temp, function(item, key) {
        $scope.journalEntriesGrouped.push({
          date: new Date(key),
          entries: item,
          spriteShow: item.length >= $scope.MIN_SPRITE_ENTRIES,  // only show sprite if there is room
          formsOpen: 0,
          color: ''
        });
      });

      // Set display for each day red/green
      _.each($scope.journalEntriesGrouped, function(item) {

        // Calculate total for that day
        var total = _.reduce(item.entries, function(sum, item) {
          // ALSO split time
          item.dateText = $filter('date')(item.date, 'yyyy/MM/dd');
          item.timeText = $filter('date')(item.date, 'HH:mm');
          // calculate the total calories.
          return sum + (+item.calories);
        },0);
        item.total = total;

        // Set .color appropriately
        if ($scope.goal) {
          if (total > $scope.goal) {
            item.color = 'red';
          } else {
            item.color = 'green';
          }
        } else {
          item.color = '';
        }
      });

    };
  }
]);
