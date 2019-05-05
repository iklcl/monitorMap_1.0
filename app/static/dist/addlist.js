function test() {
       //实例化点线运动
    var car1 = new Car({
        //路线坐标
        //车初始坐标
        "origin": [114.05241295632942, 22.53988188287974],
        "information": {
            "testname": "firstTest",
            "teststate": "在线"
        },
        "infoCar": {
            "Pointid": "point10",
            "Pointsour": "pointsour10"
        },
        "infoRoute": {
            "Routeid": "route10",
            "Routesour": "routesour10"
        },
    });
    car1.run(); //生成
    var car2 = new Car({
        //路线坐标
        //车初始坐标
        "origin": [114.04957037866654, 22.540160458083406],
        "information": {
            "testname": "secondTest",
            "teststate": "离线"
        },
        "infoCar": {
            "Pointid": "point20",
            "Pointsour": "pointsour20"
        },
        "infoRoute": {
            "Routeid": "route20",
            "Routesour": "routesour20"
        },
    });
    car2.run(); //生成

}


// function tankuang(data) {
//     $("#msg").remove();
//     var html =
//         '<div class="alert alert-success" id="msg" role="alert" style=" position:fixed;left:19%"><strong>' + data + '</strong> </div>'
//     $("body").append(html);
//     var t = setTimeout(next, 1000);
//
//     function next() {
//         $("#msg").remove();
//     }
// }
var DataList=[];
//数据获取生成列表
function showList(datas) {
    // test();
    for (i = 0; i < datas.length; i++) {
        data = datas[i];
        var car = new Car({
            //路线坐标
            "coordinates": [
            ],
            //车初始坐标
            "origin": [],
            "information":
                {
                "testname": data.carname,
                "teststate": data.carstate,
                "carid": data.id,
                "driver" :data.driver,
                "driverphone":data.driverphone,
                "steward" :data.steward,
                "starttime" :data.starttime,
                "endtime" :data.endtime,
                "cartype" :data.cartype,
                "team" :data.team,
                "terminalid":data.terminalid,
                "company":data.company
            },
            "infoCar": {
                "Pointid": "point" + i,
                "Pointsour": "pointsour" + i
            },
            "infoRoute": {
                "Routeid": "route" + i,
                "Routesour": "routesour" + i
            },
        });
        DataList.push(car)
        car.run(); //生成
    }
}
//搜索功能
function search() {
    if (event.keyCode == 13) {
        var keyword = document.getElementById('search').value;
        var listings = document.getElementById('overlay');
        var data = keyword.replace(/\s*/g, "").toLowerCase();
        for (i = 0; i < listings.children.length; i++) {
            var item = listings.children[i];
            var text = item.firstElementChild.firstElementChild.innerText.replace(/\s*/g, "").toLowerCase();
            if (data == "") {
                item.style.display = 'block';
            }
            else if (data != text) {
                item.style.display = 'none';
            }
            else {
                item.style.display = 'block';
            }
        }
    }
}
//车辆列表
function list_car() {
     // var layerlist = document.getElementById('layerid')
    // document.getElementById('overlay').innerHTML = '';
    $.get('/js_get/', {'method': 'GET'}, function (data) {
        var arrayId = []
         $("input[id^='layerid']").each(function(){
            arrayId.push($(this).val());
            map.removeLayer($(this).val());
            map.removeImage('carimg' +$(this).val());
            map.removeSource("source"+$(this).val());
        });
        $("#overlay").empty();
        datas = JSON.parse(data);
        showList(datas);
        $('#showNumber').text(datas.length+'辆');
    })
}

