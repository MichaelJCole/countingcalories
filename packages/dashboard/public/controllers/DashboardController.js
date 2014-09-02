'use strict';

angular.module('mean.dashboard')

.controller('DashboardController', ['$scope', '$http', 'Global',
  function($scope, $http, Global) {


    // Constants and globals

    $scope.global = Global;
    $scope.package = {
      name: 'dashboard'
    };


    // Attributes

    $scope.showDateFilter = false;
    $scope.showTimeFilter = false;

    $scope.timePickerOpen = false;
    $scope.datePickerOpen = false;


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

    $scope.$watch('timePickerOpen', function(newValue, oldValue) {
      if (newValue) {
        $scope.datePickerOpen = false;
      }
    });


    // Data Events
    
    // Function to save goal when changes
    $scope.onGoalChange = function(goal) {
      $http.post('url', goal)
        .success(function() {
          alert('success');
        })
        .error(function() {
          alert('error');
        });
      console.log('Change to ' + goal);
    };

    // ng-submit for the add form
    // filters look into angular filter on the collection.  Not the constant!  Use filter called 'filter'
    // https://docs.angularjs.org/api/ng/filter/filter

    // onaftersave for the edit forms
    $scope.saveRow = function($data) {
      console.log($data);
    };


    // Mock data

    $scope.journalEntries = [
      { date: 'Jan 1st',
        calories: 3400,
        display: 'green',
        showDateSprite: false,
        entries: [
          {
            date: 'Jan 1st',
            time: '12pm',
            filterDate: true,
            filterTime: true,
            description: 'Lunch ad Midas Touch',
            calories: '1200'
          },
          {
            date: 'Jan 1st',
            time: '1pm',
            filterDate: true,
            filterTime: true,
            description: 'Pastry at La Boulangerie',
            calories: '800'
          },
          {
            date: 'Jan 1st',
            time: '3pm',
            filterDate: true,
            filterTime: true,
            description: 'Horchata tea',
            calories: '200'
          },
          {
            date: 'Jan 1st',
            time: '5pm',
            filterDate: true,
            filterTime: true,
            description: 'Burger and salad at Charlito\'s',
            calories: '1200'
          }
        ]
      },
      { date: 'Jan 2nd',
        calories: 3400,
        showDateSprite: false,
        display: 'red',
        entries: [
          {
            date: 'Jan 2nd',
            time: '12pm',
            filterDate: true,
            filterTime: true,
            description: 'Lunch ad Midas Touch',
            calories: '1200'
          },
          {
            date: 'Jan 2nd',
            time: '1pm',
            filterDate: true,
            filterTime: true,
            description: 'Pastry at La Boulangerie',
            calories: '800'
          },
          {
            date: 'Jan 2nd',
            time: '3pm',
            filterDate: true,
            filterTime: false,
            description: 'Horchata tea',
            calories: '200'
          },
          {
            date: 'Jan 2nd',
            time: '5pm',
            filterDate: false,
            filterTime: true,
            description: 'Burger and salad at Charlito\'s',
            calories: '1200'
          }
        ]
      },      { date: 'Jan 3rd',
        calories: 3400,
        showDateSprite: false,
        display: 'red',
        entries: [
          {
            date: 'Jan 3rd',
            time: '12pm',
            filterDate: true,
            filterTime: true,
            description: 'Lunch ad Midas Touch',
            calories: '1200'
          },
          {
            date: 'Jan 3rd',
            time: '1pm',
            filterDate: true,
            filterTime: true,
            description: 'Pastry at La Boulangerie',
            calories: '800'
          },
          {
            date: 'Jan 3rd',
            time: '3pm',
            filterDate: true,
            filterTime: false,
            description: 'Horchata tea',
            calories: '200'
          },
          {
            date: 'Jan 3rd',
            time: '5pm',
            filterDate: false,
            filterTime: true,
            description: 'Burger and salad at Charlito\'s',
            calories: '1200'
          }
        ]
      },
    ];

    $scope.filter = {
      dates: {
        from: 'Jan 1',
        to: 'Jan 4',
        active: true
      },
      times: {
        from: '12p',
        to: '1p',
        active: true
      }
    };

  }
]);
