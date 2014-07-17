angular.module("app").factory "GithubSvc", ($http) ->
  fetchStories: ->
    $http.get('https://api.github.com/users')
