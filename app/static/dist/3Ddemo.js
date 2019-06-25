/**
 * Created by Administrator on 2019/4/12.
 */
// var t = {'招商银行大厦':[114.017529068038,22.5397032116539],'深圳市民中心':[114.054553055999,22.5465209543314],
//           '深圳特区报业大厦':[114.0404452885,22.5434531865936],
//           '上海宾馆':[114.076861000803,22.5438641519901],
//           '赛格广场':[114.082389613698,22.5440827210009],
//           '地王大厦':[114.104640824898,22.545034137623],
//           '益田假日广场':[113.97018719762, 22.54058136089],
//           '平安银行大厦':[114.102532219698,22.5432355980683],
//           '世界之窗':[113.970133347076,22.5385868802799],
//           '邓小平画像':[114.099036416699,22.5440607069962],
//           '广电大厦':[114.046041844046,22.5441516026726],
//           'NEO企业大厦':[114.025130079834,22.5387785567377],
//          '东海国际公寓':[114.014337485153,22.5391054988317],
// 	'74403001':[114.017529068038,22.5397032116539],
// '74403005':[114.054553055999,22.5465209543314],
//           '74403007':[114.0404452885,22.5434531865936],
//           '74403009':[114.076861000803,22.5438641519901],
//           '74403010':[114.082389613698,22.5440827210009],
//           '74403013':[114.104640824898,22.545034137623],
//           '74403025':[113.97018719762, 22.54058136089],
//           '74403045':[114.102532219698,22.5432355980683],
//           '74403047':[113.970133347076,22.5385868802799],
//           '74403051':[114.099036416699,22.5440607069962],
//           '74403077':[114.046041844046,22.5441516026726],
//           '74403248':[114.025130079834,22.5387785567377],
//          '74403254':[114.014337485153,22.5391054988317],
var t = {
    '74403001': [114.017529068038, 22.5397032116539], '74403005': [114.054553055999, 22.5465209543314],
    '74403007': [114.0404452885, 22.5434531865936],
    '74403009': [114.076861000803, 22.5438641519901],
    '74403010': [114.082389613698, 22.5440827210009],
    '74403013': [114.104640824898, 22.545034137623],
    '74403025': [113.97018719762, 22.54058136089],
    '74403045': [114.102532219698, 22.5432355980683],
    '74403047': [113.970133347076, 22.5385868802799],
    '74403051': [114.099036416699, 22.5440607069962],
    // '74403077':[114.046041844046,22.5441516026726],
    '74403248': [114.025130079834, 22.5387785567377],
    '74403254': [114.014337485153, 22.5391054988317],
}
var fromLL = function (lon, lat) {
    // derived from https://gist.github.com/springmeyer/871897
    var extent = 20037508.34;
    var x = lon * extent / 180;
    var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * extent / 180;

    return [(x + extent) / (2 * extent), 1 - ((y + extent) / (2 * extent))];
}
const THREE = window.THREE;
class CustomLayer {
    constructor(iDIndex, lng) {
        this.lng = lng;
        this.minzoom = 16;
        this.id = 'custom_layer_building' + iDIndex;
        this.type = 'custom';
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambientLight);
        var object;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath(getRootPath() + '3Ddemo/' + iDIndex + '/');
        mtlLoader.load(iDIndex + '.mtl', (function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath(getRootPath() + '3Ddemo/' + iDIndex + '/');
            objLoader.load(iDIndex + '.obj', (function (obj) {
                obj.scale.set(0.006, 0.005, 0.005);
                this.scene.add(obj);
            }).bind(this));
        }).bind(this));
    }

    onAdd(map, gl) {
        this.map = map;
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl
        });
        this.renderer.autoClear = false;
    }

    render(gl, matrix) {
        this.translate = fromLL(this.lng[0], this.lng[1]);
        this.transform = {
            translateX: this.translate[0],
            translateY: this.translate[1],
            translateZ: 0,
            rotateX: Math.PI / 2,
            rotateY: 0,
            rotateZ: 0,
            scale: 50.41843220338983e-7 //设置模型大小
        }
        const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), this.transform.rotateX);
        const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), this.transform.rotateY);
        const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), this.transform.rotateZ);

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4().makeTranslation(this.transform.translateX, this.transform.translateY, this.transform.translateZ)
            .scale(new THREE.Vector3(this.transform.scale, -this.transform.scale, this.transform.scale))
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

        this.camera.projectionMatrix.elements = matrix;
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
}

