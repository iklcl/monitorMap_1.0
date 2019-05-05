map.on('load', function() {
		map.loadImage(getRootPath()+"Image/go.png", function(error, go) {
			if (error) throw error;
			map.addImage('go', go);
			map.addLayer({
						'id': 'go',
						'source': 'CLDSource',
						'source-layer':'ha_markingpoint',
						'filter':[
							'==',
							'functionco',
							'11030301'
						],
						'type': 'symbol',
						'minzoom':18.5,
						"layout": {
							"icon-image": "go",//图像源
							'symbol-placement':'point',//symbol位置，可选point，line，line-center,默认为point。
							////'symbol-spacing':250,//symbol间隔（单位：像素），默认250，symbol-placement必需为'line'。
							'symbol-avoid-edges':true,//symbol边缘规避？，默认为false。
							////控制同一图层重叠的symbol显示排序，默认'viewport-y'。'viewport-y'：按照屏幕y的位置排序；
							////"source":按照数据源排序。
							'symbol-z-order':'viewport-y',
							////跟随旋转，可选"map","viewport","auto",默认"auto";
							////"map":当'symbol-placement'为'point'时，图标与东西对齐；为其它时，图标X轴与线对齐
							////"viewport":与视口对齐。
							////"auto":当'symbol-placement'为'point'时,为"viewport"；其它时，为"map"
							"icon-rotation-alignment":"map",
							
							'icon-padding':0,
							'icon-ignore-placement':true,//是否忽略布局，默认false
							'icon-allow-overlap':true,//图标是否允许重叠，默认false
							'icon-rotate':['get','reangle'],//图标旋转角度（单位：度），正北为0度，顺时针旋转，默认值为0。
							// 'icon-rotate':80,
							//图标大小
							"icon-size": {
								'stops':[[18.5,0.02],[22,0.1]]
							},
						},
						"interactive":true
			})
		});
		map.loadImage(getRootPath()+"Image/goLeft.png", function(error, goLeft) {
			if (error) throw error;
			map.addImage('goLeft', goLeft);
			map.addLayer({
						'id': 'goLeft',
						'source': 'CLDSource',
						'source-layer':'ha_markingpoint',
						'filter':[
							'==',
							'functionco',
							'11030302'
						],
						'type': 'symbol',
						'minzoom':18.5,
						"layout": {
							"icon-image": "goLeft",
							'symbol-avoid-edges':true,
							"icon-rotation-alignment":"map",
							'icon-padding':0,
							'icon-ignore-placement':true,
							'icon-rotate':['get','reangle'],
							'icon-allow-overlap':true,
							"icon-size": {
								'stops':[[18.5,0.02],[22,0.1]]
							},
						},
						"interactive":true
			})
		});
		map.loadImage(getRootPath()+"Image/left.png", function(error, left) {
			if (error) throw error;
			map.addImage('left', left);
			map.addLayer({
						'id': 'left',
						'source': 'CLDSource',
						'source-layer':'ha_markingpoint',
						'filter':[
							'==',
							'functionco',
							'11030303'
						],
						'type': 'symbol',
						'minzoom':18.5,
						"layout": {
							"icon-image": "left",
							'symbol-avoid-edges':true,
							"icon-rotation-alignment":"map",
							'icon-padding':0,
							'icon-ignore-placement':true,
							'icon-rotate':['get','reangle'],
							'icon-allow-overlap':true,
							"icon-size": {
								'stops':[[18.5,0.02],[22,0.1]]
							},
						},
						"interactive":true
			})
		});
		map.loadImage(getRootPath()+"Image/right.png", function(error, right) {
			if (error) throw error;
			map.addImage('right', right);
			map.addLayer({
						'id': 'right',
						'source': 'CLDSource',
						'source-layer':'ha_markingpoint',
						'filter':[
							'==',
							'functionco',
							'11030304'
						],
						'type': 'symbol',
						'minzoom':18.5,
						"layout": {
							"icon-image": "right",
							'symbol-avoid-edges':true,
							"icon-rotation-alignment":"map",
							'icon-padding':0,
							'icon-ignore-placement':true,
							'icon-rotate':['get','reangle'],
							'icon-allow-overlap':true,
							"icon-size": {
								'stops':[[18.5,0.02],[22,0.1]]
							},
						},
						"interactive":true
			})
		});
		map.loadImage(getRootPath()+"Image/goRight.png", function(error, goRight) {
			if (error) throw error;
			map.addImage('goRight', goRight);
			map.addLayer({
						'id': 'goRight',
						'source': 'CLDSource',
						'source-layer':'ha_markingpoint',
						'filter':[
							'==',
							'functionco',
							'11030305'
						],
						'type': 'symbol',
						'minzoom':18.5,
						"layout": {
							"icon-image": "goRight",
							'symbol-avoid-edges':true,
							"icon-rotation-alignment":"map",
							'icon-padding':0,
							'icon-ignore-placement':true,
							'icon-rotate':['get','reangle'],
							'icon-allow-overlap':true,
							"icon-size": {
								'stops':[[18.5,0.02],[22,0.1]]
							},
						},
						"interactive":true
			})
		});
		map.loadImage(getRootPath()+"Image/turn.png", function(error, turn) {
			if (error) throw error;
			map.addImage('turn', turn);
			map.addLayer({
						'id': 'turn',
						'source': 'CLDSource',
						'source-layer':'ha_markingpoint',
						'filter':[
							'==',
							'functionco',
							'11030306'
						],
						'type': 'symbol',
						'minzoom':18.5,
						"layout": {
							"icon-image": "turn",
							'symbol-avoid-edges':true,
							"icon-rotation-alignment":"map",
							'icon-padding':0,
							'icon-ignore-placement':true,
							'icon-rotate':['get','reangle'],
							'icon-allow-overlap':true,
							"icon-size": {
								'stops':[[18.5,0.02],[22,0.1]]
							},
						},
						"interactive":true
			})
		});
		map.loadImage(getRootPath()+"Image/goTurn.png", function(error, goTurn) {
			if (error) throw error;
			map.addImage('goTurn', goTurn);
			map.addLayer({
						'id': 'goTurn',
						'source': 'CLDSource',
						'source-layer':'ha_markingpoint',
						'filter':[
							'==',
							'functionco',
							'11030307'
						],
						'type': 'symbol',
						'minzoom':18.5,
						"layout": {
							"icon-image": "goTurn",
							'symbol-avoid-edges':true,
							"icon-rotation-alignment":"map",
							'icon-padding':0,
							'icon-ignore-placement':true,
							'icon-rotate':['get','reangle'],
							'icon-allow-overlap':true,
							"icon-size": {
								'stops':[[18.5,0.02],[22,0.1]]
							},
						},
						"interactive":true
			})
		});
		map.loadImage(getRootPath()+"Image/leftTurn.png", function(error, leftTurn) {
			if (error) throw error;
			map.addImage('leftTurn', leftTurn);
			map.addLayer({
						'id': 'leftTurn',
						'source': 'CLDSource',
						'source-layer':'ha_markingpoint',
						'filter':[
							'==',
							'functionco',
							'11030308'
						],
						'type': 'symbol',
						'minzoom':18.5,
						"layout": {
							"icon-image": "leftTurn",
							'symbol-avoid-edges':true,
							"icon-rotation-alignment":"map",
							'icon-padding':0,
							'icon-ignore-placement':true,
							'icon-rotate':['get','reangle'],
							'icon-allow-overlap':true,
							"icon-size": {
								'stops':[[18.5,0.02],[22,0.1]]
							},
						},
						"interactive":true
			})
		});
		map.loadImage(getRootPath()+"Image/leftRight.png", function(error, leftRight) {
			if (error) throw error;
			map.addImage('leftRight', leftRight);
			map.addLayer({
				'id': 'leftRight',
				'source': 'CLDSource',
				'source-layer':'ha_markingpoint',
				'filter':[
					'==',
					'functionco',
					'11030309'
				],
				'type': 'symbol',
				'minzoom':18.5,
				"layout": {
					"icon-image": "leftRight",
					'symbol-avoid-edges':true,
					"icon-rotation-alignment":"map",
					'icon-padding':0,
					'icon-ignore-placement':true,
					'icon-rotate':['get','reangle'],
					'icon-allow-overlap':true,
					"icon-size": {
						'stops':[[18.5,0.02],[22,0.1]]
					},
				},
				"interactive":true
			})
		});
		
// 		map.loadImage('http://127.0.0.1:8848/xiangmihu/Image/trafficSignal_h.png', function(error, trafficSignal_h) {
// 			if (error) throw error;
// 			map.addImage('trafficSignal_h', trafficSignal_h);
// 			map.addLayer({
// 						'id': 'trafficSignal_h',
// 						'source': 'CLDSource',
// 						'source-layer':'attachp',
// 						'filter':[
// 							'all',
// 							["==",'attachedty',1],
// 							['==','modelnumbe',64201003]
// 						],
// 						'type': 'symbol',
// 						'minzoom':18.5,
// 						"layout": {
// 							"icon-image": "trafficSignal_h",
// 							'symbol-avoid-edges':true,
// 							"icon-rotation-alignment":"map",
// 							'icon-padding':0,
// 							'icon-ignore-placement':true,
// 							'icon-rotate':['get','caangle'],
// 							'icon-allow-overlap':true,
// 							"icon-size": {
// 								'stops':[[18.5,0.02],[22,0.1]]
// 							},
// 						},
// 						"interactive":true
// 			});
// 		});
// 		map.loadImage('http://127.0.0.1:8848/xiangmihu/Image/lamp.png', function(error, lamp) {
// 			if (error) throw error;
// 			map.addImage('lamp', lamp);
// 			map.addLayer({
// 						'id': 'lamp',
// 						'source': 'CLDSource',
// 						'source-layer':'attachp',
// 						'filter':[
// 							'==',
// 							'attachedty',
// 							2
// 						],
// 						'type': 'symbol',
// 						'minzoom':17,
// 						"layout": {
// 							"icon-image": "lamp",
// 							'symbol-avoid-edges':true,
// 							"icon-rotation-alignment":"map",
// 							////默认'center',可选'left','right','top','bottom','top-left','top-right','bottom-left','bottom-right'
// 							'icon-anchor':'bottom',
// 							'icon-padding':0,
// 							'icon-ignore-placement':true,
// 							'icon-keep-upright':true,
// 							// 'icon-rotate':['get','caangle'],
// 							'icon-allow-overlap':true,
// 							"icon-size": {
// 								'stops':[[17,0.1],[22,0.3]]
// 							},
// 						},
// 						"interactive":true
// 			});
// 		});
})

// function CaAngle(angle){
// 	if(angle>=0&&angle<=360)
// 	{
// 		var reAngle = angle+90;
// 		if(reAngle<=360){
// 			return reAngle;
// 		}
// 		else{
// 			reAngle = reAngle-360;
// 			return reAngle;
// 		}
// 	}
// }

// var angle = map.getLayoutProperty('go','icon-rotate');
// 
//  map.setLayoutProperty('go','icon-rotate',CaAngle(angle));
