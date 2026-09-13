# GlassTab — AI 开发计划

> 一个具有 macOS / Liquid Glass 风格的现代浏览器新标签页。
> 核心体验：**Liquid Glass + 灵动岛 + 多桌面 + 桌面分类 + Widget + 网页快捷方式**。
>
> 开发目标：优先做出视觉优秀、交互流畅、架构清晰的 MVP，然后逐步扩展。

---
# 不要在本地构建 做好一个板块告诉我 我自己使用github提交/构建

# 1. 产品定位

GlassTab 是一个替代浏览器默认 New Tab 的现代化个人工作空间。

用户打开新标签页后，可以看到：

* 顶部桌面分类
* 当前桌面名称
* Liquid Glass 风格的导航栏
* 中央灵动岛 / Dynamic Island
* 当前时间、日期
* Widget 小组件
* 自定义网页快捷方式
* 多个独立桌面
* 不同桌面拥有不同的 Widget 和快捷方式
* 桌面可以按照「工作 / 学习 / 娱乐 / 音乐 / 开发」等分类管理

核心理念：

> 「不是一个书签页，而是浏览器里的个人桌面。」

---

# 2. 技术栈

## 前端

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Radix UI
* Framer Motion
* Lucide Icons

## 浏览器扩展

采用：

**Manifest V3**

目录结构：

```text
GlassTab
├── extension
│   ├── manifest.json
│   ├── background
│   └── content
│
├── src
│   ├── components
│   ├── widgets
│   ├── pages
│   ├── hooks
│   ├── store
│   ├── lib
│   ├── types
│   └── styles
│
├── public
│
├── package.json
└── vite.config.ts
```

目标浏览器：

第一阶段：

* Chrome
* Microsoft Edge

第二阶段：

* Firefox
* Arc / Chromium 系浏览器

---

# 3. 数据存储策略

第一版采用：

**Local-first**

不需要服务器。

主要使用：

```text
IndexedDB
```

保存：

* 桌面
* 分类
* Widget
* 快捷方式
* 用户设置
* 壁纸
* 主题
* Widget 配置

简单设置可以使用：

```text
chrome.storage.local
```

例如：

```ts
interface AppSettings {
  theme: "light" | "dark" | "system"
  blurAmount: number
  glassOpacity: number
  wallpaper?: string
  accentColor: string
  animations: boolean
}
```

---

# 4. 核心数据模型

## Workspace

```ts
interface Workspace {
  id: string
  name: string
  icon?: string
  categoryId?: string
  order: number

  widgets: WidgetInstance[]
  shortcuts: Shortcut[]
}
```

## Category

```ts
interface Category {
  id: string
  name: string
  icon?: string
  order: number
}
```

例如：

```text
全部
├── 工作
├── 学习
├── 娱乐
├── 音乐
└── 开发
```

---

# 5. Widget 系统

Widget 必须采用插件化设计。

不要把所有 Widget 写死在 Home 页面。

设计：

```text
WidgetRegistry
        ↓
Widget Definition
        ↓
Widget Instance
        ↓
Widget Renderer
```

例如：

```ts
interface WidgetDefinition {
  type: string
  name: string
  description: string
  icon: LucideIcon

  defaultSize: {
    width: number
    height: number
  }

  component: React.ComponentType
}
```

第一批 Widget：

### ① Clock

显示：

```text
17:48

Saturday
September 12
```

支持：

* 12 / 24 小时制
* 显示秒
* 显示日期
* 不同字体

---

### ② Pomodoro

番茄钟：

```text
25:00

Focus

      ▶
```

支持：

* Focus
* Short Break
* Long Break
* 自定义时间
* 开始
* 暂停
* 重置
* 自动进入下一阶段
* 声音提醒

可以与之前的 FocusFlow 思路兼容，但第一版不要做复杂的任务系统。

---

### ③ Todo

类似：

```text
Today

□ Finish homework
□ Practice piano
□ Read book

+ Add task
```

支持：

