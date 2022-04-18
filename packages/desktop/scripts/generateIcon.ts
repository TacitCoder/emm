import Sharp from 'sharp'
import { run } from '../../../scripts/utils'

Sharp('../website/docs/.vuepress/public/favicon.svg', { density: 4096 }).resize(1024).toFile('node_modules/favicon.png')
run('tauricon', ['node_modules/favicon.png'])
