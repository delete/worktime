(function(){
'use strict';
// https://github.com/agrublev/angularLocalStorage
    angular.module('app')
        .service('WorkTimeService', WorkTimeService);

    WorkTimeService.$inject = ['$localStorage'];

    function WorkTimeService($localStorage) {
        var self = this;

        self.storage = $localStorage.$default({
            worktimes: []
        });

        var service = {
            add: add,
            remove: remove,
            clear: clear,
            notEmpty: notEmpty,
            total: total,
            all: self.storage.worktimes
        };
        return service;

        ////////////

        function add(newTime) {
          self.storage.worktimes.push(newTime);
        }

        function remove(newTime) {
          var index = null;
          index = self.storage.worktimes.indexOf(newTime);
          self.storage.worktimes.splice(index, 1);
        }

        function clear() {
            self.storage.$reset({
                worktimes: []
            });
        }

        function notEmpty() {
            if (total() > 0) {
              return true;
            }else{
              return false;
            }
        }

        function total() {
            return self.storage.worktimes.length;
        }
    }
})();