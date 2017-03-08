var firebaseHandler = function() {
	
	var _self	 = this;
	this.config  = null;
	this.hasInit = false;

	this.initCallbacks = [];

	_self.path = "/report/";
	
	this.addInitCallback = function(callback){
		if(_self.hasInit) callback();
		else _self.initCallbacks.push(callback);
	}
	
	this.fireInitCallbacks = function(){
		_self.hasInit = true;
		_self.initCallbacks.forEach(function(arg){
			try{
				arg()
			}catch(err){
				console.log("Erro no callback "+arg);
			}
		});
	}

	this.fireCallbacks=function(){
		for(var j=0;j< _self.updateCallback.length;j++){
			try{
				_self.updateCallback[j]();
			}catch(err){
				console.log("Error in callback "+_self.updateCallback[j]);
			}
		}
	}

	this.init = function () {
		//console.log("Firebase Iniciado");
	}

	this.createReportId = function (callback) {

		var id = firebase.database().ref().child( _self.path ).push();
		callback(id.getKey());
	}

	_self.createReport = function (companyId, callback) {

		var _path = "/empresas/"+companyId+"/reports";

		var id = firebase.database().ref().child( _path ).push();
		callback(id.getKey());		
	}

	_self.getCompanies = function (callback) {
		firebase.database()
			.ref("/empresas")
			.once("value")
			.then(function(snapshot){

			// callback(snapshot.val());
			var ret = [];
			snapshot.forEach(function(arg){
				var item=arg.val();
				item.key=arg.key;
				if(typeof item != "string")ret.push(item)
			});
			callback(ret);
		})
	}

	_self.getCompaniesNumber = function (callback) {
		firebase.database()
			.ref()
			.child("empresas")
			.on("value", function(snapshot){

				//console.log("There are "+snapshot.numChildren()+" messages");
				var els = snapshot.val();
				var counter = 0;
				for (var key in els) {
					if (key != null) counter++;
				}

				callback(counter);

			})
	}

	_self.saveRegionToReport = function (companyId, reportId, lat, lng, callback) {
		
		obj = {
			lat: lat,
			lng, lng
		}

		var _path 	= "/empresas/"+companyId+"/reports/"+reportId+'/regions';
		var region  = firebase.database().ref().child( _path ).push(obj);
		
		callback(region.getKey());

	}

	_self.getRegionsFromReport = function (company, report, callback) {
		var path = "/empresas/"+company+'/reports/'+report+'/regions';
		var region  = firebase.database().ref(path).on('value', function(snapshot) {
			callback(snapshot.val())
		});


	}

}