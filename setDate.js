//当前日期减一天
var now_date=new Date();
var set_date=now_date.setDate(now_date.getDay()-1);
var print_date=new Date(set_date);


//格式化日期，输出 年-月-日，如 2019-01-01
function formatDate(time){
  var year=time.getFullYear();
  var month=time.getMonth()+1;  //因为getMonth()返回的是0-11，所以需要+1；
  var day=time.getDay();
  if(month<10){
    var concat_month="0"+month;
  }
  else{
    var concat_month=month;
  }
  //判断月份是否小于10，若是则在前方加“0”；
  if(day<10){
    var concat_day="0"+day;
  }else{
    var concat_day=day;
  }
  //判断日期是否小于10，若是则在前方加“0”；
  
  var _self_date=year+"-"+concat_month+"-"+concat_day;
  
  return _self_date;
}