* 添加任务
* 删除任务
* 完成任务
* 编辑任务
* 优先级
* 今日任务

---

### ④ Quick Links

显示：

```text
YouTube
GitHub
ChatGPT
Spotify
Discord
```

支持：

* favicon
* 名称
* URL
* 自定义图标
* 拖动排序

---

### ⑤ Weather

第二阶段开发。

显示：

```text
72°

Los Angeles

Sunny
```

天气 API 需要用户主动授权位置或者手动输入城市。

---

### ⑥ Music

第二阶段。

用于显示当前播放歌曲。

---

# 6. 快捷方式系统

用户可以点击：

```text
+
```

添加网页。

弹窗：

```text
Add Website

Name
[ YouTube              ]

URL
[ https://youtube.com  ]

Icon
[ Auto detect ]

        Cancel    Add
```

自动获取：

* 网站 favicon
* 网站标题

数据：

```ts
interface Shortcut {
  id: string
  title: string
  url: string
  icon?: string
  order: number
}
```

---

# 7. 多桌面系统

这是 GlassTab 的核心功能之一。

例如：

```text
        All     Work     Study     Music     Dev
```

点击：

```text
Music
```

整个页面切换成音乐工作空间。

例如：

### Music

```text
┌───────────────────────────┐
│  Spotify                  │
│                           │
│  YouTube                  │
│                           │
│  Pomodoro                 │
└───────────────────────────┘
```

### Study

```text
┌───────────────────────────┐
│ Todo                      │
│                           │
│ Clock                     │
│                           │
│ YouTube                   │
└───────────────────────────┘
```

### Dev

```text
GitHub
ChatGPT
Stack Overflow
Todo
Pomodoro
```

---

# 8. 桌面分类系统

顶部不要简单做成普通 Tab。

应该设计成：

```text
             GlassTab

   All    Work    Study    Music    Dev
          ─────
```

每一个分类可以：

* 点击切换
* 拖动排序
* 新建
* 重命名
* 删除
* 设置图标

例如：

```text
+ Add Category
```

点击后：

```text
New Category

Name
[ Music ]

Icon
[ 🎵 ]

             Create
```

---

# 9. Liquid Glass UI

这是整个项目最重要的视觉部分。

不要简单使用：

```css
background: rgba(...)
backdrop-filter: blur(...)
```

然后到处复制。

应该建立统一的：

```text
Glass Design System
```

---

# 10. Glass Design Tokens

定义：

```css
--glass-bg
--glass-border
--glass-shadow
--glass-blur
--glass-highlight
--glass-radius
```

例如：

```text
Glass 1
Glass 2
Glass 3
Glass Floating
Glass Interactive
Glass Modal
```

不同层级具有不同：

* blur
* opacity
* border
* shadow
* saturation

---

# 11. GlassCard

所有 Widget 默认使用：

```text
GlassCard
```

而不是自己实现背景。

例如：

```tsx
<GlassCard>
  <ClockWidget />
</GlassCard>
```

GlassCard 负责：

* 背景
* 毛玻璃
* 边框
* 阴影
* hover
* active
* transition

这样整个项目可以保持统一视觉。

---

# 12. Dynamic Island

顶部设计一个类似 Apple Dynamic Island 的中央组件。

默认状态：

```text
             ┌───────────────┐
             │  17:48  ☀️   │
             └───────────────┘
```

它不是静态装饰，而应该成为：

**全局状态中心。**

---

# 13. Dynamic Island 状态

普通：

```text
17:48
```

番茄钟运行：

```text
🍅 24:31
```

音乐播放：

```text
♫ Avicii — The Nights
```

任务完成：

```text
✓ Task completed
```

系统通知：

```text
✓ Saved
```

点击 Dynamic Island：

展开：

```text
┌───────────────────────────────┐
│                               │
│       🍅 Focus                │
│                               │
│           24:31               │
│                               │
│       Pause     Stop          │
│                               │
└───────────────────────────────┘
```

使用：

