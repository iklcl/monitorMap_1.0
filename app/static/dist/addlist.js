function test() {
       //实例化点线运动
    var car1 = new Car({
        //路线坐标
        "coordinates": [
            [114.05241295632942, 22.53988188287974],
            [114.05221967133855, 22.539878084577623],
            [114.05218594929056, 22.53986668964926],
            [114.05071410837286, 22.539831745347968],
            [114.05060718476773, 22.539866689799382],
            [114.05043117204468, 22.539869728441317],
            [114.05033576329248, 22.539922904760843],
            [114.05030368619703, 22.540018622082272],
            [114.05029217077345, 22.54020186399147]
        ],
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
        "coordinates": [
            [114.04957037866654, 22.540160458083406],
            [114.04956640982994, 22.540392001068426],
            [114.04956294805686, 22.540614897897385],
            [114.04958948949519, 22.540734269801064],
            [114.04961243145522, 22.540865251227316],
            [114.04970698074555, 22.54096985087969],
            [114.04983373917304, 22.541026469012863],
            [114.049950440803, 22.541024521448776],
            [114.05006957334922, 22.54097913347067],
            [114.05012616131404, 22.540926868500037],
            [114.0501808560619, 22.540845251099242],
            [114.05019045775998, 22.5407271985451],
            [114.05020407461882, 22.540070609277493],
            [114.05018471928764, 22.539969241038918],
            [114.05015864778062, 22.539923859515],
            [114.05009948546552, 22.5398756995328],
            [114.05001124336758, 22.539848841065336],
            [114.04980467553298, 22.53981827852681],
            [114.04921759154934, 22.53979405241509]
        ],
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


function tankuang(data) {
    $("#msg").remove();
    var html =
        '<div class="alert alert-success" id="msg" role="alert" style=" position:fixed;left:19%"><strong>' + data + '</strong> </div>'
    $("body").append(html);
    var t = setTimeout(next, 1000);

    function next() {
        $("#msg").remove();
    }
}
var DataList=[];
//数据获取生成列表
function showList(datas) {
    // test();
    for (i = 0; i < datas.length; i++) {
        data = datas[i];
        var car = new Car({
            //路线坐标
            "coordinates": [
                [114.04957037866654, 22.540160458083406],
                [114.04956640982994, 22.540392001068426],
                [114.04956294805686, 22.540614897897385],
                [114.04958948949519, 22.540734269801064],
                [114.04961243145522, 22.540865251227316],
                [114.04970698074555, 22.54096985087969],
                [114.04983373917304, 22.541026469012863],
                [114.049950440803, 22.541024521448776],
                [114.05006957334922, 22.54097913347067],
                [114.05012616131404, 22.540926868500037],
                [114.0501808560619, 22.540845251099242],
                [114.05019045775998, 22.5407271985451],
                [114.05020407461882, 22.540070609277493],
                [114.05018471928764, 22.539969241038918],
                [114.05015864778062, 22.539923859515],
                [114.05009948546552, 22.5398756995328],
                [114.05001124336758, 22.539848841065336],
                [114.04980467553298, 22.53981827852681],
                [114.04921759154934, 22.53979405241509]
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
        var inputAdd = document.getElementById('isAdd');
        inputAdd.value = "";
        var carid = document.getElementById('id');
        carid.value = prop.carid;
        var inputName = document.getElementById('focusedInput');
        inputName.value = prop.name;
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
        inputdriver.value = prop.driver;
        // var inputsteward = document.getElementById('steward');
        // inputsteward.value = prop.steward;
        var inputPhone = document.getElementById('driverphone');
        inputPhone.value = prop.driverphone;
        var inputstarttime = document.getElementById('starttime');
        inputstarttime.value = prop.starttime;
        var inputendtime= document.getElementById('endtime');
        inputendtime.value = prop.endtime;
        var inputcartype = document.getElementById('cartype');
        inputcartype.value = prop.cartype;
        var inputcompany = document.getElementById('company');
        inputcompany.value = prop.company;
        var inputteam= document.getElementById('team');
        inputteam.value = prop.team;
        var inputterminalid= document.getElementById('terminalid');
        inputterminalid.value = prop.terminalid;

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
        $.post("/delete/", postdata, function (data) {
            if (data == "删除成功") {
                tankuang("删除成功！")
                window.location.reload();
            }
            else {
                tankuang("删除失败！")
            }
        });
    });
    link.addEventListener('click', function (e) {
        var clickedListing = data.features[this.dataPosition];
        document.getElementById('map').click();
        map.flyTo({
            center: clickedListing.geometry.coordinates,
            zoom: 17
        });
        var activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
            activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');
    });
}

//点击添加按钮事件
function addClick() {
    var infoWindow = document.getElementById('hide');
    infoWindow.style.display = 'block';
    var inputName = document.getElementById('isAdd');
    inputName.value = "yes";
    var inputName = document.getElementById('focusedInput');
    inputName.value = "";
    $("#history").empty();
    var waring = document.getElementById('waring');
    waring.innerHTML = "--";
    var mileage = document.getElementById('Mileage');
    mileage.innerHTML = "--";
    var speed = document.getElementById('Speed');
    speed.innerHTML = "--"
    var changeState = document.getElementById('changeState');
    changeState.value = "在线";
    var inputdriver = document.getElementById('driver');
    inputdriver.value =null;
    // var inputsteward = document.getElementById('steward');
    // inputsteward.value =null;
    var inputPhone = document.getElementById('driverphone');
    inputPhone.value = null;
    var inputstarttime = document.getElementById('starttime');
    inputstarttime.value = null;
    var inputendtime= document.getElementById('endtime');
    inputendtime.value = null;
    var inputcartype = document.getElementById('cartype');
    inputcartype.value = null;
    var inputcompany = document.getElementById('company');
    inputcompany.value = null;
    var inputteam= document.getElementById('team');
    inputteam.value =null;
    var inputterminalid= document.getElementById('terminalid');
    inputterminalid.value = null;
}

//修改添加完成
function over() {
    var param = {};

    function appendInfo(id) {
        var formData = $("#" + id).serializeArray();//把form里面的数据序列化成数组
        formData.forEach(function (e) {
            if (e.value != '00') {
                param[e.name] = e.value;
            }
        });
    }

    appendInfo("form1");
    appendInfo("form2");
    if(
        param.terminalid.replace(/\s*/g, "")==""||param.name.replace(/\s*/g, "")==""
    ){
        alert("名称和终端号不能为空！")
        return false;
    }
    var isadd = document.getElementById("isAdd").value;
    if (isadd) {
        $.post("/add/", param, function (data) {
            tankuang("添加" + data)
        });
        window.location.reload();
    }
    else {
        $.post("/add/", param, function (data) {
            tankuang("修改" + data)
        });
         window.location.reload();
    }
}


function showHistory() {
        var isadd = document.getElementById("isAdd").value;
        if (!isadd) {
            var tagId = $("#terminalid").val();
            var param = {"id": tagId};
            param["date"] = $("#date").val();
            param["time1"] = $("#time1").val();
            param["time2"] = $("#time2").val()
            if(param.date&&param.time1<=param.time2) {
                $.post("/showHistory/", param, function (data) {
                    datas =  JSON.parse(data);
                    for (i = 0; i < datas.length; i++) {
                        var line = datas[i];
                        var accId = line.terminalid;
                        var listings = document.getElementById('history');
                        var listing = listings.appendChild(document.createElement('div'));
                        listing.className = 'alert alert-warning';
                        listing.id = "line";
                        var link = listing.appendChild(document.createElement('a'));
                        link.href = "#";
                        link.innerHTML=line.create_time+"-"+line.finish_time;
                        link.addEventListener('click', function (e) {
                            var point=line.linejson;
                            var orgin = point[0].coordinates
                            var coordinates=[];
                            for (i = 0; i < point.length; i++) {
                                coordinates.push(point[i].coordinates);
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
                            if (!map.getSource("sour"+accId+i)) {
                            map.addSource("sour"+accId+i, {
                                "type": "geojson",
                                "data": route
                            });}
                             else{map.removeLayer( "sour"+accId+i )}
                            if (map.getLayer( "layer"+accId+i ) == undefined) {
                            map.addLayer({
                                "id": "layer"+accId+i ,
                                "source":"sour"+accId+i,
                                "type": "line",
                                "paint": {
                                    "line-width": 5,
                                    "line-color": "#007cbf",
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
                            map.flyTo({center: orgin})
                            }
                            else{map.removeLayer( "layer"+accId+i )}
                        })
                    }
                });
            }
            else {
                alert("选择日期和正确时间")
            }
        }
};