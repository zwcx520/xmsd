window.addEventListener('load', function () {
    // ===== 常量配置区（统一改配置不用改DOM代码）=====
    const TIP_KEY = "app_tip_version"; // 本地存储key（改用版本存储）
    const APP_TIP_VER = "1"; // ✅关键：修改这个数字(1→2/3/4)，所有用户下次打开就会重新弹窗
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
            width: '90%',
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
                《<a href="${PRIVACY_URL}" target="_blank" style="color:#0066ff">隐私政策</a>》
                《<a href="${AGREEMENT_URL}" target="_blank" style="color:#0066ff">用户服务协议</a>》
            </div>
            <center><button id="agreeBtn" style="width:50%;padding:10px;background:#2563eb;color:#fff;border:0;border-radius:6px;font-size:15px;">同意并使用</button></center>
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





// ===================== 【核心：在这里修改版本号】=====================
// 每次想重新弹窗，只需要修改这里的版本即可（例如 V123 → V124 / 2.0 / 1.5.3）
const CURRENT_VERSION = "V1.0";
// ===================================================================

// 下载函数：直接下载，不跳转页面
function downloadApk() {
    const url = "https://xmsd.netlify.app/xmsd.apk";
    const fileName = "xmsd.apk";
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = "_self";
    link.click();
    link.remove();
}

// 关闭弹窗
function closeModal() {
    const mask = document.getElementById('updateModalMask');
    if (mask) mask.remove();
}

// 创建并显示更新弹窗
function showUpdateModal() {
    if (document.getElementById('updateModalMask')) return;

    // 遮罩层
    const mask = document.createElement('div');
    mask.id = 'updateModalMask';
    mask.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
    `;

    // 弹窗主体
    const modalBox = document.createElement('div');
    modalBox.style.cssText = `
        width: 300px;
        background: #fff;
        border-radius: 8px;
        padding: 25px 20px;
        box-sizing: border-box;
        text-align: center;
    `;

    // 弹窗标题（自动读取上面定义的版本）
    const title = document.createElement('h3');
    title.innerText = `发现新版本 ${CURRENT_VERSION}`;
    title.style.cssText = `
        margin: 0 0 20px 0;
        font-size: 18px;
        color: #333;
    `;

    // 提示文案
    const desc = document.createElement('p');
    desc.innerText = '当前为旧版本，建议立即更新';
    desc.style.cssText = `
        margin: 0 0 25px 0;
        font-size: 14px;
        color: #666;
    `;

    // 按钮容器
    const btnWrap = document.createElement('div');
    btnWrap.style.cssText = `
        display: flex;
        justify-content: space-between;
        gap: 10px;
    `;

    // 立即更新按钮
    const updateBtn = document.createElement('button');
    updateBtn.innerText = '立即更新';
    updateBtn.style.cssText = `
        flex: 1;
        height: 36px;
        border: none;
        border-radius: 4px;
        background: #1677ff;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    `;
    updateBtn.onclick = function() {
        downloadApk();
        closeModal();
    };

    // 取消按钮
    const cancelBtn = document.createElement('button');
    cancelBtn.innerText = '取消';
    cancelBtn.style.cssText = `
        flex: 1;
        height: 36px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #fff;
        color: #333;
        font-size: 14px;
        cursor: pointer;
    `;
    cancelBtn.onclick = closeModal;

    // 组装DOM
    btnWrap.appendChild(updateBtn);
    btnWrap.appendChild(cancelBtn);
    modalBox.appendChild(title);
    modalBox.appendChild(desc);
    modalBox.appendChild(btnWrap);
    mask.appendChild(modalBox);
    document.body.appendChild(mask);

    // 点击遮罩空白处关闭弹窗
    mask.onclick = function(e) {
        if (e.target === mask) closeModal();
    };
}

// ===================== 版本判断核心逻辑 =====================
window.onload = function() {
    // 读取浏览器本地存储中，上次已经展示过的版本
    const showedVersion = localStorage.getItem('update_modal_version');

    // 逻辑：版本不一致 → 弹窗，并记录当前版本；版本一致 → 不弹窗
    if (showedVersion !== CURRENT_VERSION) {
        showUpdateModal();
        // 把当前版本存入本地，标记为「已弹窗」
        localStorage.setItem('update_modal_version', CURRENT_VERSION);
    }
}

