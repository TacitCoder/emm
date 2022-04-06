import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import { navbar, sidebar } from "./configs";
import { mdEnhance } from "vuepress-plugin-md-enhance";
import { path } from "@vuepress/utils";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/emm/",
  lang: "en-US",
  title: "Era Mod Moanager",
  description: "Era Mod Manager",
  theme: "@vuepress/theme-default",
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  port: 80,
  locales: {
    "/": {
      lang: "en-US",
      title: "Era Mod Manager",
      description: "Not just a module manager for Era games",
    },
    "/ja/": {
      lang: "ja-JP",
      title: "Era Mod Manager",
      description: "Eraゲーム用多機能モジュールマネージャー",
    },
    "/zh-CN/": {
      lang: "zh-CN",
      title: "Era Mod Manager",
      description: "不只是 Era 游戏的模组管理器",
    },
    "/zh-TW/": {
      lang: "zh-TW",
      title: "Era Mod Manager",
      description: "不只是 Era 遊戲的模組管理器",
    },
  },
  themeConfig: {
    logo: "/favicon.svg",
    repo: "tacitcoder/emm",
    locales: {
      "/": {
        selectLanguageName: "English(WIP)",
      },
      "/ja/": {
        selectLanguageName: "日本語(WIP)",
        selectLanguageText: "言語",
        selectLanguageAriaLabel: "言語",
      },
      "/zh-CN/": {
        selectLanguageName: "简体中文",
        selectLanguageText: "语言",
        selectLanguageAriaLabel: "语言",
        editLinkText: "编辑此页",
        docsBranch: "dev",
        lastUpdatedText: "更新时间",
        contributorsText: "作者",
        backToHome: "返回首页",
        notFound: ["你要找的页面不见了！"],
        navbar: navbar.zh_CN,
        sidebar: sidebar.zh_CN,
      },
      "/zh-TW/": {
        selectLanguageName: "繁體中文(WIP)",
        selectLanguageText: "語言",
        selectLanguageAriaLabel: "語言",
      },
    },
  },
  plugins: [
    mdEnhance({
      flowchart: true,
      tasklist: true,
    }),
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "../../src/components"),
      },
    ],
  ],
});
