window.onload=function(){
  var fenyeReady=new fenye();
  fenyeReady.setBtn();

}

function fenye(){
  var el_main=document.getElementById('fenye');
}

fenye.prototype={
  setBtn:function(){
    var el_child=el_main.children();
    
    for(var i=0;i<el_child.length;i++){ 
      el_child[i].index=i+1;
      //为所有DOM元素设置index属性
      
      el_child[i].addEventListener('click',function(){  //为所有DOM元素设置鼠标监听
          var _self_index=this.index;
          //监听当前点击的元素的index值。
          if(_self.index>3){
              //如果点击的元素大于3，改变显示内容，并重新设置index值
              el_child[0].innerHTML=_self_index-2;
              el_child[1].innerHTML=_self_index-1;
              el_child[2].innerHTML=_self_index;
              el_child[3].innerHTML=_self_index+1;
              el_child[4].innerHTML=_self_index+2;
              
              el_child[0].index=_self_index-2;
              el_child[1].index=_self_index-1;
              el_child[2].index=_self_index;
              el_child[3].index=_self_index+1;
              el_child[4].index=_self_index+2;
          
          
          }else if(_self_index<3){
            //当点击的元素小于3，则显示1~5；
            for(var x=0;x<5;x++){
            el_child[x].innerHTML=x+1;
            el_child[x].index=x+1;
            }
          
          } 
    }); 
    //鼠标监听结束
    
    }
    //循环结束
    
  }
}
