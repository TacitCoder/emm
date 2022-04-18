# 合集制作者教程

- 导入当前工作空间
- 标注
  - Source
- 成为一项
- 修改
- 出现未存档的修改
- 标注修改
  - 字典







## 极端情况

1. 复制进入一个引擎
2. 标注修改：Engine（新增）
3. 复制进入一堆文件
4. 标注修改：Source（新增）
5. 复制并替换汉化后的ERB
6. 标注修改：替换（也可以生成字典）（替换）
7. 导入字典，预览修改
8. 标注字典成为mod（修改）
9. 

## 实现

1. 复制入一个引擎
2. Sandbox没有该文件，判定新增
3. 标注修改：Engine
4. 打包相关文件进入Mods
5. 打包相关信息进入Presets
6. 根据Preset，操作Mods到Sandbox
7. Sandbox与WS一致
8. 复制进入一堆文件
9. Sandbox没有这些文件，判定新增
10. 标注修改：Source
11. 打包相关文件进入Mods
12. 归档Mods进入Packages
13. 打包相关信息进入Preset
14. 根据Preset，操作Packages到Sandbox
15. Sandbox与WS一致