```text
Framer Motion
```

实现：

* morph animation
* spring
* scale
* blur
* opacity
* layout animation

---

# 14. 动画原则

动画必须：

**少而精。**

禁止：

* 页面到处飞
* 无限循环动画
* Widget 不停晃动
* 过度弹跳

推荐：

```text
ease-out
spring
200–400ms
```

重点动画：

### Workspace 切换

旧桌面：

```text
opacity ↓
scale ↓
```

新桌面：

```text
opacity ↑
scale ↑
```

### Widget Hover

轻微：

```text
translateY(-2px)
scale(1.01)
```

### Dynamic Island

使用：

```text
layoutId
AnimatePresence
spring
```

---

# 15. 页面布局

默认页面：

```text
┌──────────────────────────────────────────────┐
│                                              │
│              category navigation             │
│                                              │
│                  Dynamic                     │
│                   Island                     │
│                                              │
│                                              │
│          Hello, Good Evening                 │
│                                              │
│       ┌─────────┐  ┌─────────┐              │
│       │ Clock   │  │ Todo    │              │
│       └─────────┘  └─────────┘              │
│                                              │
│       ┌──────────────────────┐              │
│       │      Pomodoro        │              │
│       └──────────────────────┘              │
│                                              │
│              Quick Links                     │
│                                              │
│       ○       ○       ○       ○              │
│                                              │
└──────────────────────────────────────────────┘
```

注意：

**不要固定成传统 Dashboard 网格。**

应该有类似 macOS 桌面 / Spatial UI 的感觉。

---

# 16. Widget Grid

采用：

```text
CSS Grid
```

例如：

```text
12 columns
```

Widget 可以拥有：

```text
1 × 1
2 × 1
2 × 2
3 × 2
4 × 2
```

例如：

```text
Clock       Todo

Pomodoro    Pomodoro

Quick Links Quick Links
```

---

# 17. Widget 编辑模式

点击：

```text
Customize
```

进入编辑状态。

Widget 出现：

```text
┌─────────────────────┐
│ ⋮⋮             ⚙ × │
│                     │
│       Clock         │
│                     │
└─────────────────────┘
```

支持：

* 拖动
* 调整大小
* 删除
* 设置
* 添加 Widget

---

# 18. Add Widget UI

右上角：

```text
+
```

打开：

```text
Add Widget

┌────────────┐ ┌────────────┐
│ 🕐 Clock   │ │ ✓ Todo     │
│            │ │            │
└────────────┘ └────────────┘

┌────────────┐ ┌────────────┐
│ 🍅 Focus   │ │ 🔗 Links   │
│            │ │            │
└────────────┘ └────────────┘
```

使用：

```text
Dialog
Popover
Command
```

等 shadcn/ui 组件。

---

# 19. Context Menu

桌面空白区域右键：

```text
Add Widget
Add Website
Customize
Change Wallpaper
Create Workspace
Settings
```

快捷方式右键：

```text
Open
Edit
Move
Delete
```

Widget 右键：

```text
Settings
Resize
Move
Remove
```

---

# 20. Wallpaper

支持：

* 纯色
* 渐变
* 图片
* 本地图片

背景应该始终位于 Glass UI 下面。

结构：

```text
Wallpaper
    ↓
Background Overlay
    ↓
Glass UI
    ↓
Widgets
```

建议提供：

```text
Blur
Brightness
Saturation
Overlay
```

避免壁纸导致文字看不清。

---

# 21. macOS 风格

视觉参考方向：

* macOS Tahoe / macOS 系统 UI
* Apple Liquid Glass
* Dynamic Island
* Arc Browser
* Raycast
* Things
* Craft

---

# 22. 响应式设计

虽然主要运行在浏览器 New Tab，但必须考虑不同窗口大小。

### 超宽屏

```text
最大内容宽度：
1400–1600px
```

### 普通桌面

```text
1200px
```

### 小窗口

Widget 自动重新布局。

例如：

```text
4 columns
↓
3 columns
↓
2 columns
```

