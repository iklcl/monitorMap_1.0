map.on('load',function(){
	map.addSource(
	'CLDSource15', {
		'type': 'vector',
		'scheme': 'tms',
		'tiles': [
			'http://localhost:8070/geoserver/gwc/service/tms/1.0.0/route%3Aroute@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
		]
	}
	);
	//被压盖线
			map.addLayer({
				'id':'road1_',//1:1000万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',1],
				'type':'line',
				'minzoom':4.6,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					'line-width':{
							'stops':[[10,1.2],[17,15]]
					},
	
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				},
				'layout':{
					'line-cap':'round'
				},
			})
			map.addLayer({
						'id':'road1',//1:1000万
						'source': 'CLDSource15',
						'source-layer':'m_roadfilter_jwl',
						'filter':['==','showgrade',1],
						'type':'line',
						'minzoom':4.6,
						'maxzoom':17.5,
						'paint':{
							'line-color':'#F9F9F9',
							'line-width':{
									'stops':[[10,1.2],[17,14.6]]
							},
			
							// 'line-opacity':{'stops':[[17,1],[18,0]]},	
						},
						'layout':{
							'line-cap':'round'
						},
					})
			map.addLayer({
				'id':'road2_',//1:500万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',2],
				'type':'line',
				'minzoom':5.6,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					'line-width':{
							'stops':[[10,1.2],[17,15]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road2',//1:500万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',2],
				'type':'line',
				'minzoom':5.6,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[10,1],[17,14.6]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road3_',//1:250万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',3],
				'type':'line',
				'minzoom':6.6,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					'line-width':{
							'stops':[[10,1.2],[17,15]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road3',//1:250万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',3],
				'type':'line',
				'minzoom':6.6,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[10,1],[17,14.6]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road4_',//1:100万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',4],
				'type':'line',
				'minzoom':8,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					'line-width':{
							'stops':[[10,1.2],[17,15]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road4',//1:100万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',4],
				'type':'line',
				'minzoom':8,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[10,1],[17,14.6]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road5_',//1:50万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',5],
				'type':'line',
				'minzoom':9,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					'line-width':{
							'stops':[[10,1.2],[17,15]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road5',//1:50万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',5],
				'type':'line',
				'minzoom':9,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[10,1],[17,14.6]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road6_',//1:25万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',6],
				'type':'line',
				'minzoom':10,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					'line-width':{
							'stops':[[10,1.2],[17,15]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road6',//1:25万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',6],
				'type':'line',
				'minzoom':10,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[10,1],[17,14.6]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road7_',//1:8.3万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['in','showgrade',7,8],
				'type':'line',
				'minzoom':11,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					'line-width':{
							'stops':[[11,1.5],[17,13]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road7',//1:8.3万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['in','showgrade',7,8],
				'type':'line',
				'minzoom':11,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[11,1.3],[17,12.6]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			
			map.addLayer({
				'id':'road9_',//1:4万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',9],
				'type':'line',
				'minzoom':12,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[12,2.3],[17,10.6]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road9',//1:4万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',9],
				'type':'line',
				'minzoom':12,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[12,2],[17,10]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			
			map.addLayer({
				'id':'road10_',//1:2万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',10],
				'type':'line',
				'minzoom':13.5,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					'line-width':{
							'stops':[[13.5,3.5],[17,9.4]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road10',//1:2万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',10],
				'type':'line',
				'minzoom':13.5,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[13.5,3],[17,9]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road11_',//1:1万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',11],
				'type':'line',
				'minzoom':14.5,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					'line-width':{
							'stops':[[14.5,4.4],[17,8.6]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road11',//1:1万
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['==','showgrade',11],
				'type':'line',
				'minzoom':14.5,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					'line-width':{
							'stops':[[14.5,4],[17,8]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road12_',//1:5000
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['in','showgrade',12,13],
				'type':'line',
				'minzoom':15.5,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#C6C5C5',
					// 'line-color':'rgb(255,255,255)',
					'line-width':{
							'stops':[[15.5,6.6],[17,7.7]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})
			map.addLayer({
				'id':'road12',//1:5000
				'source': 'CLDSource15',
				'source-layer':'m_roadfilter_jwl',
				'filter':['in','showgrade',12,13],
				'type':'line',
				'minzoom':15.5,
				'maxzoom':17.5,
				'paint':{
					'line-color':'#F9F9F9',
					// 'line-color':'rgb(255,255,255)',
					'line-width':{
							'stops':[[15.5,6],[17,7]]
					},
					// 'line-opacity':{'stops':[[17,1],[18,0]]},	
				}
			})

})