var play_index=0;
var lunfanspeed=3000;
window.onload=function(){
	var parents=document.getElementById("banner_ul");
	var allbox=getAllBox(parents);
	var ol_box=document.getElementById("banner_ol");
	var allbox_ol=getAllBox(ol_box);
	autoPlay(allbox,parents,allbox_ol);

	//添加父元素鼠标离开，如果想阻止点击事件冒泡，父元素使用mouseleave/mouseenter
	var bannermain=document.getElementById("banner_main");
	bannermain.addEventListener("mouseleave",function(e){
		autoPlay(allbox,parents,allbox_ol);
	});	


}

function autoPlay(allbox,parents,allbox_ol){
		var play=setTimeout(function(){
		++play_index;
		if(play_index>=allbox.length){play_index=0;}
		show(play_index,allbox);
		autoPlay(allbox,parents,allbox_ol);
		},lunfanspeed);
		
	//为ol内每个li添加点击监听
	for(var i=0;i<allbox_ol.length;i++){	
		allbox_ol[i].index=i;	//获取当前li元素的坐标位置值=i
		allbox_ol[i].addEventListener("click",function(){
			for(var x=0;x<allbox_ol.length;x++){	//重置所有li的class
				allbox_ol[x].className="";
			}
			this.className="active";	//为当前li添加active的class
			click_img(this.index,allbox);	//当点击时，将当前的li元素坐标直接传给show()进行切换。
			play_index=this.index;	//为了继续图片轮番，必须将新的index设置为点击后当前的li元素坐标，让setInterval以该值继续轮番
		});

	}

	//当鼠标经过时停止轮番
	parents.addEventListener("mouseover",function(){
		clearTimeout(play);
	});		

}

//当鼠标点击圆点时，直接显示图片。
function click_img(index,allbox){
	for(var i=0;i<allbox.length;i++){
		allbox[i].style.opacity="0";
	}
	for(var i=0;i<allbox.length;i++){allbox[i].className="banner_img"};
		//轮番前刷新所有元素的className；
	allbox[index].className="banner_img current";
	allbox[index].style.opacity="1";
}


function show(index,allbox){	
//传入两个参数，index是标记当前图片是哪张，allbox是传入图片的数组
	for(var i=0;i<allbox.length;i++){
		allbox[i].style.opacity="0";
	};	//轮番前刷新所有元素的opacity（透明度）为0；
	for(var i=0;i<allbox.length;i++){allbox[i].className="banner_img"};
		//轮番前刷新所有元素的className；
	allbox[index].className="banner_img current";
		//标记当前显示的图片，通过添加类名为current的方式
		
		/*轮番思路：
		注意：第一张图片的 上一张图片 是最后一张图片，所以不需要处理第一次第一张图片的转换，从第一次第一张到第二张图片的转换
		
		1、刷新所有元素的透明度（opacity=0）和类名（className）;

		2、将当前标记图片的透明度=0;然后通过不停自增达到透明度=1;

		3、将当前标记图片的 上一张图片 的透明度=1；然后通过不停自减达到透明度=0;

		4、 判断是否为最尾一张图片,如果是：则将最后一张图片的透明度=1;
		因为最后一张图片是自减透明度,同时第一张图片是自增透明度。
		否则：按 上一张 透明度设为1自减到0; 当前图片 从0自增到1;
		*/
	var alpha=0;
	var prealpha=100;
	if(index-1<0){	//如果当前index是0（指显示第一张图片，隐藏最后一张图片）
		allbox[allbox.length-1].style.opacity="1";	//则最后一张图片的透明度为1
		var pretimer=setInterval(function(){	//最后一张图片自减
			prealpha-=2;
			if(prealpha<0){prealpha=0;}
			allbox[allbox.length-1].style.opacity=prealpha/100;	
			//因为opacity最大值为1，所以此处要除100
			if(prealpha==0){clearInterval(pretimer);}	//当自减到0时取消自减
		},20);

		var timer=setInterval(function(){	//第一张图片自增（此时第一张图片opacity=0）
			alpha+=2;
			if(alpha>100){alpha=100;};
			allbox[0].style.opacity=alpha/100;
		if(alpha==100){clearInterval(timer);};	//当自增到100时取消自减
		},20);

	}
	else{	//如果当前index不是0（指剩下的图片）
		allbox[index-1].style.opacity="1";	//当前图片的 上一张图片 的透明度=1
		var pretimer=setInterval(function(){	//上一张图片 自减到0
			prealpha-=2;
			if(prealpha<0){prealpha=0;}
			allbox[index-1].style.opacity=prealpha/100;
			if(prealpha==0){clearInterval(pretimer);}

		},20);
		var timer=setInterval(function(){	//当前图片自增
			alpha+=2;
			if(alpha>100){alpha=100;};
			allbox[index].style.opacity=alpha/100;
		if(alpha==100){clearInterval(timer);};
		},20);
	}

}

//获取所有LI
function getAllBox(parents){
	var childs=parents.childNodes;
	var childsarr=new Array();
	for(var i=0;i<childs.length;i++){
		if(childs[i].nodeName=="LI"){
			childsarr.push(childs[i]);
		}
	}
	return childsarr;
}