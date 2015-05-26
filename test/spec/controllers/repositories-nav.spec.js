'use strict';

describe('RepositoriesNavCtrl', function () {
	var scope;
	var $httpBackend;
	var GithubResourceMock;
	var $timeout;
	var rootScope;
	
	beforeEach(module('RbNetflixApp'));
  
	beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_, $q,_$timeout_, GithubResource) {
		$timeout = _$timeout_;
		rootScope = _$rootScope_;
		GithubResourceMock = GithubResource;
		
		var getDeferred = $q.defer();
		spyOn(GithubResourceMock, 'get').andReturn({$promise: getDeferred.promise});
		
		scope = rootScope.$new();
		$controller('RepositoriesNavCtrl', {
			'$scope': scope,
			'$rootScope': rootScope,
			'GithubResource': GithubResourceMock, 
			'$routeParams': { repository: 'asgard' }
		});
		
		getDeferred.resolve({data:[{name: 'ice'}, {name: 'asgard', forks_count: 123}]});
		rootScope.$apply();
	}));
   
    it('should get method of GithubResource is called', function (){
		scope.getRepositories();
		expect(GithubResourceMock.get).toHaveBeenCalled();
	});
	
	it('should netflix repositories list has been setted', function (){
		scope.getRepositories();
		$timeout.flush();
		expect(scope.repos.length).toBe(2);
	});
	
	it('should $rootScope.actualRepo be setted based route params', function (){
		scope.getRepositories();
		$timeout.flush();
		expect(rootScope.actualRepo.forks_count).toBe(123);
	});
});