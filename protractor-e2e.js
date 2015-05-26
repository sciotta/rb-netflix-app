exports.config = {
  
  allScriptsTimeout: 99999,
 
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  
  chromeDriver: './node_modules/protractor/selenium/chromedriver',
  
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
 
  baseUrl: 'http://localhost:9001/',
 
  framework: 'jasmine',
 
  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/e2e/*.js'],
 
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose : true,
    includeStackTrace : true
  }
};