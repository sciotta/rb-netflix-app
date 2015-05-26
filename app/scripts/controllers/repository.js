'use strict';

angular.module('RbNetflixApp')
  .controller('NetflixRepositoryCtrl', function ($scope, $rootScope, $routeParams, GithubResource) {
	$scope.repositoryName = $routeParams.repository;
	
	$scope.allCommitsLoaded = false;
	$scope.commitButtonText = 'Carregando commits...'
	$scope.actualPage = 0;
	$scope.commits = [];
		
	$scope.loadCommits = function(){
		$scope.commitsLoading = true;
		$scope.actualPage = $scope.actualPage + 1;
		GithubResource.get(
			{
				query: 'repos', 
				user: 'netflix', 
				spec: 'commits',
				page: $scope.actualPage, 
				per_page: 20, 
				repo: $scope.repositoryName
			},
			function(res) {
				if(res.data.length < 20){
					$scope.allCommitsLoaded = true;
				}
				
				if($scope.commitButtonText === 'Carregando commits...')
				{
					setTimeout(function(){
						$("#commits-container").scrollTop(1);
						$("#commits-container").scrollTop(0);
					}, 200);
				}
				
				$scope.commitButtonText = 'Carregar mais'
				$scope.commits = $scope.commits.concat( res.data );
				$scope.commitsLoading = false;
			}
		  );
	};
	
	$scope.loadCommits();
  });