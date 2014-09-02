'use strict';

angular.module('mean.dashboard')

/**
 * http://www.mytechtip.com/2014/03/angularjs-timepiker-popup-ui-bootstrap.html
 * Anularjs Module for pop up timepicker
 */

.directive('timepickerPop', ['$document', 'timepickerState', function($document, timepickerState) {
  return {
    restrict : 'E',
    transclude : false,
    scope : {
      inputTime : '=',
      showMeridian : '=',
      disabled : '=',
      isOpen : '='
    },
    controller : function($scope, $element) {
      $scope.isOpen = angular.isUndefined($scope.isOpen)? false : $scope.isOpen;
      
      //??
      $scope.disabledInt = angular.isUndefined($scope.disabled)? false : $scope.disabled;

      $scope.toggle = function() {
        if ($scope.isOpen) {
          $scope.close();
        } else {
          $scope.open();
        }
      };
    },
    link : function(scope, element, attrs) {
      var picker = {
          open : function () {
            timepickerState.closeAll();
            scope.isOpen = true;
          },
          close: function () {
            scope.isOpen = false;
          }
            
      };
      timepickerState.addPicker(picker);
      
      scope.open = picker.open;
      scope.close = picker.close;
      
      // Listen for change in disabled state
      scope.$watch('disabled', function(value) {
        scope.disabledInt = angular.isUndefined(scope.disabled)? false : scope.disabled;
      });
      
      // If empty, is error
      scope.$watch('inputTime', function(value) {
        if (!scope.inputTime) {
          element.addClass('has-error');
        } else {
          element.removeClass('has-error');
        }

      });

      // Click on popup don't close
      element.bind('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
      });

      // Click anywhere else.  Close popup
      $document.bind('click', function(event) {
        scope.$apply(function() {
          scope.isOpen = false;
        });
      });

    },
    template : 
      '<input type="text" class="form-control" ' +
      '  ng-model="inputTime" ' +
      '  ng-disabled="disabledInt" ' +
      '  time-format ' +
      '  show-meridian="showMeridian" ' +
      '  ng-focus="open()" /> ' +
      '<div class="input-group-btn" ' +
      '  ng-class="{open:isOpen}"> ' +
      '  <button type="button" ' +
      '    ng-disabled="disabledInt" class="btn btn-default" ' +
      '    ng-class="{\'btn-primary\':isOpen}" ' +
      '    data-toggle="dropdown" ' +
      '    ng-click="toggle()"> ' +
      '    <i class="glyphicon glyphicon-time"></i></button> ' +
      '    <div class="dropdown-menu pull-right"> ' +
      '      <timepicker ' +
      '        ng-model="inputTime" ' +
      '        show-meridian="showMeridian"></timepicker> ' +
      '    </div> ' +
      '</div>'
  };
}])

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

        var keyCode = [8,9,37,39,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110];
        if($.inArray(event.which,keyCode) === -1) {
          event.preventDefault();
        }
      });
    }
  };
});