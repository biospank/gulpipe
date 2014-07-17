angular.module("app").controller "GithubCtrl", ($scope, GithubSvc) ->
  GithubSvc.fetchStories().success (users) ->
    $scope.users = users