//导入车信息
function buildLocationList(data) {
    var currentFeature = data.features[0];
    var prop = currentFeature.properties;
    var listings = document.getElementById('overlay');
    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';
    listing.id = "listing-" + 1;
    var listing1 = listing.appendChild(document.createElement('div'));
    listing1.innerHTML='<input type="hidden" id="layerid"  value="'+ prop.layerid+'"> '
    listing1.className = 'item1';
    var link = listing1.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.dataPosition = 0;
    link.innerHTML = prop.name;
    var link1 = listing1.appendChild(document.createElement('a'));
    link1.href = '#';
    link1.className = 'info';
    link1.innerHTML = '<span class="glyphicon glyphicon-menu-hamburger" id="info'+ prop.layerid+'" aria-hidden="true"></span>';
    //显示车信息
    link1.addEventListener('click', function (e) {
        var infoWindow = document.getElementById('hide');
        infoWindow.style.display = 'block';
        var ahref = document.getElementById('ahref');
        ahref.href = "/write/" +prop.terminalid ;
        var inputName = document.getElementById('focusedInput');
        inputName.innerHTML = prop.name;
         var inputterminalid= document.getElementById('terminalid');
        inputterminalid.innerHTML = prop.terminalid;
        $("#history").empty();
        var mileage = document.getElementById('Mileage');
        mileage.innerHTML = prop.mileage;
        var speed = document.getElementById('Speed');
        speed.innerHTML = prop.Speed;
        var changeState = document.getElementById('changeState');
        changeState.value = prop.state;
        var waring = document.getElementById('waring');
        waring.innerHTML =  prop.alarm;
        var inputdriver = document.getElementById('driver');
        inputdriver.innerHTML = prop.driver;
        var inputPhone = document.getElementById('driverphone');
        inputPhone.innerHTML = prop.driverphone;
        var inputstarttime = document.getElementById('starttime');
        inputstarttime.innerHTML = prop.starttime;
        var inputendtime= document.getElementById('endtime');
        inputendtime.innerHTML = prop.endtime;
        var inputcartype = document.getElementById('cartype');
        inputcartype.innerHTML = prop.cartype;
        var inputteam= document.getElementById('team');
        inputteam.innerHTML = prop.team;
        var inputcompany = document.getElementById('company');
        inputcompany.innerHTML = prop.company;
    })
    var details = listing.appendChild(document.createElement('div'));
    details.className = 'stateA';
    details.innerHTML = prop.state;
    if (prop.state == "在线") {
        details.style.color = "#00853e";
        link.style.color = "#00853e";
    } else {
        link.style.color = "#BFBFBF";
        details.style.color = "#BFBFBF";
    }
    var delspan = details.appendChild(document.createElement('a'));
    delspan.href = "#";
    delspan.innerHTML = '<span class="glyphicon glyphicon-trash" style="color:#BFBFBF;float:right;margin-right:8%;"></span>';
    //delete
    delspan.addEventListener('click', function (e) {
        var postdata = {"carname": prop.name};
        var r=confirm("确认删除!");
        if (r==true)
          {
            $.post("/delete/", postdata, function (data) {
            if (data == "删除成功") {
                alert("删除成功！")
                window.location.reload();
            }
            else {
                alert("删除失败！")
            }
            });
          }
        else
          {
          return;
          }
    });
    link.addEventListener('click', function (e) {
        var clickedListing = data.features[this.dataPosition];
        document.getElementById('map').click();
        if(clickedListing.geometry.coordinates.length!=0){
        map.flyTo({
            center: clickedListing.geometry.coordinates,
            zoom: 19
        });
        var activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
            activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');}
        else {
            alert("车辆不在线！")
        }
    });
}
//点击添加按钮事件
// function addClick() {
    // var infoWindow = document.getElementById('hide');
    // infoWindow.style.display = 'block';
    // var inputName = document.getElementById('isAdd');
    // inputName.value = "yes";
    // var inputName = document.getElementById('focusedInput');
    // inputName.value = "";
    // $("#history").empty();
    // var waring = document.getElementById('waring');
    // waring.innerHTML = "--";
    // var mileage = document.getElementById('Mileage');
    // mileage.innerHTML = "--";
    // var speed = document.getElementById('Speed');
    // speed.innerHTML = "--"
    // var changeState = document.getElementById('changeState');
    // changeState.value = "在线";
    // var inputdriver = document.getElementById('driver');
    // inputdriver.value =null;
    // // var inputsteward = document.getElementById('steward');
    // // inputsteward.value =null;
    // var inputPhone = document.getElementById('driverphone');
    // inputPhone.value = null;
    // var inputstarttime = document.getElementById('starttime');
    // inputstarttime.value = null;
    // var inputendtime= document.getElementById('endtime');
    // inputendtime.value = null;
    // var inputcartype = document.getElementById('cartype');
    // inputcartype.value = null;
    // var inputcompany = document.getElementById('company');
    // inputcompany.value = null;
    // var inputteam= document.getElementById('team');
    // inputteam.value =null;
    // var inputterminalid= document.getElementById('terminalid');
    // inputterminalid.value = null;
// }

var mapLine=[]
function showHistory() {
        $("#history").empty();
        for (i=0;i<mapLine.length;i++) {
            if (map.getLayer( "layer" + mapLine[i])){
                map.removeLayer( "layer"+mapLine[i] );
                map.removeSource( "sour"+mapLine[i] );
            }
        }
        mapLine=[]
        // var isadd = document.getElementById("isAdd").value;
        // if (!isadd) {
            var tagId = document.getElementById('terminalid').textContent;
                // $("#terminalid").val();
            var param = {"id": tagId};
            param["date"] = $("#date").val();
            param["time1"] = $("#time1").val();
            param["time2"] = $("#time2").val()
            if(param.date&&param.time1<=param.time2) {
                $.post("/showHistory/", param, function (data) {
                    var datasHistory =  JSON.parse(data);
                    for (i = 0; i < datasHistory.length; i++) {
                        var line = datasHistory[i];
                        var accId = line.terminalid;
                        var listings = document.getElementById('history');
                        var listing = listings.appendChild(document.createElement('div'));
                        listing.className = 'alert alert-warning';
                        listing.id = "line";
                        var link = listing.appendChild(document.createElement('a'));
                        link.href = "#";
                        link.id=i;
                        link.innerHTML=line.create_time+"-"+line.finish_time;
                        link.addEventListener('click', function (e) {
                            id = this.id;
                            var point=datasHistory[id].linejson;
                            var orgin = point[0].coordinates
                            var coordinates=[];
                            for (il = 0; il < point.length; il++) {
                                coordinates.push(point[il].coordinates);
                            }
                            var route = {
                                "type": "FeatureCollection",
                                "features": [{
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "LineString",
                                        "coordinates": coordinates,
                                    }
                                }]
                            };
                            if (!map.getSource("sour"+accId+id)) {
                            map.addSource("sour"+accId+id, {
                                "type": "geojson",
                                "data": route
                            });}
                            if (map.getLayer( "layer"+accId+id ) == undefined) {
                            map.addLayer({
                                "id": "layer"+accId+id ,
                                "source":"sour"+accId+id,
                                "type": "line",
                                "paint": {
                                    "line-width": 5,
                                    "line-color": "#7A297B",
                                    'line-opacity': {
                                        'stops': [
                                            [15, 1],
                                            [18, 1]
                                        ]
                                    }
                                },
                                "layout": {
                                    "line-join": "round",
                                    /* 线条相交的形状 */
                                    "line-cap": "round" /* 线条末端形状 */
                                }
                            });
                            mapLine.push(accId+id);
                            map.flyTo({center: orgin})
                            }
                            else{map.removeLayer( "layer"+accId+id );
                                map.removeSource( "sour"+accId+id );

                            }
                        })
                    }
                });
            }
            else {
                alert("选择日期和正确时间")
            }
        // }
};