---

# 23. 键盘快捷键

提供：

```text
Ctrl + K
```

打开 Command Palette。

例如：

```text
Search GlassTab

> Add Widget
> Add Website
> Switch Workspace
> Start Pomodoro
> Open Settings
```

支持：

```text
↑ ↓
Enter
Esc
```

---

# 24. Command Palette

可以搜索：

```text
YouTube
GitHub
Music
Work
Study
Pomodoro
Settings
```

例如输入：

```text
pom
```

出现：

```text
🍅 Start Pomodoro
🍅 Open Pomodoro
```

---

# 25. 搜索功能

顶部可以提供：

```text
Search the web...
```

默认：

```text
Google
```

设置中支持：

```text
Google
Bing
DuckDuckGo
Brave
自定义搜索 URL
```

搜索框不要占据整个页面。

应该融入 Dynamic Island / Glass UI。

---

# 26. 设置页面

Settings 分成：

```text
General
Appearance
Widgets
Workspaces
Shortcuts
Search
Keyboard
About
```

Appearance：

```text
Theme
○ System
○ Light
○ Dark

Glass

Blur
──────●────

Opacity
──────●────

Border
──────●────

Animation
[ ON ]
```

---

# 27. 数据导入导出

必须支持：

```text
Export
Import
```

导出：

```text
glass-tab-backup.json
```

内容包括：

* Workspaces
* Categories
* Widgets
* Shortcuts
* Settings

这样用户换电脑后可以恢复。

---

# 28. 数据安全

默认：

**所有用户数据存储在本地。**

第一版：

不需要：

* 登录
* 用户账号
* 云数据库
* 后端

不要为了所谓「全平台同步」提前引入复杂后端。

---

# 29. 后续同步架构

未来如果需要同步：

```text
Browser
    ↓
Sync Service
    ↓
Cloud
```

可以加入：

* Supabase
* Firebase
* 自建 API

但第一版必须保持：

```text
Local-first
```

避免过度工程化。

---

# 30. Manifest V3

需要配置：

```json
{
  "manifest_version": 3,
  "name": "GlassTab",
  "version": "0.1.0",
  "chrome_url_overrides": {
    "newtab": "index.html"
  }
}
```

New Tab 是整个产品的核心。

---

# 31. 性能要求

New Tab 必须做到：

```text
打开即显示
```

目标：

* 首屏尽快渲染
* 避免大型依赖
* 图片懒加载
* Widget 按需加载
* 动画 GPU 加速
* 避免不必要 React re-render

特别注意：

**不要让毛玻璃效果导致 GPU 长时间高负载。**

在大量 Widget 的情况下需要控制：

```css
backdrop-filter
```

的使用数量。

---

# 32. 状态管理

推荐：

```text
Zustand
```

Store：

```text
workspaceStore
widgetStore
shortcutStore
settingsStore
uiStore
```

例如：

```ts
useWorkspaceStore()
useWidgetStore()
useSettingsStore()
```

避免所有东西塞进一个巨大 Store。

---

# 33. 组件结构

推荐：

```text
components/
│
├── glass/
│   ├── GlassCard
│   ├── GlassButton
│   ├── GlassPanel
│   └── GlassDialog
│
├── navigation/
│   ├── CategoryBar
│   ├── WorkspaceSwitcher
│   └── CommandPalette
│
├── dynamic-island/
│   ├── DynamicIsland
│   ├── IslandContent
│   └── IslandExpanded
│
├── widgets/
│   ├── WidgetGrid
│   ├── WidgetCard
│   ├── WidgetPicker
│   └── WidgetEditor
│
├── shortcuts/
│   ├── ShortcutGrid
│   ├── ShortcutCard
│   └── AddShortcutDialog
│
└── settings/
```

---

# 34. 开发阶段

## Phase 0 — 项目初始化

完成：

* Vite
* React
* TypeScript
* Tailwind
* shadcn/ui
* Framer Motion
* Zustand
* Lucide
* Manifest V3

