(function () {
    'use strict';
    angular.module('app')
        .controller('addWorkController', AddWorkController);

    AddWorkController.$inject = ['$timeout', '$mdSidenav', '$log', 'WorkTimeService'];

    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000)); 
        return this;   
    }

    function AddWorkController($timeout, $mdSidenav, $log, WorkTimeService) {
        var vm = this;
        var workTimeService = WorkTimeService;

        init();
        
        // Set initial data
        function init() {
            vm.workTime = {
                arrived: new Date(),
                lunch: new Date(),
                lunchArrive: new Date(),
                timeToGo: null
            };
            // Add 4 hours after arrive at work to get lunch as default
            vm.workTime.lunch.addHours(4);
            // Add one hour of lunch as default
            vm.workTime.lunchArrive.addHours(5);
            // Set to 24h mode
            vm.ismeridian = false;
        }

        ////////////

        vm.calculate = function() {
            var arrived = vm.workTime.arrived,
                lunch = vm.workTime.lunch,
                lunchArrive = vm.workTime.lunchArrive,
                timeToGo;

            // some calc
        }

        vm.save = function(newWorkTime) {
            workTimeService.add(newWorkTime);
            init();
            close();
        }

        function close() {
        // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        }
    }
})();