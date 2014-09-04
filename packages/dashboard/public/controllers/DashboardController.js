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
    $scope.timePickerOpen = false;
    $scope.datePickerOpen = false;

    $scope.alerts={ goal:[], add:[], filter:[], edit:[] };

    // Model
    // $scope.goal;  // loaded in Data Events below
    $scope.journalEntries = []; // loaded in Data Events below
    $scope.journalEntriesGrouped = [];
    $scope.journalEntry = { date: new Date(), description: '', calories: ''};

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
      $scope.alerts[alertGroup].push({msg: message, type: type});

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
      JournalEntry.save($scope.journalEntry).$promise.then(
        function(response) {
          $scope.journalEntries.push(response);  // push response so our list is same as server
          $scope.groupJournalEntries();
          $scope.journalEntry = { date: new Date(), description: '', calories: ''};  // reset the form for a new entry
          $scope.addAlert('add', 'Added', 'success');
        },
        function(err) {
          $scope.addAlert('add', 'Error ' + err.statusText, 'danger');
          console.log(err);
        }
      );
    };

    // delete button on inline edit
    $scope.editDeleteRow = function(item) {
      JournalEntry.remove({journalEntryId: item._id}).$promise.then(
        function(response) {
          $scope.addAlert('edit', 'Deleted', 'success');
          // remove item from client list
          _.remove($scope.journalEntries, function(testItem) { return item._id == testItem._id; });
          $scope.groupJournalEntries();
        },
        function(err) {
          $scope.addAlert('edit', 'Error ' + err.statusText, 'danger');
          console.log(err);
        }
      );
    };

    // onaftersave for the edit forms
    $scope.editSaveRow = function(formData) {
      console.log(formData);
      var resourceItem = _.find($scope.journalEntries, function(entry) { return entry._id == formData._id; });
      resourceItem.date = new Date( formData.date +' '+ formData.time);
      resourceItem.description = formData.description;
      resourceItem.calories = formData.calories;

      resourceItem.$update(
        { journalEntryId: resourceItem._id },
        function(response, headers) {
          $scope.addAlert('edit', 'Saved', 'success');
          $scope.groupJournalEntries();
        },
        function(err) {
          $scope.addAlert('edit', 'Error ' + err.statusText, 'danger');
          console.log(err);
        }
      );
    };


    // Edit form validation

    $scope.editValidateDate = function(value) {
      if (value === '') return 'Cannot be empty';
      var test = new Date(value);
      if (isNaN(test.valueOf())) return 'Invalid date';  // Invalid dates are NaN
    };
    $scope.editValidateTime = function(value) {
      if (value === '') return 'Cannot be empty';
      var test = new Date('2014-01-01 ' + value);  // give date to test time.
      if (isNaN(test.valueOf())) return 'Invalid time';  // Invalid dates are NaN
    };
    $scope.editValidateCalories = function(value) {
      if (isNaN(value)) return 'Not a number';
      if (value < 0) return 'Must be positive';
    };



    // filters work on the original collection.  Not the grouped dates
    
    $scope.filter = {
      date: {
        from: null,
        to: null,
        active: false,
        show: false,
        activate: function() {
          $scope.filter.date.active = true;
          $scope.filter.date.show = false;
          $scope.groupJournalEntries();
        },
        deactivate: function() {
          $scope.filter.date.active = false;
          $scope.filter.date.show = false;
          $scope.groupJournalEntries();
        }
      },
      time: {
        from: null,
        to: null,
        active: false,
        show: false,
        activate: function() {
          $scope.filter.time.active = true;
          $scope.filter.time.show = false;
          $scope.groupJournalEntries();
        },
        deactivate: function() {
          $scope.filter.time.active = false;
          $scope.filter.time.show = false;
          $scope.groupJournalEntries();
        }
      }
    };

    $scope.filterDate = function (value, index) {
      if (!$scope.filter.date.active) {
        return true;
      }
      // value.date from server is a json string
      if (new Date(value.date) < new Date($scope.filter.date.from)) return false;
      var temp = moment($scope.filter.date.to).add(1, 'days');
      if (new Date(value.date) > temp) return false;
      return true;
    };

    $scope.filterTime = function (value, index) {
      if (!$scope.filter.time.active) {
        return true;
      }
      // value.date from server is a json string
      // test times alphabetically
      var time = moment(value.date).format('HH:mm');
      var from = moment('2014-01-01 ' + $scope.filter.time.from).format('HH:mm');
      var to = moment('2014-01-01 ' + $scope.filter.time.to).format('HH:mm');

      if (time < from) return false;
      if (time > to) return false;
      return true;
    };
 
    // Transform the linear array into a grouped array by days.    
    $scope.groupJournalEntries = function() {
      
      // sort most recent first
      var sorted = _.sortBy($scope.journalEntries, function(entry) { var d = new Date(entry.date); return -d.getTime(); });

      // Apply filters
      var filtered = $filter('filter')(sorted, $scope.filterDate);  // returns a function that is called with param
      filtered = $filter('filter')(filtered, $scope.filterTime);

      // Group into days
      var temp = _.groupBy(filtered, function(item) {
        var date = new Date(item.date);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      });

      // Transform grouped array into nested objects
      $scope.journalEntriesGrouped = [];
      _.forEach(temp, function(item, key) {
        $scope.journalEntriesGrouped.push({
          // Add these properties to the grouped date
          date: new Date(key),
          entries: item,  // these are the journalEntries
          spriteShow: item.length >= $scope.MIN_SPRITE_ENTRIES,  // only show sprite if there is room
          formsOpen: 0,
          color: ''
        });
      });

      // Set display for each day red/green on the grouped date
      _.each($scope.journalEntriesGrouped, function(item) {

        // Calculate total for that grouped date
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
