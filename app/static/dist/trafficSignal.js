map.on('load', function() {
		map.loadImage("{{ url_for('static',filename='Image/trafficSignal_h.png') |tojson }}", function(error, trafficSignal_h) {
			if (error) throw error;
			map.addImage('trafficSignal_h', trafficSignal_h);
			map.addLayer({
						'id': 'trafficSignal_h',
						'source': 'CLDSource',
						'source-layer':'attachp',
						'filter':[
							'all',
							["==",'attachedty',1],
							['==','modelnumbe',64201003]
						],
						'type': 'symbol',
						'minzoom':18.5,
						"layout": {
							"icon-image": "trafficSignal_h",
							'symbol-avoid-edges':true,
							"icon-rotation-alignment":"map",
							'icon-padding':0,
							'icon-ignore-placement':true,
							'icon-rotate':['get','caangle'],
							'icon-allow-overlap':true,
							"icon-size": {
								'stops':[[18.5,0.02],[22,0.1]]
							},
						},
						"interactive":true
			});
		});
})
