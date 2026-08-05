/**
 * 页面加载完成后【自动弹出】小程序码弹窗
 * 顶部：星漫时段小程序已上线
 * 图片缩小，带提示文字
 */
function showImageModal() {
    if (document.getElementById('js-image-modal')) return;

    const mask = document.createElement('div');
    mask.id = 'js-image-modal';
    mask.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.88);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 18px;
        padding: 20px;
        box-sizing: border-box;
    `;

    // 关闭按钮
    const closeBtn = document.createElement('div');
    closeBtn.innerText = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: #fff;
        font-size: 40px;
        cursor: pointer;
        user-select: none;
    `;

    // 顶部标题文字
    const titleText = document.createElement('div');
    titleText.innerText = '星漫时段小程序已上线';
    titleText.style.cssText = `
        color: #ffffff;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        letter-spacing: 1px;
    `;

    // 图片容器，控制二维码尺寸
    const imgWrap = document.createElement('div');
    imgWrap.style.cssText = `
        width: 260px;
        height: 260px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const img = document.createElement('img');
    img.src = 'https://xmsd.netlify.app/xmsdxcx.jpg';
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
    `;
    imgWrap.appendChild(img);

    // 底部提示
    const tipText = document.createElement('div');
    tipText.innerText = '👉 微信内长按图片识别小程序';
    tipText.style.cssText = `
        color: #cccccc;
        font-size: 14px;
        text-align: center;
    `;

    mask.appendChild(closeBtn);
    mask.appendChild(titleText);
    mask.appendChild(imgWrap);
    mask.appendChild(tipText);
    document.body.appendChild(mask);

    function closeModal() {
        mask.remove();
        document.removeEventListener('keydown', escHandler);
    }

    closeBtn.onclick = closeModal;
    mask.onclick = function (e) {
        if (e.target === mask) closeModal();
    };

    function escHandler(e) {
        if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', escHandler);
}

// ==========页面加载完毕自动执行弹窗 ==========
window.addEventListener('load',function(){
    showImageModal();
})





window.addEventListener('load', function () {
    // ===== 常量配置区（统一改配置不用改DOM代码）=====
    const TIP_KEY = "app_tip_version"; // 本地存储key（改用版本存储）
    const APP_TIP_VER = "0"; // ✅关键：修改这个数字(1→2/3/4)，所有用户下次打开就会重新弹窗
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
💡1.本工具为工时记录时薪计算一体程序，所有数据全部保存至本地，无任何云端存储和信息获取泄露，正规工时记录程序，无不良引导。更多信息请详细阅读完整隐私政策和用户服务协议！<br><br>
2.使用方法:先填写每小时时薪，再进行选择日期及上班/休息选项，然后再写备注，又继续选择或填写开始及结束时间，系统会自动计算当天工时和总工时并以使用者填写的时薪计算总薪资，全自动化。搜索框只能搜索日期，例如:2026-01-01<br><br>
3.保存后的时薪和工时可修改并实时更新计算工时和总薪资，但是切记不要点击右上角清空全部记录，删除后数据无法恢复，请谨慎操作！！！<br><br>
4.本程序网络信号弱的时候会造成A程序加载缓慢，属于正常现象，数据不会丢失！
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











// 修改这里的版本号即可重置播放逻辑（如 1→2、2→3）
const PLAY_VERSION = 1;
// 音频地址，替换为你的mp3链接
const audioUrl = ".mp3";
const audio = new Audio(audioUrl);
audio.volume = 0.7;

// 从本地存储读取上次播放的版本
const savedVersion = localStorage.getItem("audio_play_version");
let hasPlayed = false;

// 仅当本地存储版本 和 当前版本不一致时，才绑定点击播放逻辑
if (savedVersion !== String(PLAY_VERSION)) {
  document.addEventListener("click", async function playOnce() {
    if (hasPlayed) return;
    try {
      await audio.play();
      hasPlayed = true;
      // 播放成功后，把当前版本存入本地存储
      localStorage.setItem("audio_play_version", PLAY_VERSION);
      // 移除监听，避免重复触发
      document.removeEventListener("click", playOnce);
    } catch (err) {
      console.log("播放失败:", err);
    }
  });
}












/***

// 锁定页面所有触控、鼠标操作
function lockPageTouch() {
  // CSS 全局禁止触摸行为
  document.documentElement.style.touchAction = 'none';
  // 所有元素不接收指针事件
  document.body.style.pointerEvents = 'none';

  // 阻止触摸、鼠标、滚动、缩放事件
  const blockEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  // 触摸事件
  document.addEventListener('touchstart', blockEvent, { passive: false });
  document.addEventListener('touchmove', blockEvent, { passive: false });
  document.addEventListener('touchend', blockEvent, { passive: false });
  document.addEventListener('touchcancel', blockEvent, { passive: false });
  // 双指缩放
  document.addEventListener('gesturestart', blockEvent, { passive: false });
  document.addEventListener('gesturechange', blockEvent, { passive: false });
  // 鼠标、点击
  document.addEventListener('mousedown', blockEvent);
  document.addEventListener('click', blockEvent, true);
  // 滚动
  document.addEventListener('wheel', blockEvent, { passive: false });
  document.addEventListener('scroll', blockEvent);
}

// 解除锁定
function unlockPageTouch() {
  document.documentElement.style.touchAction = '';
  document.body.style.pointerEvents = 'auto';

  const blockEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  document.removeEventListener('touchstart', blockEvent);
  document.removeEventListener('touchmove', blockEvent);
  document.removeEventListener('touchend', blockEvent);
  document.removeEventListener('touchcancel', blockEvent);
  document.removeEventListener('gesturestart', blockEvent);
  document.removeEventListener('gesturechange', blockEvent);
  document.removeEventListener('mousedown', blockEvent);
  document.removeEventListener('click', blockEvent, true);
  document.removeEventListener('wheel', blockEvent);
  document.removeEventListener('scroll', blockEvent);
}

// 使用
lockPageTouch();  // 锁定
// unlockPageTouch(); // 解锁

***/
