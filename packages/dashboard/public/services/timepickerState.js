'use strict';

angular.module('mean.dashboard')

/**
 * http://www.mytechtip.com/2014/03/angularjs-timepiker-popup-ui-bootstrap.html
 * Anularjs Module for pop up timepicker
 */
.factory('timepickerState', function() {
  var pickers = [];
  return {
    addPicker: function(picker) {
      pickers.push(picker);
    },
    closeAll: function() {
      for (var i=0; i<pickers.length; i++) {
        pickers[i].close();
      }
    }
  };
});