'use strict';

function log (item) {
    console.log("<===========================>");
    console.dir(item);
    console.log("<===========================>");
}	

angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, Regioes, $ionicSideMenuDelegate) {

	var report = $scope.report = {};
	report.new = false;

	/*
	Regioes.addCallback( function(){
		if(!$scope.$$phase) {
    		$scope.$apply();  
		}
	});
	*/

	$scope.$on('showRegions', function(event,regioes){
		console.log('oi');
		$scope.itens = regioes;
	})

})
.controller('HomeCtrl', function($scope, $state, Report, FirebaseHandler) {

	var mostrarEmpresasNumero = function (num) {
		$scope.companiesNumber = num;
		if(!$scope.$$phase) {
    		$scope.$apply();  
		}
	}

	FirebaseHandler.getCompaniesNumber( mostrarEmpresasNumero );	

})
.controller('ReportController', function($scope, $state, Report, FirebaseHandler){

	$scope.showButton = false;
	var empresaSelecionada = null;

	var callbackCreateReport = function (a) {
		Report.setReportCode(a);
	}

	var createReport = function () {
		Report.createNewReport( callbackCreateReport );
	}

	var listCompanies = function (obj) {
		$scope.companies = obj;
        // mostart botao entao
        $scope.showButton = true;
        if(!$scope.$$phase) {
            $scope.$apply();  
        }
	}

	$scope.settingCompany = function (item) {
    	empresaSelecionada = item;
    	Report.setActiveReport(empresaSelecionada);
    }

	$scope.reportStart = function () {
		FirebaseHandler.createReport(empresaSelecionada, changeLocation);
	}

	var changeLocation = function (codigo) {
		Report.setActiveReport(empresaSelecionada, codigo);
		$state.go('app.reportNew');
	}

	FirebaseHandler.getCompanies(listCompanies);

})
.controller('MapCtrl', function($scope, $ionicSideMenuDelegate, Regioes, Report) {

	$scope.$on( "$ionicView.beforeEnter", function( scopes, states ) {
		
		// MOCK
		if (Report.company == undefined) {
			Report.company = '-KWm_y_qpveYxfqf0ynB';
			Report.code = '-Ke_TK9c0BCdMyMdUsvl';
		}
		
		// Pegar as Regioes já inseridas nesse Report
		Report.getRegionsFromReport(Report.company, Report.code, alterarRegioes);

    });


	$scope.toggleRight = function() {
    	$ionicSideMenuDelegate.toggleRight();
  	};

  	var alterarRegioes = function (values) {
  		console.dir(values);
  		$scope.$emit('showRegions', values);
  	}

	/*
	 * Maps Functions
	 */

	 	/*
	 	 * Init
	 	 */
		var map = L.map('mapid').setView([-23.5423278,-46.7166,15], 14);
		$scope.points = [];

		/*
		 * Add
		 */
		$scope.adicionarCircle = function() {
			//get map center
			var centro = map.getCenter();
			$scope.points.push(CircleHelper.createCircle( centro.lat, centro.lng, map, $scope.name));
			Report.saveRegionToReport(centro.lat, centro.lng, addRegionCallback);
		}

		var addRegionCallback = function (id) {
			Regioes.setStatus();
			$scope.$emit('abacate');
		}

		L.tileLayer(
			'https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
			{
	    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    	maxZoom: 18,
	    	id: 'mapbox.satellite',
	    	accessToken: 'pk.eyJ1IjoidHVjdXJhIiwiYSI6ImNpeHppMGdtMDAwNmIycW83b2VtOGFjbzUifQ.K3CuctNXnx3jPq_22Dv6kw'
		}).addTo(map);

	    $scope.selected = [];
	    $scope.selectUnit = function (point) {
	    	$scope.selectPoint=point;
	    }; 

		$scope.mais=function(){
			console.dir($scope.selectPoint.getRadius()+" metros");
			$scope.selectPoint.setRadius($scope.selectPoint.getRadius()+10);
		}

		$scope.menos=function(){
			console.dir($scope.selectPoint.getRadius()+" metros");
			$scope.selectPoint.setRadius($scope.selectPoint.getRadius()-10);
		}

})
.controller('RegionCtrl', function($scope, Regioes, Report, $ionicSideMenuDelegate){

	$scope.$on( "$ionicView.beforeEnter", function( scopes, states ) {
		
		$ionicSideMenuDelegate.toggleRight();

    });

})
;