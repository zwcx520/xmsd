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












