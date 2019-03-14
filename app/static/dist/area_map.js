var bounds = [
	[113.73361883714733, 22.29996893682818], // Southwest coordinates
	[114.63017998306674, 22.89938075277307] // Northeast coordinates
];

function getRootPath() {

			    var pathName = window.location.pathname.substring(1);

			    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));

			    return window.location.protocol + '//' + window.location.host + '/' + "static" + '/';

}
//创建对象传值
var map = new mapboxgl.Map({
	container: 'map',
	center: [114.04945667020581,22.539536883349115],//初始中心点
	zoom: 17,//初始空间层次
	maxBounds: bounds,
	minZoom: 11,
	pitch: 45,
	style: {
		"version": 8,
		// "sprite": "http://127.0.0.1:8848/xiangmihu/mapboxTuBiao/sprite",
		"glyphs":"static/mapboxZITI/{fontstack}/{range}.pbf", //字体
		//数据源引用
		"sources": {
			'areaSource': {
				'type': 'vector',
				'scheme': 'tms',
				'tiles': [
					'http://localhost:8090/geoserver/gwc/service/tms/1.0.0/area_sz@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
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
							[11, "#78BCED"],
							[13, "#78BCED"]
						]
					}
				}
			},
		]

	},
});
map.addControl(new mapboxgl.FullscreenControl());
var isZooming = map.isZooming();
map.on('load', function() {

	map.addLayer({
		'id': 'procince',
		'source': 'areaSource',
		'source-layer': 'district_4_a',
		'type': 'fill',
		'paint': {
			"fill-color": "#F7F7F7",
			'fill-antialias': true,
		}
	})
	
	map.addLayer({
		'id': 'districta',
		'source': 'areaSource',
		'source-layer': 'dsitrict_2_shenzhen_a',
		'type': 'fill',
		'paint': {
			"fill-color":
			 {
			 	'stops': [
					[15,'#ECE0CA'],
			 		[17.5, "#B3B3B3"],
			 		[17.5, '#B3B3B3']
			 	]
			 },
			'fill-antialias': true,
		}
	})


	map.addLayer({
		'id': 'greenland',
		'source': 'areaSource',
		'source-layer': 'm_bkareaa',
		'filter': ['in', 'orderid', 113, 120, 121, 122, ],
		'type': 'fill',
		'paint': {
			"fill-color": {
				'stops': [
					[17.5, '#CADF9B'],
					[17.5, '#2E8B57']
				]
			},
			'fill-antialias': true,
		}
	})
	map.addLayer({
		'id': 'water_deal',
		'source': 'areaSource',
		'source-layer': 'water_deal',
		'filter': ['!=', 'orderid', 119],
		'type': 'fill',
		'paint': {
			"fill-color": '#78BCED',
			'fill-antialias': true,
		}
	})
	map.addLayer({
		'id': 'island',
		'source': 'areaSource',
		'source-layer': 'water_deal',
		'filter': ['!=', 'orderid', 119],
		'type': 'fill',
		'paint': {
			"fill-color": '#78BCED',
			'fill-antialias': true,
		}
	})
// 	map.addLayer({
// 		'id': 'dsitrict_2_shenzhen_l',
// 		'source': 'areaSource',
// 		'source-layer': 'dsitrict_2_shenzhen_l',
// 		'type': 'line',
// 		'paint': {
// 			"line-color": "rgb(147,147,147)",
// 			'line-width': {
// 				'stops': [
// 					[11, 2],
// 					[22, 1.5]
// 				]
// 			},
// 		}
// 	})
	
});
