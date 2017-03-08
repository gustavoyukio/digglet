var CircleHelper = {
	createCircle:function(lat,long,map,name){
		//-23.5423278, -46.7166
		console.log("===> "+name);

		var circle = L.circle([lat,long,15], {
	    	color: 'red',
	    	fillColor: '#f03',
	    	fillOpacity: 0.5,
	    	radius: 100
		}).addTo(map);

		circle.on('mousedown', function (event) {
		  map.dragging.disable();
		  let {lat: circleStartingLat, lng: circleStartingLng} = circle._latlng;
		  let {lat: mouseStartingLat, lng: mouseStartingLng} = event.latlng;

		  map.on('mousemove', event => {
		    let {lat: mouseNewLat, lng: mouseNewLng} = event.latlng;
		    let latDifference = mouseStartingLat - mouseNewLat;
		    let lngDifference = mouseStartingLng - mouseNewLng;

		    let center = [circleStartingLat-latDifference, circleStartingLng-lngDifference];
		    circle.setLatLng(center);
		  });
		});

		map.on('mouseup', () => { 
	  		map.dragging.enable();
	  		map.removeEventListener('mousemove');
		});
		circle.name=name;
		return circle;
	}


	
}