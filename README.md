# rb-netflix-app [![Build Status](https://travis-ci.org/thiagog3/rb-netflix-app.svg?branch=master)](https://travis-ci.org/thiagog3/rb-netflix-app) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
A simple SPA AngularJS application consuming Netflix GitHub API account. Testing with Karma and Protractor.

See a demo and functional page here: <http://thiagog3.github.io/rb-netflix-app>

## Getting Started

#### 1. Setting Up environment

Clone this repository and install nodeJS and some packages (NPM) globaly:

```
npm install -g bower grunt-cli
npm install -g protractor
```

#### 2. Download node modules and bower components

Use this commands on upon your cloned folder:

```
npm install
bower install
```

#### You are almost ready!

Use the folowing steps to serve locally, build or test your applicattion:

#### Serve locally

```
grunt serve
```

#### Build project (dist folder)

```
grunt build
```

#### Test application

Only unit-tests (with Karma and Jasmine)

```
grunt test
```

Protractor e2e (end to end) tests (using chrome webdriver)

```
grunt complete-test
```

## Contributing

Please use the issue tracker and pull requests.
