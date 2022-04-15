import Sharp from 'sharp'

Sharp('../website/docs/.vuepress/public/favicon.svg', { density: 1024 }).resize(1024).toFile('node_modules/favicon.png')
