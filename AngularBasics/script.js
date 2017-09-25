//Data Abstraction
/*
var work = function() {
	console.log("working hard!");
};


var doWork = function(f) {
	console.log("Starting");
	try{
		f();
	}
	catch(ex){
		console.log(ex);
	}
	
	console.log("Ending");
};

doWork(work);
*/

//
/*(function() {

	var createWorker = function() {
		
		var workCount = 0;

		var task1 = function(){
			workCount += 1;
			console.log("task1 " + workCount);
		};	

		var task2 = function(){
			workCount += 1;
			console.log("task2 " + workCount);
		};

		return {
			job1: task1,
			job2: task2
		};
	};

	var worker = createWorker();

	worker.job1();
	worker.job2();
	worker.job1();
	worker.job2();
	worker.job2();
	worker.job2();
}()); */

//Controller PluralSight
angular.module('myApp', [])
.controller('MainCtrl', function($scope, $http, $interval){
	
	var onUserComplete = function(response){
		$scope.user = response.data;
		$http.get($scope.user.repos_url)
		.then(onRepos, onError);
	};

	var onRepos = function(response) {
		$scope.repos = response.data;
	};

	var onError = function(reason) {
		$scope.error = "Could not fetch the data";
	};

	var decrementCountdown = function(){
		$scope.countdown -= 1;
		if ($scope.countdown < 1) {
			$scope.search($scope.username);
		}
	};

	var startCountdown = function() {
		$interval(decrementCountdown, 1000, $scope.countdown);
	};

	$scope.search = function(username) {
		$http.get("https://api.github.com/users/" + username)
		.then(onUserComplete, onError);
	};

	$scope.username = "angular";
	$scope.message = "Github Viewer!";
	$scope.repoSortOrder = "-stargazers_count";
	$scope.countdown = 5;
	startCountdown();

});