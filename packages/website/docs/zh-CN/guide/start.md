# 快速开始

## 环境配置

- 除非是全新安装的最新版Win11操作系统，否则都需要安装 [Microsoft Edge WebView2 Evergreen Bootstrapper](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section)（打开后点击页面左下角的`Download`按钮下载）。
  - 下载完毕后运行`MicrosoftEdgeWebview2Setup.exe`安装。
- 最新版 [Microsoft Visual C++ 2015-2022 可再发行程序包](https://aka.ms/vs/17/release/vc_redist.x64.exe)（点击链接直接下载）
  - 下载完毕后运行`VC_redist.x64.exe`安装。

## 下载、安装与卸载

- 最新版程序下载请移步[此处](https://github.com/TacitCoder/emm/releases/latest)；
  - Windows x64：`*-windows-x64.zip`【推荐】
  - Windows x86：`*-windows-x86.zip`
  - Linux：`*-linux-x86.zip`
  - Mac OS x64：`*-osx-x64.zip`
  - Mac OS x86：`*-osx-x86.zip`
- 无须安装，解压即可运行；
- 卸载时，直接将**程序**及`MOD`文件夹删除即可。
  - 注意：删除`MOD`文件夹会导致游戏相关资源（模组）被删除，请谨慎操作。

::: tip 我们的承诺
本软件仅含一个孤立的`.exe`文件，运行时只会在程序旁边生成一个名为`MOD`的文件夹，绝不会在除程序所在文件夹之外生成任何数据。
:::

## 开始使用

::: warning 提示
本程序运行时会在所在文件夹进行文件夹与文件的新增与删除操作，因此，推荐在**第一次**运行之前，将本程序放置于空文件夹中，以免程序出错或误删数据。
:::

双击打开即可。

## 常见报错及解决方案

::: warning 常见报错

如果提示<b style="color:Orange">找不到VCRUNTIME140.dll</b>，

或是提示<b style="color:Orange">找不到VCRUNTIME140_1.dll</b>，

说明操作系统的VC运行库版本过低，请参考[环境配置](#环境配置)进行操作。

:::

::: warning 常见报错

如果打开程序后发现<b style="color:Orange">程序闪退</b>，

说明 WebView2 运行库尚未安装，请参考[环境配置](#环境配置)进行操作。

:::

## 下一步

本文档针对不同使用者编写了具有针对性的使用教程，请通过下列入口进入你感兴趣的使用教程：

- [**开荒者**](../tutorial/frontier)：EMM 初次面世，还无法直接用于现有的 Era 生态，需要一些支持 EMM 理念的同学加入其中：将现有的游戏资源，如游戏引擎、游戏脚本、字典等素材重新打包，以打造适合 EMM 使用的环境。但好消息是，EMM 为这种使用场景进行了量身定制，能提供最高等级的支持。
- [**游戏玩家**](../tutorial/player)：刚刚下载好一个游戏压缩包？也许你根本不需要看本教程。但如果你想要在现有游戏的基础上进行一些小小“定制”，那么你来对了地方；
- [**合集制作者**](../tutorial/packager)：制作合集就像烹饪，而你知道怎样的搭配能发挥出食材的最佳风味，将手上收集的模组组合起来，生成的是又一款功能更丰富，更有趣的新配方，分享给更多人吧！
- [**生肉翻译者**](../tutorial/translator)：没有人会要求游戏开发者必须学会一切外语，而这同样也不是对玩家的要求，那么，就到了你出场的时候！想要体验什么叫“有监督的自动翻译”吗？可以在这里了解。
- [**模组开发者**](../tutorial/modder)：想要在游戏里加入更多、更妙的玩法？来这里，遇到更少的Bug，更多的快乐。
- [**游戏开发者**](../tutorial/developer)：终于，无论出于怎样的想法，你要开始打算平地起高楼了。那么，和以往不同，现在也许有人已经给你提前做好了准备，打好了地基。也许你可以把更多心思放在游戏内容而不是代码上……
- [**程序开发者**](../tutorial/contributor)：想要参与 EMM 的开发？那也许你会被我气死，但，不怕的话就来吧！
