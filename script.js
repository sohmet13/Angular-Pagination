var app = angular.module("MyApp", ["angularUtils.directives.dirPagination"]);
app.controller("myCtrl", function($scope, $http) {
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.results = [];
  let game = [];
  //get data
  let url =
    "https://api.twitch.tv/kraken/streams?client_id=l8lfod0fim2ppwgnclozk10y5q9vo6&?game=Overwatch";
  $http.get(url).then(function(data) {
    let pages = data.data.streams;
    angular.forEach(pages, function(v) {
      $scope.results.push({
        game: v.game,
        viewers: v.viewers,
        stream_type: v.stream_type
      });
      game.push(v.game);
    });
    $scope.results = $scope.results.filter(a => a.game);
    $scope.games = game.filter((elem, i, arr) => {
      if (arr.indexOf(elem) === i) {
        return elem;
      }
    });
    $scope.games.unshift("");
  });
  //finally we got data
});