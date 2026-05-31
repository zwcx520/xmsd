// 页面加载执行
window.addEventListener('load', function(){
  // 定义本地存储标识
  const TIP_KEY = "tip_first_open";

  // 判断是否已经提示过
  if(!localStorage.getItem(TIP_KEY)){
    // 首次打开：弹出提示
    alert("欢迎使用工时记录工具！\n\n💡1.本工具为工时记录时薪计算一体APP，所有数据全部保存至本地，无任何云端存储和信息获取泄露，正规工时记录APP，无不良引导。\n\n2.使用方法:先填写每小时时薪，再进行选择日期及上班/休息选项，然后再写备注，又继续选择或填写开始及结束时间，系统会自动计算当天工时和总工时并以使用者填写的时薪计算总薪资，全自动化。搜索框只能搜索日期，例如:2026-01-01\n\n3.保存后的时薪和工时可修改并实时更新计算工时和总薪资，但是切记不要点击右上角清空全部记录，删除后数据无法恢复，请谨慎操作！！！\n\n4.本程序网络信号弱的时候会造成APP加载缓慢，属于正常现象，数据不会丢失！");
    // 写入标记，下次不再弹出
    localStorage.setItem(TIP_KEY, "1");
  }

  // 下面放你原有初始化代码
  $("#r_date").value = fmtToday();
  $("#hourWage").value = getWage();
  render();
  statistics();
});
