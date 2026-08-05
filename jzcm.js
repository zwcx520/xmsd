
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
