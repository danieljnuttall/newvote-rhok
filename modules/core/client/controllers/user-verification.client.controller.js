'use strict';

angular.module('core').controller('UserVerificationController', ['$rootScope', '$scope', '$state', 'Authentication', 'Menus',
  function ($rootScope, $scope, $state, Authentication, Menus) {
    var vm = this;
    vm.user = Authentication.user;

    vm.save = function() {
      console.log('ello', vm.user);
      $scope.updateUserProfile = function (isValid) {
        $scope.success = $scope.error = null;

        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'userForm');

          return false;
        }

        var user = new Users($scope.user);

        user.$update(function (response) {
          $scope.$broadcast('show-errors-reset', 'userForm');

          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      };
    };
  }
]);
