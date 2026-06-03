window.addEventListener('load', function () {
    // ===== 常量配置区（统一改配置不用改DOM代码）=====
    const TIP_KEY = "app_tip_version"; // 本地存储key（改用版本存储）
    const APP_TIP_VER = "2"; // ✅关键：修改这个数字(1→2/3/4)，所有用户下次打开就会重新弹窗
    const PRIVACY_URL = "https://xmsd.netlify.app/privacy.html";   // 替换成真实隐私地址
    const AGREEMENT_URL = "https://xmsd.netlify.app/userservices.html"; // 替换成真实服务协议地址
    const Z_INDEX = 9999;

    // 【修改缓存判断逻辑】：读取本地存储版本，和当前版本不一致则弹窗
    const localSaveVer = localStorage.getItem(TIP_KEY);
    if (localSaveVer !== APP_TIP_VER) {
        // 1. 创建遮罩层
        const mask = document.createElement('div');
        Object.assign(mask.style, {
            position: 'fixed',
            inset: '0',
            background: 'rgba(0,0,0,0.6)',
            zIndex: Z_INDEX,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px'
        });

        // 2. 创建弹窗盒子
        const box = document.createElement('div');
        Object.assign(box.style, {
            maxWidth: '520px',
            width: '100%',
            background: '#fff',
            borderRadius: '10px',
            padding: '20px',
            maxHeight: '80vh',
            overflowY: 'auto'
        });

        // 弹窗HTML模板（仅修改h3样式：红色+加粗）
        box.innerHTML = `
            <h3 style="text-align:center;margin:0 0 12px;color:red;font-weight:bold;">欢迎使用工时记录工具！</h3>
            <div style="line-height:1.7;font-size:14px;">
💡1.本工具为工时记录时薪计算一体APP，所有数据全部保存至本地，无任何云端存储和信息获取泄露，正规工时记录APP，无不良引导。更多信息请详细阅读完整隐私政策和用户服务协议！<br><br>
2.使用方法:先填写每小时时薪，再进行选择日期及上班/休息选项，然后再写备注，又继续选择或填写开始及结束时间，系统会自动计算当天工时和总工时并以使用者填写的时薪计算总薪资，全自动化。搜索框只能搜索日期，例如:2026-01-01<br><br>
3.保存后的时薪和工时可修改并实时更新计算工时和总薪资，但是切记不要点击右上角清空全部记录，删除后数据无法恢复，请谨慎操作！！！<br><br>
4.本程序网络信号弱的时候会造成APP加载缓慢，属于正常现象，数据不会丢失！
            </div>
            <div style="margin:16px 0;display:flex;gap:20px;justify-content:center;">
                <a href="${PRIVACY_URL}" target="_blank" style="color:#0066ff">隐私政策</a>
                <a href="${AGREEMENT_URL}" target="_blank" style="color:#0066ff">用户服务协议</a>
            </div>
            <button id="agreeBtn" style="width:50%;padding:10px;background:#2563eb;color:#fff;border:0;border-radius:6px;font-size:15px;">我已阅读并同意，开始使用</button>
        `;

        // 组装DOM
        mask.appendChild(box);
        document.body.appendChild(mask);

        // 同意按钮事件：点击后存入最新版本号
        const agreeBtn = document.getElementById('agreeBtn');
        agreeBtn.addEventListener('click', () => {
            mask.remove();
            // 存入当前最新版本，下次版本不变不再弹窗
            localStorage.setItem(TIP_KEY, APP_TIP_VER);
        });
    }

    // ===== 原有页面初始化逻辑 =====
    // 确保jQuery已加载再执行
    if (typeof $ !== 'undefined') {
        $("#r_date").val(fmtToday());
        $("#hourWage").val(getWage());
        render();
        statistics();
    }
});
