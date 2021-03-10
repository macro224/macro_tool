import alias from '@rollup/plugin-alias'
import resolve from  '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'macro_tool',
    file: 'lib/index.js'
  },
  plugins: [
    alias ({
      resolve: ['.js']
    }),
    replace({
      preventAssignment: true
    }),
    resolve(),
    commonjs(),
    json(),
    babel({
      extensions: ['.js'],
      runtimeHelpers: true,
      exclude: ['node_modules/**']
    }),
  ]
};