目标：

```text
npm run build
```

能够生成浏览器 Extension。

---

# Phase 1 — Glass Design System

开发：

* GlassCard
* GlassButton
* GlassPanel
* GlassDialog
* GlassPopover
* GlassInput
* GlassDropdown

先不要做 Widget。

目标：

**先把 UI 视觉打磨好。**

---

# Phase 2 — New Tab 基础页面

实现：

* 壁纸
* 时间
* 日期
* CategoryBar
* Dynamic Island
* 基础布局

此时页面应该已经具有完整产品观感。

---

# Phase 3 — Workspace

实现：

* 创建 Workspace
* 删除 Workspace
* 重命名
* 分类
* 排序
* Workspace 切换动画

完成：

```text
All
Work
Study
Music
Dev
```

---

# Phase 4 — Widget Framework

实现：

* Widget Registry
* Widget Instance
* Widget Grid
* Add Widget
* Remove Widget
* Drag
* Resize
* Widget Settings

然后开发：

1. Clock
2. Todo
3. Pomodoro
4. Quick Links

---

# Phase 5 — Dynamic Island

把 Dynamic Island 和 Widget 系统连接起来。

例如：

Pomodoro 开始：

```text
Widget
 ↓
Global Timer State
 ↓
Dynamic Island
```

Dynamic Island 显示：

```text
🍅 24:31
```

点击展开：

```text
Focus
24:31

Pause
Stop
```

---

# Phase 6 — Shortcuts

实现：

* Add Website
* Edit
* Delete
* favicon
* Drag
* Open
* Context Menu

---

# Phase 7 — Command Palette

实现：

```text
Ctrl + K
```

并接入：

* Workspace
* Widget
* Shortcut
* Pomodoro
* Settings

---

# Phase 8 — Customization

增加：

* Light / Dark
* System
* Wallpaper
* Glass blur
* Glass opacity
* Accent
* Animation
* Search engine

---

# Phase 9 — Data Persistence

完成：

```text
IndexedDB
+
chrome.storage.local
```

要求：

关闭浏览器：

```text
数据不丢失
```

重启浏览器：

```text
恢复原状态
```

---

# Phase 10 — Import / Export

完成：

```text
Export JSON
Import JSON
Reset
```

并加入数据版本：

```ts
schemaVersion: 1
```

为未来数据迁移做准备。

---

# Phase 11 — Extension Packaging

测试：

```text
Chrome
Edge
```

验证：

* New Tab override
* Storage
* favicon
* animations
* permissions
* CSP
* production build

---

# 35. MVP 定义

第一版不要做太多东西。

MVP 必须包含：

### UI

* Liquid Glass
* Dynamic Island
* Wallpaper
* Dark / Light
* Smooth animations

### Workspace

* 多桌面
* 分类
* 切换
* 创建
* 删除

### Widget

* Clock
* Todo
* Pomodoro
* Quick Links

### Shortcut

* 添加
* 编辑
* 删除
* favicon

### 系统

* Local storage
* Import / Export
* Settings

### 快捷键

```text
Ctrl + K
```

---

# 36. 暂时不要开发

第一版禁止 AI 擅自加入：

* 用户登录
* 云同步
* 社交功能
* 后端
* AI Assistant
* 在线 Widget Marketplace
* 插件市场
* 复杂天气系统
* 音乐 API
* 账户系统

这些全部放到：

```text
Future
```

---

# 37. Future Roadmap

未来可以加入：

### Cloud Sync

```text
Chrome
    ↕
Cloud
    ↕
Edge
```

### AI Widget

例如：

```text
AI Daily Brief
```

### Calendar

```text
Google Calendar
Outlook
Apple Calendar
```

### Music

```text
Spotify
Apple Music
YouTube Music
```

### Weather

```text
Weather Widget
```

### Browser Tab

显示：

```text
Recently Closed
Recent Tabs
```

### Marketplace

允许第三方开发：

```text
GlassTab Widgets
```

