# 工作空间（Workspace）规范

>  Version: 0.1.0

## 目录结构

```
Workspace
  ├─ CSV/
  │  ├─ _default.config
  │  ├─ _fixed.config
  │  ├─ _Rename.csv
  │  └─ _Replace.csv
  ├─ ERB/
  │  └─ ...
  ├─ MOD/
  │  ├─ Downloads/              ;Chaos File No Problem
  │  ├─ Mods/                   ;Unziped Standard Folder
  │  ├─ Packages/               ;Unified Generated zip archieves
  │  ├─ Plugins/                ;Plugins only for Era Mod Manager
  │  ├─ Cache.json
  │  └─ Config.toml
  ├─ SAV/
  │  └─ Global.sav
  ├─ emuera.config
  ├─ emuera.log
  ├─ Emuera.exe
  └─ EraModManager.exe
```