map.on('load', function () {
    var dataroot = "static/dist/json/three_3d.json";
    $.getJSON(dataroot, function (data) {
        var HA_Attachment2 = data[1];
        var HA_Attachment1 = data[0];
        var HA_POI=data[2];
        map.addLayer({
            id: "custom_layer_H",
            type: "custom",
            onAdd: function (e, t) {
                window.threebox = new Threebox(e);
                window.threebox.setupDefaultLights();
                var i = window.threebox.addSymbolLayer({
                        id: "red_green_lamp",
                        source: HA_Attachment1,
                        modelName: {
                            property: "ModelNumbe"
                        },
                        modelDirectory: getRootPath()+"3Ddemo/64201003/",
                        rotation: {generator: e => new THREE.Euler(Math.PI / 2, 0, (e.properties["Angle"] + 90) * Math.PI / 180 + Math.PI / 2, "ZXY")},
                        scale:1,
                        scaleWithMapProjection: true,
                        key: {property: "Attachment"}
            });
                var n = window.threebox.addSymbolLayer({
                        id: "road_lamp",
                        source: HA_Attachment2,
                        modelName: {
                            property: "ModelNumbe"
                        },
                        modelDirectory: getRootPath()+"3Ddemo/64201003/",
                        rotation: {generator: e => new THREE.Euler(Math.PI / 2, 0, (e.properties["Angle"] + 90) * Math.PI / 180 + Math.PI / 2, "ZXY")},
                        scale:1.5,
                    scaleWithMapProjection:true,
                    key:{
                    property: "Attachment"}
            });
                 var i = window.threebox.addSymbolLayer({
                        id: "poi_bus",
                        source: HA_POI,
                        modelName: "20190514",
                        modelDirectory: getRootPath()+"3Ddemo/20190514/",
                        rotation: {generator: e => new THREE.Euler(Math.PI / 2, 0, (e.properties["Angle"] + 90) * Math.PI / 180 + Math.PI / 2, "ZXY")},
                        scale:1.4,
                        scaleWithMapProjection: true,
                        key: {property: "POIUID"}
            });
            },
            render: function (e, t) {
                window.threebox.update(true)
            }
        })
    })
    	//公交站名称
		map.addLayer({
				'id': 'text_busstation',
				'source': 'areaSource',
				'source-layer':'poi_bus',
				'type': 'symbol',
				'minzoom':18,
				// 'maxzoom':18,
				"layout": {
					"icon-image": "point",
					'text-field':"{name}",
					'text-size':14,
					'text-font':["MicrosoftYaHeiRegular"],
					'text-anchor':'top',
                    'text-offset':{
                            "stops": [
                                [17, [0,0.5]],
                                [20, [0,3]]
                            ],
                        },

				},
				'paint': {
					'text-color':'rgb(124,76,174)',
					'text-halo-color':'rgb(245,245,245)',
					'text-halo-width':1,
					'text-halo-blur':1,
                    'text-translate':[0,0],
                     'text-translate-anchor':'map'
				},
	})
})
map.on('load', function () {
    for (var index in t) {
        map.addLayer(new CustomLayer(index, t[index]))
    }
    ;
})
map.on('zoom', function () {
    if (map.getZoom() < 16) {

        for (var index in t) {
            map.setLayoutProperty('custom_layer_building' + index, 'visibility', 'none');
        }
    } else {

        for (var index in t) {
            map.setLayoutProperty('custom_layer_building' + index, 'visibility', 'visible');
        }
    }
    if(map.getZoom()<17){
         map.setLayoutProperty('custom_layer_H', 'visibility', 'none');
    }
    else{
        map.setLayoutProperty('custom_layer_H', 'visibility', 'visible');
    }
});
   document.getElementById('date').valueAsDate = new Date();
    map.on('load', function() {list_car();});

