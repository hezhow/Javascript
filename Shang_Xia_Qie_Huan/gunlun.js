var finished=true;
window.onload=function(){
	var index=0;
	var status;
	var main=document.getElementById("main");
	var childbox=getChild(main);
	//添加滚轮监听
	addMouseWheel(index,childbox);
}

function addMouseWheel(index,childbox){
	document.addEventListener("mousewheel",function(e){
		if(!finished){return;}  //鼠标监听防抖，当setTimeout结束时将finished变为true;
		finished=false;
		setTimeout(function(){
		if(e.detail){	//兼容FF的鼠标监听
			if(e.detail>0){
				status="up";
				if(index!=0){
					index--;
				}				
			}
			else if(e.detail<0){
				index++;
				status="down";
			}	
		}
		else if(e.wheelDelta){	//兼容IE、CHROME 的鼠标滚轮监听
			if(e.wheelDelta>0){
				status="up";
				if(index!=0){
					index--;
				}	
			}
			else if(e.wheelDelta<0){
				index++;
				status="down";
				}
			}
		if(index<0){index=0;};
		if(index>=childbox.length){index=childbox.length-1;};
		show(index,childbox,status);
		finished=true;
		},300);
	},false);
}

function show(index,childbox,status){
	for(var i=0;i<childbox.length;i++){
		childbox[i].className="";
		childbox[i].style="";
	}
	if(status=="down"){
		if(index-1>=0){
			childbox[index-1].className="dot_fill pre_page";
			childbox[index-1].style.cssText="z-index:200;transition:transform 0.5s linear";
		}
		if(index+1<childbox.length){
			childbox[index+1].className="dot_fill next_page";
		}
		childbox[index].className = "dot_fill cur_page";
	}
	else if(status=="up"){
		if(index-1>=0){
			childbox[index-1].className="dot_fill pre_page";
		}
		if(index+1<childbox.length){
			childbox[index+1].className="dot_fill next_page";
			childbox[index+1].style.cssText="z-index:200;transition:transform 0.5s linear";
		}
		childbox[index].className="dot_fill cur_page";
	}
	setTimeout(function(){
		for(var i=0;i<childbox.length;i++){
		childbox[i].style="";
		}
	},1000);	
}

function getChild(main){
	var child=main.childNodes;
	var childarr=new Array();
	for(var i=0;i<child.length;i++){
		if(child[i].nodeName=="DIV"){
			childarr.push(child[i]);
		}
	}
	return childarr;
};

function conlog(ele){
	//console.log(ele);
}
