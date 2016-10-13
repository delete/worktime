(function () {
    'use strict';
    angular.module('app')
        .controller('mainController', MainController);
    
    MainController.$inject = ['$timeout', '$mdSidenav', '$log', 'WorkTimeService'];
    
    function MainController($timeout, $mdSidenav, $log, WorkTimeService) {
        var vm = this;
        var workTimeService = WorkTimeService;
        vm.workTimes = workTimeService.all;
        
        init();

        function init() {
            vm.user = {
              name: 'Fellipe Pinheiro'
            }
            vm.addWorkMenu = buildToggler('right');
        }
        
        ////////////

        function buildToggler(navID) {
          return function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          }
        }
    }

})();