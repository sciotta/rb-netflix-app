'use strict';

angular.module('RbNetflixApp')
  .controller('RepositoriesNavCtrl', ['$scope', '$rootScope', '$routeParams', 'GithubResource', 
  function ($scope, $rootScope, $routeParams, GithubResource) {

	$rootScope.actualRepo;
	$scope.repos = [];
	
	$scope.getRepositories = function(){
		var repositoryName = $routeParams.repository;
		GithubResource.get().$promise.then(
		function(res) {
			$scope.repos = res.data;
			
			setTimeout(function(){
				$("#repositories-list ul").scrollTop(1);
				$("#repositories-list ul").scrollTop(0);
			}, 200);
			
			if(repositoryName){
				for(var a = 0; a < res.data.length; a++){
					if($scope.repos[a].name === repositoryName)
					{
						$rootScope.actualRepo = $scope.repos[a];
						$rootScope.actualRepo.selected = true;
					}
				}
			}
        });	  
	};
	
	$scope.$on('$routeChangeSuccess', $scope.getRepositories);
	
	$scope.changeRepository = function(repo){

		if($rootScope.actualRepo)
		{
			$rootScope.actualRepo.selected = false;
		}

		repo.selected = true;
		$rootScope.actualRepo = repo;
	}
}]);