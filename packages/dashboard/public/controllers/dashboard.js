'use strict';

angular.module('mean.dashboard', ['ui.bootstrap']).controller('DashboardController', ['$scope', 'Global', 'Dashboard',
  function($scope, Global, Dashboard) {
    $scope.global = Global;
    $scope.package = {
      name: 'dashboard'
    };

    $scope.showDateFilter = false;
    $scope.showTimeFilter = false;

    $scope.journalEntries = [
      { date: 'Jan 1st',
        calories: 3400,
        display: 'green',
        entries: [
          {
            date: 'Jan 1st',
            time: '12pm',
            description: 'Lunch ad Midas Touch',
            calories: '1200'
          },
          {
            date: 'Jan 1st',
            time: '1pm',
            description: 'Pastry at La Boulangerie',
            calories: '800'
          },
          {
            date: 'Jan 1st',
            time: '3pm',
            description: 'Horchata tea',
            calories: '200'
          },
          {
            date: 'Jan 1st',
            time: '5pm',
            description: 'Burger and salad at Charlito\'s',
            calories: '1200'
          }
        ]
      },
      { date: 'Jan 2nd',
        calories: 3400,
        display: 'red',
        entries: [
          {
            date: 'Jan 1st',
            time: '12pm',
            description: 'Lunch ad Midas Touch',
            calories: '1200'
          },
          {
            date: 'Jan 1st',
            time: '1pm',
            description: 'Pastry at La Boulangerie',
            calories: '800'
          },
          {
            date: 'Jan 1st',
            time: '3pm',
            description: 'Horchata tea',
            calories: '200'
          },
          {
            date: 'Jan 1st',
            time: '5pm',
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
