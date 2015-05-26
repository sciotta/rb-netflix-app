'use strict';
 
describe('Tests e2e on index routing', function() {
  
  beforeEach(function() {
    browser.get('index.html');
  });
 
  it('should automatically redirect to / when location hash is empty', function() {
	expect(browser.getLocationAbsUrl()).toMatch("/");
  });
});

describe('Tests e2e on existing routing', function() {

  var repositoryName = element(by.binding('repositoryName'));
  var loadCommitsBtn = element(by.id('load-commits-btn')); 
  
  var scrollToBottom = function(){
    var div = element(by.id('commits-container'));
	
	var deferred = protractor.promise.defer();
	browser.executeScript("return arguments[0].scrollHeight;", div.getWebElement()).then(function (offset) {
		browser.executeScript('arguments[0].scrollTop = arguments[1];', div.getWebElement(), offset).then(function() {
			deferred.fulfill();
		});
	});
	return deferred.promise;
  }
  
  beforeEach(function() {
	browser.get('/#/Cloud-Prize');
  });
  
  it('should title appears equals then routing when location is setted', function() {
	expect(repositoryName.getText()).toEqual('Cloud-Prize');
  });
  
  it('should button invisible when all commits are loaded', function() {
	scrollToBottom().then(function(){
		loadCommitsBtn.click();
		browser.waitForAngular();
		scrollToBottom().then(function()
		{
			element(by.id('load-commits-btn')).isDisplayed().then(function(isDisplayed)
			{
				expect(isDisplayed).toBe(false);
			});
		});
	});
  });
});