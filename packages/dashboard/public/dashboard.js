'use strict';

// create the module
angular.module('mean.dashboard', ['ui.bootstrap', 'xeditable']);

angular.module('mean.dashboard').run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
