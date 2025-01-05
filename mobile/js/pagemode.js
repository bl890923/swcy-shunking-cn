// JavaScript Document
checkMode(1);
function checkMode(openWap){
	var htmlFileUrl = window.location.pathname;
	var isWap = checkWap();
	if(isWap && openWap){
		if(htmlFileUrl.indexOf("http://m.swcy.shunking.cn")<0){
			window.location.href = "http://m.swcy.shunking.cn"+htmlFileUrl;
		}
	}
	if(!isWap){ //只要时电脑访问手机路径，一律转PC地址
		if(htmlFileUrl.indexOf("http://m.swcy.shunking.cn")>-1){
			window.location.href= htmlFileUrl.replace("http://m.swcy.shunking.cn","");
		}
	}
}

function checkWap(){
	var userAgentInfo = navigator.userAgent;  
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
	var flag = false;  
	for (var i = 0; i < Agents.length; i++) {  
	   if (userAgentInfo.indexOf(Agents[i]) > 0) { 
			flag = true; 
			break; 
	   }  
	}
	return flag;
}