---

# 38. AI Agent 开发规则

AI Coding Agent 必须遵守：

## Rule 1

不要一次实现整个项目。

必须严格按照：

```text
Phase 0
↓
Phase 1
↓
Phase 2
...
```

逐阶段完成。

## Rule 2

每完成一个 Phase：

```text
TypeScript check
Lint
Build
```

必须通过后才能继续。

## Rule 3

不要为了实现功能而破坏 UI。

UI 是项目的一级需求。

## Rule 4

不要重复实现 Glass UI。

所有 Glass 元素必须优先使用：

```text
GlassCard
GlassPanel
GlassButton
```

等 Design System。

## Rule 5

Widget 必须模块化。

未来添加：

```text
Weather
Calendar
Music
AI
```

不应该修改 Widget Grid 核心逻辑。

## Rule 6

不要硬编码数据。

Workspace / Widget / Shortcut 都必须来自 Store。

## Rule 7

不要使用过量动画。

动画必须服务于：

```text
层级
状态
反馈
空间变化
```

而不是装饰。

---

# 39. 每个 Phase 的完成标准

AI 完成阶段后必须输出：

```text
## Completed

- [x] Feature A
- [x] Feature B
- [x] Feature C

## Tests

- TypeScript: PASS
- ESLint: PASS
- Build: PASS

## Files Changed

...

## Known Issues

...

## Next Phase

...
```

---

# 40. 最终产品视觉目标

最终打开 New Tab：

```text
                 Work   Study   Music   Dev
                         ─────

                    ╭────────────╮
                    │  17:48 ☀  │
                    ╰────────────╯


                 Good evening.


          ╭──────────╮   ╭──────────────╮
          │          │   │              │
          │  17:48   │   │    Today     │
          │          │   │   □ Task     │
          ╰──────────╯   ╰──────────────╯


             ╭────────────────────╮
             │                    │
             │      🍅 25:00      │
             │                    │
             │         ▶          │
             ╰────────────────────╯


              YouTube   GitHub
              Spotify   ChatGPT


                         +
```

整体感觉应该是：

**macOS + Liquid Glass + Arc + Dynamic Island + 极简个人 Dashboard**

而不是：

**传统 Chrome New Tab + 一堆卡片。**

---

# 41. 第一优先级排序

如果开发资源有限，严格按照这个优先级：

```text
★★★★★ Liquid Glass UI
★★★★★ Workspace
★★★★★ Dynamic Island
★★★★★ Widget System
★★★★☆ Pomodoro
★★★★☆ Todo
★★★★☆ Shortcut
★★★☆☆ Command Palette
★★★☆☆ Customization
★★☆☆☆ Weather
★★☆☆☆ Music
★☆☆☆☆ Cloud Sync
```

核心竞争力不是功能数量。

而是：

> **打开新标签页的一瞬间，就觉得这个东西“很漂亮、很顺手、很像一个真正的桌面”。**

---

# 42. AI Agent 第一条任务

AI Agent 不应该直接开始写全部功能。

第一阶段只执行：

```text
Initialize the GlassTab project.

Set up:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI
- Framer Motion
- Lucide Icons
- Zustand
- Manifest V3

Create the project architecture described in this plan.

Do NOT implement widgets yet.

First create the Glass Design System and a minimal New Tab shell.

After implementation:

1. Run TypeScript check.
2. Run ESLint.
3. Run production build.
4. Verify the extension can load as an unpacked Chrome extension.
5. Report all changed files and remaining issues.

Do not proceed to Phase 2 until Phase 1 is verified.
```

---

# 43. 最终原则

GlassTab 的开发必须遵循：

```text
Beautiful first
↓
Simple architecture
↓
Local-first
↓
Modular widgets
↓
Smooth interaction
↓
Progressive enhancement
```

**不要为了“功能很多”牺牲体验。**

第一版宁愿只有 4 个 Widget，也必须做到：

> **漂亮、流畅、稳定、像一个真正的操作系统桌面。**
