# 对练 App（不上架）— 只有 Windows 笔记本 + iPhone

网页版麦克风在 iPhone 上常常失败。要变成**真正的 App**（用系统语音识别），又没有 Mac，可以走这条路：

> **云端自动打包 IPA → 你在 Windows 用 Sideloadly 装到 iPhone**  
> 不上 App Store、不公开，只装你自己的手机。

---

## 你需要准备

1. Windows 笔记本  
2. iPhone + 数据线  
3. 免费的 Apple ID（登录 iPhone 的那个即可）  
4. 安装 [Sideloadly](https://sideloadly.io/)（Windows 版）

---

## 步骤 A：下载 IPA（云端打包）

1. 打开 GitHub 仓库 Actions：  
   https://github.com/babycute458-dotcom/3180class/actions  
2. 左侧选 **Build duilian iOS IPA (Sideloadly)**  
3. 右边 **Run workflow**  
   - Branch 选：`cursor/duilian-speech-practice-d923`  
4. 等几分钟，点进这次运行 → **Artifacts** → 下载 `duilian-ios-ipa`  
5. 解压后得到 `duilian.ipa`

（若 Actions 里还看不到这个 workflow，等我推送完成后刷新即可。）

---

## 步骤 B：Windows 用 Sideloadly 装到 iPhone

1. iPhone：设置 → 隐私与安全性 → 开发者模式（若有）打开；用数据线连电脑  
2. 打开 Sideloadly  
3. iPhone 插上后应出现在设备列表  
4. Apple 账号：填你的 Apple ID（会在本机签名，密码按提示输入）  
5. IPA：选刚下载的 `duilian.ipa`  
6. 点 Start，等安装完成  
7. iPhone 上：设置 → 通用 → VPN 与设备管理 → 信任你的 Apple ID  
8. 主画面打开 **对练**

免费 Apple ID 大约 **每 7 天**要用 Sideloadly 再装一次（重新签名）。这是不上架、不付费开发者账号的正常限制。

---

## 临时练习（今天就能用）

在你的 **Windows 笔记本** 用 Chrome 打开网页版练习：  
https://babycute458-dotcom.github.io/3180class/duilian/  

电脑版 Chrome 麦克风通常比 iPhone 浏览器稳很多。

---

## 和「加入主画面」的差别

| | Safari 加入主画面 | Sideloadly 安装的 App |
|--|--|--|
| 要不要 Mac | 不用 | 不用（用云端打包） |
| 是不是浏览器内核 | 是（还是 Safari） | 否（原生壳 + 系统语音） |
| 麦克风 | 容易失败 | 用系统识别，稳很多 |
| 上架 | 不用 | 不用 |

---

## 说明

这台帮你写程序的云端机器是 Linux，**不能直接编 iPhone 安装包**；所以改成 GitHub 的 Mac 云端机打包，你在 Windows 安装。
