function cul(ab) {
	var vaX = ab.x * 20037508.34 / 180;
	var vaY1 = Math.log(Math.tan((90 + ab.y) * Math.PI / 360)) / (Math.PI / 180);
	var vaY = vaY1 * 20037508.34 / 180;
	var result = {
		'x': vaX,
		'y': vaY
	}
	return result;
}

function calculate(item) {
	var A = cul({
		"x": (item.A)[0],
		"y": (item.A)[1]
	});
	var B = cul({
		"x": (item.B)[0],
		"y": (item.B)[1]
	});
	var reangle;
	var ab = {
		"y": B.y - A.y,
		"x": B.x - A.x
	};
	if (ab.x <= 0 & ab.y >= 0) {
		reangle = 450 - (180 / Math.PI * Math.atan2(ab.y, ab.x))
	} else {
		reangle = 90 - (180 / Math.PI * Math.atan2(ab.y, ab.x));
	}
	// reangle = reangle+180;
	if (reangle >= 360) {
		reangle = reangle -360;
	}
	return reangle;
}


function Car(item) {

	//路线坐标
	this.coordinates = item.coordinates; //[[114.05241295632942,22.53988188287974],
	// 					[114.05221967133855,22.539878084577623],
	// 					[114.05218594929056,22.53986668964926],
	// 					[114.05071410837286,22.539831745347968],
	// 					[114.05060718476773,22.539866689799382],
	// 					[114.05043117204468,22.539869728441317],
	// 					[114.05033576329248,22.539922904760843],
	// 					[114.05030368619703,22.540018622082272],
	// 					[114.05029217077345,22.54020186399147]]

	//车初始坐标
	this.origin = item.origin //[114.05241295632942,22.53988188287974];
	this.testname = item.information.testname; // "firstTest"	;
	this.teststate = item.information.teststate; //"正常";
	this.Pointid = item.infoCar.Pointid; // "point1";
	// this.Pointsour = item.infoCar.Pointsour; // "pointsour1";
	this.Routeid = item.infoRoute.Routeid; // "route1";
	this.Routesour = item.infoRoute.Routesour; //"routesour1";
	this.carid = item.information.carid;
	this.driver =item.information.driver;
        this.driverphone=item.information.driverphone;
        // this.steward  =item.information.steward,
        this.starttime  =item.information.starttime;
        this.endtime  =item.information.endtime;
        this.cartype  =item.information.cartype;
        this.team  =item.information.team;
		this.terminalid=item.information.terminalid;
	this.company = item.information.company
}
Car.prototype.run = function() {
	// var linedata = [origin];
	var coordinates = this.coordinates;
	var carid = this.carid;
	//车初始坐标
	var origin = this.origin
	var testname = this.testname;
	var teststate = this.teststate;
	var Pointid = this.Pointid;
	var Pointsour = "source"+Pointid;
	var Routeid = this.Routeid;
	var Routesour = this.Routesour;
	var reangle = 90;
	var driver=this.driver;
	var driverphone=this.driverphone;
	var steward=this.steward;
	var starttime=this.starttime;
	var endtime=this.endtime;
	var cartype=this.cartype;
	var team=this.team;
	var terminalid=this.terminalid;
	var company = this.company;


	//路线数据
	var route = {
		"type": "FeatureCollection",
		"features": [{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [],
			}
		}]
	};
	//路线数据
	// var coordinates_line = [origin];
	// var route_line = {
	// 	"type": "FeatureCollection",
	// 	"features": [{
	// 		"type": "Feature",
	// 		"geometry": {
	// 			"type": "LineString",
	// 			"coordinates": [],
	// 		}
	// 	}]
	// };
	//点数据
	var point = {
		"type": "FeatureCollection",
		"features": [{
			"type": "Feature",
			"properties": {
				"name": testname,
				"state": teststate,
				"carid": carid,
				"layerid": Pointid,
				"driver":driver,
				"driverphone":driverphone,
				"starttime":starttime,
				"endtime":endtime,
				"cartype":cartype,
				"team":team,
				"terminalid":terminalid,
				"company":company,
				"mileage" : "",
				"Speed" :"",
				"alarm":"无报警"
				// "angle":reangle,
			},
			"geometry": {
				"type": "Point",
				"coordinates": origin,

			}
		}]
	};
	if (!map.getSource(Pointsour)) {
		map.addSource(Pointsour, {
			type: 'geojson',
			'data': point
		})
	}

	// map.loadImage(getRootPath() + "Image/car.png", function(error, carimg) {
	// 	if (error) throw error;
	// 	if ( !map.hasImage('carimg' + Pointid)) {
     //    map.addImage('carimg' + Pointid, carimg);
	// 	}
		//添加点图层
		if (map.getLayer(Pointid) == undefined) {
			map.addLayer({
				'id': Pointid,
				'source': Pointsour,
				// 'maxzoom':,
				"type": "circle",
				'minzoom': 15,
				"paint": {
				"circle-radius": 10,
				"circle-color": "#C9021F"
				},
				// "layout": {
					// "icon-image": "carimg" + Pointid,
					// "icon-rotate": reangle,
					// "icon-rotation-alignment": "map",
					// "icon-allow-overlap": true,
					// "icon-ignore-placement": true,
					// "icon-size": {
					// 	'stops': [
					// 		[17.5, 0.05],
					// 		[20, 0.25],
					// 		[24, 1]
					// 	]
					// },
				// }
			});
			runEvery10Sec();
		}
	// })
	//添加路线路层
	if (!map.getSource(Routesour)) {
	map.addSource(Routesour, {
		"type": "geojson",
		"data": route
	});}
	var steps = 72;//把路线分割
	function splitRoute() {
		var lineDistance = turf.lineDistance(route.features[0], 'kilometers');
		var arc = [];
		for (var i = 0; i < lineDistance; i += lineDistance / steps) {
			var segment = turf.along(route.features[0], i, 'kilometers');
			arc.push(segment.geometry.coordinates);
		}
		route.features[0].geometry.coordinates = arc;
    }
	if (map.getLayer( Routeid ) == undefined) {
	map.addLayer({
		"id": Routeid,
		"source": Routesour,
		"type": "line",
		"paint": {
			"line-width": 2,
			"line-color": "#007cbf",
			'line-opacity': {
				'stops': [
					[17, 0],
					[18, 0]
				]
			}
		},
		"layout": {
			"line-join": "round",
			/* 线条相交的形状 */
			"line-cap": "round" /* 线条末端形状 */
		}
	});
	}
	var counter = 0;
	var isStop = true;
	function animate() {
		var lat = route.features[0].geometry.coordinates[counter];
		var oldlat = point.features[0].geometry.coordinates;
		if(lat!=undefined){
		point.features[0].geometry.coordinates = lat;

		if(map.getLayer(Pointid) != undefined){
			// map.setLayoutProperty(Pointid, 'icon-rotate', reangle);
			map.getSource(Pointsour).setData(point);}
		}
		// map.getSource(Routesour + "line").setData(route_line)
		if (counter < steps - 1) {
			isStop = false;
			requestAnimationFrame(animate);
		} else {
			// isStop = true;
			// map.setPaintPr
			// operty(Routeid,'line-opacity',1)
		}
		counter = counter + 1;
	}

	var oldCoordinates=[];
	var oldCoordinate;
	// var linedata=[];
    var i =0;
	function runEvery10Sec() {
		if(point.features[0].properties.state!="在线"){
			if (map.getLayer( Routeid ) != undefined) { map.removeLayer(Routeid)};
			return;
		}
		var tag = point.features[0].properties;
        $.post('/pointlat/', {'terminalid': tag.terminalid,'i':i}, function (data) {
        		if(data=='{}'){
        			// point.features[0].properties.state="离线"
        			if (map.getLayer( Routeid ) != undefined) { map.removeLayer(Routeid)};
        			return;
				}
        		var datas= JSON.parse(data);
				oldCoordinate=datas["coordinates"];
        		i++;
				if(i==600){datas.accstate='false' }
        		oldCoordinates.push(oldCoordinate)
				if(oldCoordinates.length>2)
				{oldCoordinates.shift(oldCoordinates[0]);
				route.features[0].geometry.coordinates = oldCoordinates;
				splitRoute();
				}
				else{
        			oldCoordinates.push(oldCoordinate);
        			route.features[0].geometry.coordinates = oldCoordinates;
				}
				point.features[0].properties.mileage = datas["mileage"];
				point.features[0].properties.Speed = datas["speed"];
				if(datas["alarm"]!="无报警"){
					point.features[0].properties.alarm = datas["alarm"];
					document.getElementById("info"+tag.layerid).style.setProperty('box-shadow','0 0 8px 0px #C60000','important');
				}
				else{
					if(map.getLayer(Pointid) != undefined){
					document.getElementById("info"+tag.layerid).style.setProperty('box-shadow','none','important');}
				}
				map.getSource(Routesour).setData(route);
				// map.setPaintProperty(Routeid, 'line-opacity', 0);
				counter = 0;
				reangle = calculate({
						"A": oldCoordinates[1],
						"B": oldCoordinates[0]
					});
				if(map.getLayer(Pointid) != undefined){
				// map.setLayoutProperty(Pointid, 'icon-rotate', reangle);
				}
				animate(counter);
				if(datas.accstate=='true' && map.getLayer(Pointid) != undefined){
					setTimeout(runEvery10Sec,1000);
				}
				else{
					isStop = true;
					// console.log(linedata)
				}

				});
			}
	//请求
	runEvery10Sec();
	// Start the animation.
	//鼠标交互
	var timer;
	//鼠标移上去变指
	map.on('mouseenter', Pointid, function() {
		map.getCanvas().style.cursor = 'pointer';
	});

	// 鼠标移开
	map.on('mouseleave', Pointid, function() {
		map.getCanvas().style.cursor = '';
	});

	// 	var i = 0;
	// 	var timer = window.setInterval(function() {
	// 	if (i < coordinates.length) {
	// 	data.features[0].geometry.coordinates.push(coordinates[i]);
	// 	map.getSource('trace').setData(data);
	// 	map.panTo(coordinates[i]);
	// 	i++;
	// 	} else {
	// 	window.clearInterval(timer);
	// 	}
	// 	}, 10);
	//点击事件,显示详情
	var clickfunction = function(e) {
		var features = map.queryRenderedFeatures(e.point, {
			layers: [Pointid]
		});
		var Isstop = 0;
		var popup = new mapboxgl.Popup({
			offset: 25,
			className: 'my-class'
		});
		if (features.length && map.getLayer(Pointid) != undefined) {
			map.flyTo({
				center: point.features[0].geometry.coordinates
			});
			popup.setLngLat(features[0].geometry.coordinates)
				.setHTML('<h3>' + features[0].properties.name + '</h3><h4>' + features[0].properties.alarm + '</h4>')
				.addTo(map);
			Isstop = 1;
		} else {
			Isstop = 0;
		}
		function fn(){
			if (Isstop && !isStop) {
				// map.flyTo({
				// 	center: point.features[0].geometry.coordinates
				// });
				popup.setLngLat(point.features[0].geometry.coordinates);
				timer = requestAnimationFrame(fn);
			}
		};
		fn();
	};
	map.on('click',Pointid,clickfunction);
	var soursmark = map.getSource(Pointsour);
	buildLocationList(point);
}
