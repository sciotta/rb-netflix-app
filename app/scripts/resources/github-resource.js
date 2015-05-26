'use strict';

angular.module('RbNetflixApp')
  .factory('GithubResource', function GithubResource($resource) {
    return $resource(
      'https://api.github.com/:query/:user/:repo/:spec',
      {
        'query': 'users',
        'user': 'netflix',
        'repo': 'repos',
        'spec': '',
        'callback': 'JSON_CALLBACK',
        'per_page': 1000,
		'page': 1
      }, {
        'get': {
            'method': 'JSONP'
        }
      }
    );
  });
