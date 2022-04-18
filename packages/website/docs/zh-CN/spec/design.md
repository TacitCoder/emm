# 界面设计规范

## 设计

EMM 的设计主要参考了 [Material Design 3 (Material You)](https://m3.material.io/)。

具体地说，参考了 MD3 设计中的：

- Token；
- 色彩系统；
  - HCT 色彩系统；
  - 基于 State 的颜色衍生；

在 MD3 的基础上，应用了适用于文字为主的样式，具体如下：

-

## 排版设计

使用 Span Charm 设计语言。

```stylus
:root
    line-height 1.5rem
:hover
    .state
        opacity var(--sc-sys-state-hover-opacity)
```

## 色彩

- Background
  - Container：background
  - State：
    - Hover：state-hover
    - Active：state-pressed
  - Content：on-background
- Container
  - 类型
    - -
    - container
  - 重要性
    - 重要：primary
    - 次要：secondary
    - 不重要：tertiary
  - ## 状态
- State
  - 状态
    - hover：
    - active：
- Content
- Surface
  - Elevated +1
    - Content
      - Primary
      - Opacity
      -

## 表面提升

```css
surface1
background-color:1
box-shadow:
  0px 1px 2px rgba(0, 0, 0, 0.3),
  0px 1px 3px 1px rgba(0, 0, 0, 0.15);
surface2
background-color:2
box-shadow:
  0px 1px 2px rgba(0, 0, 0, 0.3),
  0px 2px 6px 2px rgba(0, 0, 0, 0.15)
surface3
background-color:3
box-shadow:
  0px 1px 3px rgba(0, 0, 0, 0.3),
  0px 4px 8px 3px rgba(0, 0, 0, 0.15)
surface4
background-color:4
box-shadow:
  0px 2px 3px rgba(0, 0, 0, 0.3),
  0px 6px 10px 4px rgba(0, 0, 0, 0.15)
surface5
background-color:5
box-shadow:
  0px 4px 4px rgba(0, 0, 0, 0.3),
  0px 8px 12px 6px rgba(0, 0, 0, 0.15)

```
