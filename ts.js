window.addEventListener('load', function () {
    const TIP_KEY = "tip_first_open";
    if (!localStorage.getItem(TIP_KEY)) {
        // 动态创建遮罩
        const mask = document.createElement('div');
        mask.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;padding:15px;';
        const wrap = document.createElement('div');
        wrap.style.cssText = 'max-width:520px;width:100%;background:#fff;border-radius:10px;padding:20px;max-height:80vh;overflow-y:auto;';

        wrap.innerHTML = `
            <h3 style="text-align:center;margin:0 0 12px;color:red;font-weight:bold;font-size:20px;">欢迎使用工时记录工具！</h3>
            <div style="line-height:1.7;font-size:14px;">
💡1.本工具为工时记录时薪计算一体APP，所有数据全部保存至本地，无任何云端存储和信息获取泄露，正规工时记录APP，无不良引导。<br><br>
2.使用方法:先填写每小时时薪，再进行选择日期及上班/休息选项，然后再写备注，又继续选择或填写开始及结束时间，系统会自动计算当天工时和总工时并以使用者填写的时薪计算总薪资，全自动化。搜索框只能搜索日期，例如:2026-01-01<br><br>
3.保存后的时薪和工时可修改并实时更新计算工时和总薪资，但是切记不要点击右上角清空全部记录，删除后数据无法恢复，请谨慎操作！！！<br><br>
4.本程序网络信号弱的时候会造成APP加载缓慢，属于正常现象，数据不会丢失！
            </div>
            <div style="margin:16px 0;display:flex;gap:20px;justify-content:center;">
                <a href="隐私地址" target="_blank" style="color:#0066ff;text-decoration:none">隐私政策</a>
                <a href="协议地址" target="_blank" style="color:#0066ff;text-decoration:none">用户服务协议</a>
            </div>
            <button style="width:100%;padding:10px;background:#2563eb;color:#fff;border:0;border-radius:6px;font-size:15px;">我已阅读并同意，开始使用</button>
        `;

        mask.appendChild(wrap);
        document.body.appendChild(mask);
        // 绑定按钮事件
        wrap.querySelector('button').onclick = () => {
            mask.remove();
            localStorage.setItem(TIP_KEY, "1");
        };
    }

    // 原有初始化代码不变
    $("#r_date").val(fmtToday());
    $("#hourWage").val(getWage());
    render();
    statistics();
});
