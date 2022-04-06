import { SidebarConfig } from '@vuepress/theme-default'

export const zh_CN: SidebarConfig = {
  '/zh-CN/guide': [
    {
      text: '软件指南',
      link: '/zh-CN/guide',
      children: [
        '/zh-CN/guide/intro',
        '/zh-CN/guide/start',
        '/zh-CN/guide/preference',
      ]
    }
  ],
  '/zh-CN/tutorial': [
    {
      text: '教程',
      link: '/zh-CN/tutorial',
      children: [
        {
          text: '角色向导',
          children: [
            '/zh-CN/tutorial/frontier',
            '/zh-CN/tutorial/player',
            '/zh-CN/tutorial/packager',
            '/zh-CN/tutorial/translator',
            '/zh-CN/tutorial/modder',
            '/zh-CN/tutorial/developer',
            '/zh-CN/tutorial/contributor',
          ]
        },
        {
          text: '软件使用',
          children: [
          ]
        },
      ]
    }
  ],
  '/zh-CN/manual': [
    {
      text: '手册',
      link: '/zh-CN/manual',
      children: [
        '/zh-CN/manual/changelog',
      ]
    }
  ],
  '/zh-CN/spec': [
    {
      text: '规范',
      link: '/zh-CN/spec',
      children: [
        '/zh-CN/spec/workspace',
        '/zh-CN/spec/translation',
        '/zh-CN/spec/package',
        '/zh-CN/spec/mod',
        '/zh-CN/spec/design',
      ]
    }
  ],
}