# 模组（Mod）规范

> Version: 0.1.0

## 目录结构

```
Mod
  ├─ CSV/             ;新增/覆盖
  ├─ ERB/             ;新增/覆盖
  ├─ DIC/             ;修改
  └─ Meta.toml
```

## Meta.toml 规范

```toml
name = "My Sample Mod"
id = "my_mod" # A-Z_a-z
# You do not have to follow Semver.
version = "0.1.0"
description = "Whatever."
authors = ["Tacit Coder <tacitcoder@gmail.com>"]
license = ""
repository = ""
# plugin/engine/source/mod/dictionary/preset
type = "dictionary"

[dependencies]
emuera = "1824" # Engine
erasqc = "14561" # Source
scd = "0.2.4" # Mod

```

