
map.on('load', function () {
    map.addSource(
        'CLDSource', {
            'type': 'vector',
            'scheme': 'tms',
            'tiles': [
              // window.location.protocol + '//' +'1116.77.32.19'+':8080/geoserver/gwc/service/tms/1.0.0/ydsx@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
                'http://116.77.32.197:8080/geoserver/gwc/service/tms/1.0.0/ydsx@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
				// window.location.protocol + '//' + window.location.hostname+':8080/geoserver/gwc/service/tms/1.0.0/ydsx_test%3Aydsx_test@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
            ]
        }
    );
    //隔离带面
	map.addLayer({
		'id': 'ha_segregate1',
		'source': 'CLDSource',
		'source-layer': 'ha_segregate',
		'type': 'fill',
		'minzoom': 17,
		'filter': ["==", "materialty", 1],
		'opacity': {
			"stops": [
				[16, 0],
				[17, 1]
			],
		},
		'paint': {
			"fill-color": "#C7E7B6",
			//'fill-outline-color':'rgb(255,0,0)',
			'fill-antialias': true,

		},
		'interactive': true
	})

		map.addLayer({
		'id': 'ha_segregate2',
		'source': 'CLDSource',
		'source-layer': 'ha_segregate',
		'type': 'fill',
		'minzoom': 17,
         'filter': ["==", "materialty", 4],
		'opacity': {
			"stops": [
				[16, 0],
				[17, 1]
			],
		},
		'paint': {
			"fill-color": "#B2B2B2",
			//'fill-outline-color':'rgb(255,0,0)',
			'fill-antialias': true,

		},
		'interactive': true
	})
	//
	// 	map.addLayer({
	// 		'id': '	ha_markingarea',
	// 		'source': 'CLDSource',
	// 		'source-layer': 'ha_markingarea',
	// 		'type': 'fill',
	// 		'minzoom':17.5,
	// 		'opacity': {
	// 			"stops": [
	// 				[16, 0],
	// 				[17, 1]
	// 			],
	// 		},
	// 		'paint': {
	// 			"fill-color": "#C7C6C6",
	// 			//'fill-outline-color':'rgb(255,0,0)',
	// 			'fill-antialias': true,
	//
	// 		},
	// 		'interactive': true
	// 	})
	//


	//道路面
	map.addLayer({
		'id': '	ha_linksurface',
		'source': 'CLDSource',
		'source-layer': 'ha_linksurface',
		'type': 'fill',
		'minzoom': 17,
		'opacity': {
			"stops": [
				[17, 0],
				[17, 1]
			],
		},
		paint: {
			"fill-color": "#6575A9",
			"fill-opacity": 1
		},
		'interactive': true
	})
	map.addLayer({
		'id': "MarkingArea_11030314",
		'type': "fill",
		'source-layer': 'ha_markingarea',
		'minzoom': 17,
		'source': 'CLDSource',
		'paint': {
			"fill-color": "#6575A9",
			"fill-opacity": 1
		},
		'filter': ["==", "functionco", 11030314]
	});
	map.addLayer({
		'id': "MarkingArea_12030301",
		'type': "fill",
		'source': 'CLDSource',
		'source-layer': 'ha_markingarea',
		'minzoom': 17,
		'paint': {
			"fill-color": "#e5e619",
			"fill-opacity": 0.8
		},
		'filter': ["==", "functionco", 12030301]
	});
	map.addLayer({
		'id': "MarkingArea_11020102",
		'type': "fill",
		'minzoom': 17,
		'source-layer': 'ha_markingarea',
		'source': 'CLDSource',
		'paint': {
			"fill-color": "#C7E7B6",
			"fill-opacity": 1
		},
		'filter': ["==", "functionco", 11020102]
	});
	map.addLayer({
		'id': "MarkingArea_11030201",
		'type': "fill",
		'source-layer': 'ha_markingarea',
		'minzoom': 17,
		'source': 'CLDSource',
		'paint': {
			"fill-color": "yellow",
			"fill-opacity": 1
		},
		'filter': ["==", "functionco", 11030201]
	});
	//
	map.addLayer({
		'id': 'singleWhiteSolidLine', //车行道边缘线
		'source': 'CLDSource',
		'source-layer': 'ha_laneline',
		'filter': [
			'all',
			['==', 'linecolor', 1],
			['==', 'solidtype', 2],
			['==', 'issingle', 1]
		],
		'type': 'line',
		'minzoom': 17,
		'layout': {
			"line-join": "round",
			"line-cap": "round"
		},
		'paint': {
			"line-opacity": 1,
			"line-color": "#CCCCCC",
			"line-width": 1.5,
			"line-gap-width": 1.5
		},
	})
	//虚线
	map.addLayer({
		'id': 'ha_laneline',
		'source': 'CLDSource',
		'source-layer': 'ha_laneline',
		'type': 'line',
		'minzoom': 17,
		'filter': [
			'all',
			['==', 'linecolor', 1],
			['==', 'solidtype', 1],
			['==', 'issingle', 1]
		],
		'layout': {
			"line-join": "round",
			"line-cap": "round"
		},
		'paint': {
			"line-color": "#CCCCCC",
			"line-width": 2,
			"line-dasharray": [20, 20]
		},
	})

	map.addLayer({
		"id": "singleYellowsolidLine",
		"type": "line",
		"source": "CLDSource",
		"source-layer": "ha_laneline",
		'filter': [
			'all',
			['==', 'linecolor', 2],
			['==', 'solidtype', 2],
			['==', 'issingle', 1]
		],
		'minzoom': 20,
		'layout': {
			"line-join": "round",
			"line-cap": "round"
		},
		'paint': {
			"line-opacity": 1,
			"line-color": "#ebb505",
			"line-width": 1.5,
			"line-gap-width": 1.5
		},
		"interactive": true
	});
	map.addLayer({
		"id": "doubleYellowsolidLine",
		"type": "line",
		"source": "CLDSource",
		"source-layer": "ha_laneline",
		'filter': [
			'all',
			['==', 'linecolor', 2],
			['==', 'solidtype', 2],
			['==', 'issingle', 2]
		],
		'minzoom': 17,
		'layout': {
			"line-join": "round",
			"line-cap": "round"
		},
		'paint': {
			"line-opacity": 1,
			"line-color": "#ebb505",
			"line-width": 1.5,
			"line-gap-width": 1.5
		},
		"interactive": true
	});


	//路障线
	map.addLayer({
		'id': 'MarkingLine_baise_banma',
		'source': 'CLDSource',
		'source-layer': 'ha_markingline',
		'type': 'line',
		'filter': ["==", "functionco", 11020101],
		'minzoom': 19,
		'maxzoom': 24,
		'layout': {
			"line-join": "round",
			"line-cap": "butt"
		},
		'paint': {
			"line-color": "white",
			"line-width": 25,
			"line-dasharray": [.1, .4]
		},
	});
	map.addLayer({
		'id': 'MarkingLine_12020201',
		'source': 'CLDSource',
		'source-layer': 'ha_markingline',
		'type': 'line',
		'minzoom': 17,
		'maxzoom': 24,
		'layout': {
			"line-join": "round",
			"line-cap": "round"
		},
		'paint': {
			"line-color": "white",
			"line-width": 2
		},
		'filter':["==", "functionco", 12020201]
	});
	map.addLayer({
		'id': 'MarkingLine_11020301',
		'source': 'CLDSource',
		'source-layer': 'ha_markingline',
		'type': 'line',
		'minzoom': 17,
		'maxzoom': 24,
		'layout': {
			"line-join": "round",
			"line-cap": "round"
		},
		'paint': {
			"line-color": "white",
			"line-width": 2,
			"line-dasharray": [20, 20]
		},
		'filter': ["==", "functionco", 11020301]
	});

	map.addLayer({
		'id': '	ha_segragate_line',
		'source': 'CLDSource',
		'source-layer': 'ha_segragate_line',
		'type': 'line',
		'minzoom': 17,
		'paint': {
			'line-width': {
				"base": 2,
				"stops": [
					[5, 1],
					[25, 40]
				]
			},
			"line-color": {
				"base": 1,
				"stops": [
					[8, "rgb(255,247,102)"],
					[9, "rgb(255,247,102)"]
				]
			}
		}
	});
        //
	     // map.addLayer({
        //     'id': 'buildfilter_jwa',
        //     'source': 'CLDSource',
        //     'source-layer': 'building_wgs84',
        //     'type': 'fill-extrusion',
        //     'minzoom': 16,
        //     'maxzoom': 24,
        //     'paint': {
			// "fill-extrusion-color": ['interpolate', ['linear'],
			// 	['get', 'height'],
			// 	0, '#BFBFBF', 50, '#BFBFBF', 150, "#BFBFBF",
			// ],
			// 'fill-extrusion-height': ['get', 'height'],
			// 'fill-extrusion-opacity': .6
        // },
        //     "interactive": true
        // });

	     map.addLayer({
			'id': '3d-buildings',
			'source': 'CLDSource',
			'source-layer': 'building_wgs84',
			// 'filter': ['==', 'extrude', 'true'],
			'type': 'fill-extrusion',
			'minzoom': 15,
			'paint': {
			'fill-extrusion-color': '#aaa',

			// use an 'interpolate' expression to add a smooth transition effect to the
			// buildings as the user zooms in
			'fill-extrusion-height': [
			"interpolate", ["linear"], ["zoom"],
			15, 0,
			16, ["get", "height"]
			],
			'fill-extrusion-base': [
			"interpolate", ["linear"], ["zoom"],
			15, 0,
			16, ["get", "min_height"]
			],
			'fill-extrusion-opacity': .6
			}
			});
});

map.addControl(new mapboxgl.NavigationControl());
// //获取鼠标的坐标
// map.on('click', function(e) {
// 	document.getElementById('info').innerHTML = JSON.stringify(e.point) + '<br />' +
// 		JSON.stringify(e.lngLat)
// });
//定位坐标
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));