// map.on('load', function () {
// for(var index in t){
// map.addLayer({
// 		'id': 'custom'+index,
// 		'type': 'custom',
// 		onAdd: function(map, gl) {
// 			var object;
// 			renderer = new THREE.WebGLRenderer({
// 				canvas: map.getCanvas(),
// 				context: gl
// 			});
// 			camera = new THREE.Camera();
// 			scene = new THREE.Scene();
// 			var ambientLight = new THREE.AmbientLight(0xffffff);
// 			scene.add(ambientLight);
// 			var mtlLoader = new THREE.MTLLoader();
// 			mtlLoader.setPath(getRootPath() + '3Ddemo/'+index+'/');
// 			mtlLoader.load(index+'.mtl', function(materials) {
// 				materials.preload();
// 				var objLoader = new THREE.OBJLoader();
// 				objLoader.setMaterials(materials);
// 				objLoader.setPath(getRootPath() + '3Ddemo/'+index+'/');
// 				objLoader.load(index+'.obj', function(object) {
// 				    object.scale.set(0.006, 0.005, 0.005);
// 					scene.add(object);
// 				});
// 			});
// 			renderer.autoClear = false;
// 		},
// 		render: function(gl, matrix) {
// 			// threebox.update(true);
// 			this.translate = fromLL(t[index][0], t[index][1]);
// 			this.transform = {
// 				translateX: this.translate[0],
// 				translateY: this.translate[1],
// 				translateZ: 0,
// 				rotateX: Math.PI / 2,
// 				rotateY: 0,
// 				rotateZ: 0,
// 				scale: 50.41843220338983e-7 //设置模型大小
// 			}
// 			const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), this.transform.rotateX);
// 			const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), this.transform.rotateY);
// 			const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), this.transform.rotateZ);
// 			const m = new THREE.Matrix4().fromArray(matrix);
// 			const l = new THREE.Matrix4().makeTranslation(this.transform.translateX, this.transform.translateY,
// 					this.transform
// 					.translateZ)
// 				.scale(new THREE.Vector3(this.transform.scale, -this.transform.scale, this.transform.scale))
// 				.multiply(rotationX)
// 				.multiply(rotationY)
// 				.multiply(rotationZ);
// 			camera.projectionMatrix.elements = matrix;
// 			camera.projectionMatrix = m.multiply(l);
// 			renderer.state.reset();
// 			renderer.render(scene, camera);
// 			map.triggerRepaint();
// 		}
// 	});}

// 			map.addLayer({
// 				'id': 'custom74403001',
// 				'type': 'custom',
// 				onAdd: function(map, gl) {
// 					var object;
// 					renderer = new THREE.WebGLRenderer({
// 						canvas: map.getCanvas(),
// 						context: gl
// 					});
// 					camera = new THREE.Camera();
// 					scene = new THREE.Scene();
// 					var ambientLight = new THREE.AmbientLight(0xffffff);
// 					scene.add(ambientLight);
// 					var mtlLoader = new THREE.MTLLoader();
// 					mtlLoader.setPath(getRootPath() + '3Ddemo/74403001/');
// 					mtlLoader.load('74403001.mtl', function(materials) {
// 						materials.preload();
// 						var objLoader = new THREE.OBJLoader();
// 						objLoader.setMaterials(materials);
// 						objLoader.setPath(getRootPath() + '3Ddemo/74403001/');
// 						objLoader.load('74403001.obj', function(object) {
// 						    object.scale.set(0.006, 0.005, 0.005);
// 							scene.add(object);
// 						});
// 					});
// 					renderer.autoClear = false;
// 				},
// 				render: function(gl, matrix) {
// 					// threebox.update(true);
// 					this.translate = fromLL(114.017529068038,22.5397032116539);
// 					this.transform = {
// 						translateX: this.translate[0],
// 						translateY: this.translate[1],
// 						translateZ: 0,
// 						rotateX: Math.PI / 2,
// 						rotateY: 0,
// 						rotateZ: 0,
// 						scale: 50.41843220338983e-7 //设置模型大小
// 					}
// 					const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), this.transform.rotateX);
// 					const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), this.transform.rotateY);
// 					const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), this.transform.rotateZ);
// 					const m = new THREE.Matrix4().fromArray(matrix);
// 					const l = new THREE.Matrix4().makeTranslation(this.transform.translateX, this.transform.translateY,
// 							this.transform
// 							.translateZ)
// 						.scale(new THREE.Vector3(this.transform.scale, -this.transform.scale, this.transform.scale))
// 						.multiply(rotationX)
// 						.multiply(rotationY)
// 						.multiply(rotationZ);
// 					camera.projectionMatrix.elements = matrix;
// 					camera.projectionMatrix = m.multiply(l);
// 					renderer.state.reset();
// 					renderer.render(scene, camera);
// 					map.triggerRepaint();
// 				}
// 			});
// })