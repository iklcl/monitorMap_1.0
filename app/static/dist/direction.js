
	var A ={"y":114.05043117204468,"x":22.539869728441317};
	var	B= {"y":114.05033576329248,"x":22.539922904760843};
	var reangle;
	var ab = {"y":B.y-A.y,"x":B.x-A.x};
	if(ab.x>=0){ reangle = 180/Math.PI *Math.atan2(ab.x,ab.y);}
	else{
		reangle = 180/Math.PI *Math.atan2(ab.x,ab.y)+360;
	}
