var coordinatesY = [
	{"x":114.0505578,"y":22.539804},
	{"x":114.0481382,"y":22.539745},
	{"x":114.045545,"y":22.53965},
	{"x":114.044699,"y":22.53943},
	{"x":114.0461335,"y":22.539453},
	{"x":114.048207764,"y":22.5395},
	{"x":114.0503912,"y":22.53953848}
];
function DynamicPoint(x,y){
	return{
		"type":'Point',
		"coordinates":[x,y]
	};
}

map.on('load',function(){
				
					map.addSource('point',{
						'type':'geojson',
						'data':DynamicPoint(114.0505578,22.539804)
					})
					map.addLayer({
						'id':'point',
						'source':'point',
						'type':'circle',
						'paint':{
							'circle-radius':10,
							'circle-color':'red'
						}
					});
					var i = 0;
					function DynamicP(){
						if(i<7){
							map.getSource('point').setData(DynamicPoint(coordinatesY[i].x,coordinatesY[i].y));
							i++;
						}
					}
					setInterval(DynamicP(),1000);
					})
// 					function animateMarker(timestamp) {
// 						var i = 0;
// 						do{
// 							i++;
// 							map.getSource('point').setData(DynamicPoint(coordinatesY[i].x,coordinatesY[i].y));
// 						}
// 						while 
// 					}
				// animateMarker(0);
// 				function TimeStamp(timestamp){
// 					if(timestamp%1000 ===0){
// 						
// 					}
// 				}
				
// 										map.getSource('point').setData(DynamicPoint());
// 				
// 										requestAnimationFrame(animateMarker);