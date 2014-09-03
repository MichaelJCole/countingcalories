'use strict';

angular.module('mean.dashboard')

.directive('ngNumbersOnly', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    priority: 1, // needed for angular 1.2.x
    link: function(scope, elm, attr, ngModelCtrl) {
      elm.unbind('input').unbind('keydown').unbind('change');
      elm.bind('keydown keypress', function(event) {
        var keyCode = [8,9,13,37,39,48,49,50,51,52,53,54,55,56,57];
        if($.inArray(event.which,keyCode) === -1) {
          event.preventDefault();
        }
      });
    }
  };
});