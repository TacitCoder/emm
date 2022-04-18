# 开荒者教程

欢迎！现在还有许多资源没有适配 EMM，我们需要你！

## 目的

我们需要像庖丁解牛一般，将一个完整的游戏作品模块化，从而能够让后续的同学通过简单的模块管理工作就达到期望的效果。

![](https://img.shields.io/badge/EMM-Ready-success?style=flat-square&link=https://github.com/TacitCoder/emm)

![](https://img.shields.io/badge/EMM TYPE-Engine-success?style=flat-square&link=https://github.com/TacitCoder/emm)

![](https://img.shields.io/badge/EMM TYPE-Source-success?style=flat-square&link=https://github.com/TacitCoder/emm)

![](https://img.shields.io/badge/EMM TYPE-Save-success?style=flat-square&link=https://github.com/TacitCoder/emm)

![](https://img.shields.io/badge/EMM TYPE-Mod-success?style=flat-square&link=https://github.com/TacitCoder/emm)

我们通过一个示例来梳理整个过程。

- 生肉：完全未被翻译的游戏源代码
- 替换性翻译：以少量被完全翻译的文件为单位的替换性ERB文件
- 字典：多种格式的替换性文件
- 补丁：
- 口上：
- 魔改：
- 替换性翻译
- 字典
- 补丁





1. 下载一个生肉游戏；
2. 收集

## 获取游戏资源

## 分离、标注并打包游戏引擎

::: tip 提示

你知道，引擎几乎每个现存分发的游戏都自带一个，所以现在打包的引擎其他人几乎都有，所以可能在未来完全用不上，但不管怎样，这至少告诉我们，引擎也可以是一个模块，我们可以像管理模块一样管理引擎。

:::

1. 启动程序（后面使用时启动也可以）
2. 将引擎文件放入文件夹
3. 程序会自动显示引擎的可执行文件为新增改动；
   1. 配方界面会显示有未标记的变更
   2. 文件管理器界面会显示引擎的可执行文件为新增的未标记变更
4. 选择未标记变更，在弹出菜单中选择“将变更标注为新的模块”
5. 新的模组会创建
   1. 配方界面的最下方会生成一个新的包
   2. 模组管理界面会新增一个包

## 分离、标注并打包游戏脚本

> 游戏脚本就是指游戏开发者主要编写的游戏脚本，既可以是游戏作者发布的原版，也可以是被多人转手并修改之后的游戏脚本终版，出于历史原因，许多脚本已经完全融入进原版之中，难以再分离出来分别进行打包，因此，我们一律将这类型视为游戏脚本，但很显然，不同的游戏，脚本是不同的，因此我们需要对游戏脚本进行更加细致的区分，而这种区别常常需要体现在模块的ID上。



## 分离、标注并打包翻译文件

> 翻译文件可以是常用的“字典”。