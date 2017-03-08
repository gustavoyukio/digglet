angular.module('starter.services', [])

.factory('SystemMessages', function() {

	var SystemMessages = function(){
		
		var _self = this;

		var obj = {};

		_self.setMessage = function (bool, text) {
			obj = {
				type: bool,
				text: text
			}
		}

		_self.getValues = function () {

			return obj;
		}

	}

	return new SystemMessages();

})
.factory('Report', ['FirebaseHandler', function (FirebaseHandler) {
	
	var Report = function () {
		
		var _self = this;

		_self.status = false;
		_self.new = false;
		_self.codigo = 0;

		_self.setNewStatus = function (value) {
			_self.new = value;
			executeCallback();
		}

		_self.getNewStatus = function () {
			return _self.new;
		}

		_self.setReportCode = function (id) {
			_self.codigo = id;
			_self.new = false;
		}

		_self.getReportCode = function () {
			return _self.codigo;
		}

		_self.createNewReport = function (callback) {
			FirebaseHandler.createReportId(callback)
		}

		_self.setActiveReport = function (company, report) {
			_self.code = company;
			_self.report = report;
		}

		_self.saveRegionToReport = function(lat, lng, callback) {
			FirebaseHandler.saveRegionToReport(_self.company, _self.code, lat, lng, callback);
		}

		_self.getRegionsFromReport = function (company, report, callback) {
			FirebaseHandler.getRegionsFromReport(company, report, callback);
		}


	}

	return new Report();
}])

.factory('FirebaseHandler', function(){
	return new firebaseHandler();
})

.factory('Regioes', function() {

	var Regioes = function () {

		var _self 	 	= this;
		_self.status 	= false;
		_self.itens 	= [];

		_self.setStatus = function () {
			_self.itens.push({nome:'auehahuie'});
		}

		_self.getItens = function () {
			return _self.itens;
		}

	}

	return new Regioes();
})
;