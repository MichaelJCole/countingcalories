'use strict';

angular.module('mean.dashboard')

.controller('DashboardController', ['$scope', '$http', 'Global',
  function($scope, $http, Global) {


    // Constants and globals
    $scope.ALERT_TIMEOUT = 3000;

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
    $scope.goal;  // loaded in Data Events below
    $scope.journalEntries = []; // loaded in Data Events below
    $scope.journalEntriesGrouped = [];
    $scope.journalEntry = { date: new Date(), description: "", calories: ""};

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
      var alert = {msg: message, type: type, close: true};
      $scope.alerts[alertGroup].push(alert);

      // Set a timeout to close the oldest one
      _.delay(function() {
        $scope.closeAlert(alertGroup, 0);
        $scope.$apply();
      },$scope.ALERT_TIMEOUT);
    };

    $scope.closeAlert = function(alertGroup, index) {
      $scope.alerts[alertGroup].splice(index, 1);
    };


    // Data Events
    
    // Load goal from API
    $http.get('dashboard/api/1.0/goal')
      .success(function(data, status, headers, config) {
        $scope.goal = data.goal;
      })
      .error(function(data, status, headers, config) {
        $scope.addAlert('goal', 'Server error', 'danger');
      });

    // Function to save goal when changes
    $scope.onGoalChange = function(goal) {
      $http.post('dashboard/api/1.0/goal', angular.toJson({goal: goal}))
        .success(function() {
          $scope.addAlert('goal', 'Yes!', 'success');
        })
        .error(function() {
          $scope.addAlert('goal', 'Server error', 'danger');
        });
    };



    // ng-submit for the add form
    $scope.addSaveRow = function() {
      // FIXME: put this code in a http callback
      $scope.journalEntries.push($scope.journalEntry);
      $scope.groupJournalEntries();
      $scope.journalEntry = { date: new Date(), description: "", calories: ""};
      $scope.addAlert('add', 'Added', 'success');
      //console.log($scope.journalEntries);
    };



    // onaftersave for the edit forms
    $scope.editSaveRow = function($data) {
      // FIXME: put this code in a http callback
      // is model automatically updated?
      console.log('editSaveRow');
      console.log($data);
      $scope.addAlert('edit', 'Saved', 'success');
    };

    // delete button on inline edit
    $scope.editDeleteRow = function($index) {
      $scope.journalEntries.splice($index, 1);
      $scope.addAlert('edit', 'Deleted', 'success');
    };

    // filters look into angular filter on the collection.  Not the constant!  Use filter called 'filter'
    // https://docs.angularjs.org/api/ng/filter/filter

    // Mockup data
    
    $scope.groupJournalEntries = function() {
      $scope.journalEntriesGrouped = _.groupBy($scope.journalEntries, function(item) {
        return new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate());
      });
    };

    $scope.journalEntries = [
      { date: new Date(), description: "First", calories: "1000"},
      { date: new Date(), description: "Second", calories: "100"},
      { date: new Date(), description: "Third", calories: "1000"},
      { date: new Date(), description: "First", calories: "100"},
      { date: new Date(), description: "Second", calories: "1000"},
      { date: new Date(), description: "Third", calories: "100"},
      { date: new Date(), description: "First", calories: "1000"}
    ];

    $scope.groupJournalEntries();

  }
]);
