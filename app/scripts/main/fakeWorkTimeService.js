(function(){
'use strict';
// https://github.com/agrublev/angularLocalStorage
    angular.module('app')
        .service('FakeWorkTimeService', FakeWorkTimeService);

    function FakeWorkTimeService() {
        var self = this;

        self.worktimes = [];

        var service = {
            add: add,
            remove: remove,
            clear: clear,
            notEmpty: notEmpty,
            total: total,
            all: self.worktimes
        };
        return service;

        ////////////

        function add(newTime) {
          self.worktimes.push(newTime);
        }

        function remove(newTime) {
          var index = null;
          index = self.worktimes.indexOf(newTime);
          self.worktimes.splice(index, 1);
        }

        function clear() {
            self.worktimes = [];
        }

        function notEmpty() {
            if (total() > 0) {
              return true;
            }else{
              return false;
            }
        }

        function total() {
            return self.worktimes.length;
        }
    }
})();