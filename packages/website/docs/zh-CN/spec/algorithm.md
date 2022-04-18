# 算法

## 文件目录Diff

sss<Badge text="123" type="warning" />

- 无改动
- 有改动，未跟踪
  - Untracked
- 有改动，已跟踪
  - Added
  - Modified
  - Deleted

### 文件(夹)状态

```flow
start=>start: 开始
dir=>parallel: 目录
add=>operation: add
unchange=>operation: Unchange
unchanged=>operation: Unchanged
end=>end: 结束



start->dir
dir(path1)->add
dir(path2)->unchange
```



Undefined

Untracker

New

Untracked

Added

Modified

Deleted

### 标记A，U，M，D

### Root



### Sandbox

