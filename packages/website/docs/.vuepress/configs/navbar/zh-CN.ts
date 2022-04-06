import { NavbarConfig } from '@vuepress/theme-default'

export const zh_CN: NavbarConfig = [
  {
    text: '指南',
    link: '/zh-CN/guide',
  },
  {
    text: '教程',
    link: '/zh-CN/tutorial',
  },
  {
    text: '手册',
    link: '/zh-CN/manual',
    children: [
      { text: '更新日志', link: '/zh-CN/manual/changelog' }
    ],
  },
  {
    text: '规范',
    link: '/zh-CN/spec',
    children: [
      { text: '工作空间', link: '/zh-CN/spec/workspace', }
    ],
  },
]