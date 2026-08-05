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
