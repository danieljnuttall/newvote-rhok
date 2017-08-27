'use strict';

angular.module('core').controller('IssueController', ['$scope', 'Authentication', '$mdSidenav', '$rootScope', '$mdMenu', '$state', '$stateParams', 'IssueService', '$mdDialog', 'issue', 'VoteService', 'solutions',
  function ($scope, Authentication, $mdSidenav, $rootScope, $mdMenu, $state, $stateParams, IssueService, $mdDialog, issue, VoteService, solutions) {
    // This provides Authentication context.
    var vm = this;
    vm.issue = issue;
    vm.issueId = issue._id;
    vm.solutions = solutions;
    $scope.authentication = Authentication;
    if(vm.issue._id){
      var title = vm.issue.name;
      if($state.is('issues.edit')) title = 'Edit Issue - ' + title;
      $rootScope.pageTitle = title;
    } 

    vm.createOrUpdate = function() {
      return IssueService.createOrUpdate(vm.issue).then(function(issue) {
        $state.go('issues.view', { issueId: issue._id });
      });
    };

    vm.delete = function() {
      if(!vm.issue._id) return;
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this issue?')
        .textContent('This cannot be undone. Please confirm your decision')
        .ok('Yes, I\'m sure')
        .cancel('No');

      $mdDialog.show(confirm).then(function() {
        IssueService.delete(vm.issue._id).then(function() {
          $state.go('issues.list');
        });
      });
    };

    vm.vote = function(solution, voteType, $event) {
      $event.stopPropagation();
      VoteService.vote(solution, 'Solution', voteType);
    };
  }
]);
