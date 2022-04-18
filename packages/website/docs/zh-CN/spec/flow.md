# 流程

## 程序启动

```flow
start=>start: 启动

entry=>subroutine: Entry
splash=>subroutine: Splash
firstrun=>subroutine: FirstRun
prelude=>subroutine: Prelude
overview=>subroutine: Overview

init=>operation: 初始化配置
load=>operation: 加载配置
scan=>operation: 扫描根目录

mod_exist=>condition: MOD文件夹存在？

start->entry->splash
splash->mod_exist(yes)->prelude
splash->mod_exist(no)->firstrun->init->prelude
prelude->load->scan->overview
```

