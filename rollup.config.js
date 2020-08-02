import { terser } from 'rollup-plugin-terser'
import { version } from './package.json'

const BANNER = `
/*
 *  lena.js - ${version}
 *  Library for image processing <https://github.com/davidsonfellipe/lena-js/>
 *
 *  Made by Davidson Fellipe.
 *  Released under MIT License
 */
`

export default {
  input: './lib/index.js',
  output: [
    {
      banner: BANNER,
      file: './index.js',
      format: 'cjs',
    },
    {
      banner: BANNER,
      file: './index.min.js',
      format: 'iife',
      name: 'LenaJS',
      plugins: [terser()],
    },
  ],
}
