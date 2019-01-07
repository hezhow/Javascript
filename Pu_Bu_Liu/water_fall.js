window.onload=function(){
	waterFallMain("wf_main");
	window.onscroll=function(){
		if(checkScroll("wf_main")){
			var imgJson={"date":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"5.jpg"},{"src":"4.jpg"},{"src":"6.jpg"}]};
			//模拟新建一个JSON；
			var par=document.getElementById("wf_main");
			for(var i=0;i<imgJson.date.length;i++){
				//遍历JSON，根据JSON，创建所有图片的DIV
				var par_box=document.createElement("div");
				par_box.className="wf_box";
				par.appendChild(par_box);
				var box_img=document.createElement("img");
				box_img.src="images/water_fall/"+imgJson.date[i].src;
				par_box.appendChild(box_img);
			}
			waterFallMain("wf_main");
			//重新执行瀑布流，让新的图片都使用瀑布流；
		}
	}
	
};

/*滚到底部自动加载新内容思路：
1、获取最后一个元素的上边距。
2、当窗口可见高度 + 滚动像素(scrollTop) 大于 最度元素的上边距时，为瀑布流创建新的DIV元素
*/
(function(){
function checkScroll(parents){
	var winHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	//获取浏览器可见高度；
	var winScroll=document.documentElement.scrollTop;
	//获取滚动条滚动的像素；
	var allPar=document.getElementById(parents);
	var allBox=getAllBox(allPar);
	var lastDom=allBox[allBox.length-1];
	//获取瀑布流最后一个元素；
	var lastDomHeight=lastDom.offsetTop;
	if(winHeight+winScroll > lastDomHeight){return true;}
}
window.checkScroll=checkScroll;
})();

(function(){
/*瀑布流思路：
1、根据父节点获取所有子节点（DIV）。
2、计算瀑布流列数：根据父节点的宽度 除以 每个子节点的宽度。
3、计算第一列(根据瀑布流列数)的最小高度，超出的DIV的上边距（top）等于第一列的最小高度。
4、获取最小高度的元素（DIV）在数组的位置。
5、通过该位置，获取该元素的左边距（offsetLeft）。
6、将元素的左边距赋值给超出第一列的元素。
*重要：7、将第一列的最小高度的元素增加超出元素的高度，即将最小高度的元素的高度增加，值为最小高度+超出元素高度。
*/

	function waterFallMain(parents){
	var allPar=document.getElementById(parents);
	var allBox=getAllBox(allPar);
		//获取所有box元素，根据父节点
	var boxColumn=Math.floor(allPar.offsetWidth/ allBox[0].offsetWidth);
		//计算瀑布流区域栏目数=中间区域宽度 除以 每个DIV的宽度，用来判断数组前多少个为第一列。
	var BoxHeight=new Array();
	for(var i=0;i<allBox.length;i++){
		if(i<boxColumn){
			BoxHeight[i]=allBox[i].offsetHeight;
			//获取第一列的高度；
		}
		else{
			var minheight=Math.min.apply(Math.min,BoxHeight);	//通过Math.min.apply()获取最小高度
			allBox[i].style.position="absolute";	//修改超出元素的CSS属性
			allBox[i].style.top=minheight+"px";
			var minIndex=getMinIndex(minheight,BoxHeight);	//获取最小高度元素在数组的位置
			allBox[i].style.left=allBox[minIndex].offsetLeft+"px";	//修改左边距
			BoxHeight[minIndex]=minheight+allBox[i].offsetHeight;	//将第一列的最小高度刷新，值为当前元素的高度+最小高度
		}
	}
};

function getAllBox(parents){
	//获取所有box元素，放入arr数组。
	var arr=new Array();
	var childs=parents.childNodes;
	console.log(childs);
	//childNodes是NodeList节点列表，不能直接删除，所以转用数组。
	for(var i=0;i<childs.length;i++){
		if(childs[i].nodeName=="DIV"){
			arr.push(childs[i]);
			//将不是#text的元素插入数组。
		}	
	}
	return arr;
};
function getMinIndex(minheight,BoxHeight){
	//获取最小高度在BoxHeight数组的位置。
	for(var i=0;i<BoxHeight.length;i++){
		if(BoxHeight[i]==minheight){
			return i;
		}
	}
};

 window.waterFallMain=waterFallMain;
 window.getAllBox=getAllBox;	
 //开放接口
})();
