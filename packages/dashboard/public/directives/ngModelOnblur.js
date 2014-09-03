'use strict';

angular.module('mean.dashboard')

.directive('ngModelOnblur', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    priority: 1, // needed for angular 1.2.x
    link: function(scope, elm, attr, ngModelCtrl) {
      if (attr.type === 'radio' || attr.type === 'checkbox') return;

      elm.unbind('input').unbind('keydown').unbind('change');
      // save on exit control
      elm.bind('blur', function() {
        scope.$apply(function() {
            ngModelCtrl.$setViewValue(elm.val());
        });         
      });
      // save on press enter
      elm.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            ngModelCtrl.$setViewValue(elm.val());
          });
        }
      });
    }
  };
});