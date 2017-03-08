// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services','starter.controllers'])

.run(function($ionicPlatform) {
	
	$ionicPlatform.ready(function() {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if (window.cordova && window.cordova.plugins.Keyboard) {
	    	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    	cordova.plugins.Keyboard.disableScroll(true);

	    }
	    if (window.StatusBar) {
	    	// org.apache.cordova.statusbar required
	      	StatusBar.styleDefault();
	  	}

	});

})

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})

	.state('app.home', {
		url: '/home',
		views: {
			'menuContent': {
				templateUrl: 'templates/home/index.html',
				controller: 'HomeCtrl'
			}
		}
	})

	.state('app.reportHome', {
		url: '/relatorio/home',
		views: {
			'menuContent': {
				templateUrl: 'templates/report/home.html',
				controller: 'ReportController'
			}
		}
	})

	.state('app.reportNew', {
		url: '/relatorio/novo',
		views: {
			'menuContent': {
				templateUrl: 'templates/report/map.html',
				controller: 'MapCtrl'
			}
		}
	})

	.state('app.reportRegionInfo', {
		url: '/relatorio/region/info',
		views: {
			'menuContent': {
				templateUrl: 'templates/report/region.html',
				controller: 'RegionCtrl'
			}
		}
	})

	.state('app.map', {
		url: '/map',
		views: {
			'menuContent': {
				
			}
		}
	})

  	// if none of the above states are matched, use this as the fallback
  	$urlRouterProvider.otherwise('/app/home');

})
.filter('nomeRegiao', function() {
	return function (input) {
		var string = '';
		if (!input) {
			string = "Região Sem Nome";
		} else {
			string = input;
		}
		return string;
	}
})
;
