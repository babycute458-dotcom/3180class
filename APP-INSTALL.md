# 对练 App 版（不上架）

有两种「像 App」的用法，都**不必上 App Store**：

## 方案 A：加到主画面（立刻可用，推荐先试）

这是网页做成的桌面 App（PWA），不上架、不审核。

1. iPhone 用 **Safari** 打开：  
   https://babycute458-dotcom.github.io/3180class/duilian/
2. 点底部分享按钮（方框 + 箭头）
3. 选 **加入主画面**
4. 以后从桌面图标打开「对练」

这样会用 Safari 的正式环境，麦克风通常比 App 内置浏览器稳。

## 方案 B：真正的 iOS 壳 App（需 Mac + 数据线，仍不上架）

用 Capacitor 包一层原生壳，可用系统语音识别。  
**不能在这台 Linux 云端机编译 iPhone 安装包**，需要你在自己的 Mac 上：

```bash
cd duilian
npm install
npm run build
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor-community/speech-recognition
npx cap init duilian com.babycute.duilian --web-dir dist
npx cap add ios
npx cap sync ios
npx cap open ios
```

然后在 Xcode：

1. 选你的 Apple ID（免费账号即可，装自己手机）
2. Signing：勾选 Automatically manage signing
3. 用数据线连 iPhone → 选你的设备 → Run
4. 手机上若提示「不受信任的开发者」：设置 → 通用 → VPN 与设备管理 → 信任

这样装好的 App **只在你自己手机上**，不会上架、也不会公开分发。

免费 Apple ID 证书大约每 7 天需重新在 Xcode 点一次 Run。

## 为什么网页麦克风在手机上容易失败

iPhone 对浏览器麦克风限制很严；从 Cursor / 微信等 **App 内置浏览器** 打开时更常失败。  
先做方案 A（Safari → 加入主画面）通常就能改善。
