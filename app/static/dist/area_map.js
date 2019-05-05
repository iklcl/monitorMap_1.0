var bounds = [
	[113.877, 22.503], // Southwest coordinates
	[114.14024, 22.586] // Northeast coordinates
];
function getRootPath() {

			    var pathName = window.location.pathname.substring(1);

			    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));

			    return window.location.protocol + '//' + window.location.host + '/' + "static" + '/';

}
//创建对象传值
var map = new mapboxgl.Map({
	container: 'map',
	center: [114.044,22.542],//初始中心点
	zoom: 17,//初始空间层次
	maxBounds: bounds,
	minZoom: 11,
	maxZoom: 20,
	// pitch: 60,
    localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
	style: {
		"version": 8,
		"glyphs":"static/mapboxZITI/{fontstack}/{range}.pbf", //字体
		//数据源引用
		"sources": {
			'areaSource': {
				'type': 'vector',
				'scheme': 'tms',
				'tiles': [
					// http://116.77.32.197:8080/geoserver/gwc/service/tms/1.0.0/ydsx@EPSG%3A900913@pbf
					'http://116.77.32.197:8080/geoserver/gwc/service/tms/1.0.0/ydsx@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
					// window.location.protocol + '//' +'1116.77.32.19'+':8080/geoserver/gwc/service/tms/1.0.0/ydsx@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
				]
			}
		},
		//图层添加
		"layers": [
			{
				"id": "background",
				"type": "background",
				"layout": {},
				"paint": {
					"background-color": {
						"base": 1,
						"stops": [
							[11, "#fff"],
							[13, "#fff"]
						]
					}
				}
			},
		]
	},
});
var scale = new mapboxgl.ScaleControl({
	// maxWidth:80,
	unit:'metric'
});
map.addControl(scale)
// map.addControl(new mapboxgl.FullscreenControl());
// var isZooming = map.isZooming();
map.on('load', function() {


	map.addLayer({
		'id': 'Iland1',
		'source': 'areaSource',
		'source-layer': 'bgd_area',
		'type': 'fill',
		'filter': ["in", "type", '21','22','23','34','35'],
		'paint': {
			"fill-color":
			 {
			 	'stops': [
					[15,'#fff'],

			 		[17.5, '#fff']
			 	]
			 },
			'fill-antialias': true,
		}
	})


	//公园，绿地
	map.addLayer({
		'id': 'greenland1',
		'source': 'areaSource',
		'source-layer': 'bgd_area',
		'filter': ["in", "type", '31','32','33'],
		'type': 'fill',
		'paint': {
			"fill-color": {
				'stops': [
					[11, '#C7E7B6'],
					[17, '#C7E7B6']
				]
			},
			'fill-antialias': true,
		}
	})
	// //高尔夫球场
	// map.addLayer({
	// 	'id': 'greenland2',
	// 	'source': 'areaSource',
	// 	'source-layer': 'bgd_area_32',
	// 	'type': 'fill',
	// 	'paint': {
	// 		"fill-color": {
	// 			'stops': [
	// 				[11, '#C7E7B6'],
	// 				[17, '#C7E7B6']
	// 			]
	// 		},
	// 		'fill-antialias': true,
	// 	}
	// })
	// //交通绿化
	// map.addLayer({
	// 	'id': 'greenland3',
	// 	'source': 'areaSource',
	// 	'source-layer': 'bgd_area_33',
	// 	'type': 'fill',
	// 	'paint': {
	// 		"fill-color": {
	// 			'stops': [
	// 				[11, '#C7E7B6'],
	// 				[17, '#C7E7B6']
	// 			]
	// 		},
	// 		'fill-antialias': true,
	// 	}
	// })
	// //运动场跑到
	// map.addLayer({
	// 	'id': 'greenland4',
	// 	'source': 'areaSource',
	// 	'source-layer': 'bgd_area_34',
	// 	'type': 'fill',
	// 	'paint': {
	// 		"fill-color": {
	// 			'stops': [
	// 				[11, '#C7E7B6'],
	// 				[17, '#C7E7B6']
	// 			]
	// 		},
	// 		'fill-antialias': true,
	// 	}
	// })
	//运动球场
	// map.addLayer({
	// 	'id': 'greenland5',
	// 	'source': 'areaSource',
	// 	'source-layer': 'bgd_area_35',
	// 	'type': 'fill',
	// 	'paint': {
	// 		"fill-color": {
	// 			'stops': [
	// 				[17, '#C7E7B6'],
	// 				[17, '#C7E7B6']
	// 			]
	// 		},
	// 		'fill-antialias': true,
	// 	}
	// })
	//海洋
	map.addLayer({
		'id': 'water1',
		'source': 'areaSource',
		'source-layer': 'bgd_area',
		'filter': ["in", "type", '11','12'],
		'type': 'fill',
		'paint': {
			"fill-color": '#78BCED',
			'fill-antialias': true,
		}
	})
	// //水系
	// map.addLayer({
	// 	'id': 'water2',
	// 	'source': 'areaSource',
	// 	'source-layer': 'bgd_area_12',
	// 	'type': 'fill',
	// 	'paint': {
	// 		"fill-color": '#78BCED',
	// 		'fill-antialias': true,
	// 	}
	// })
});
