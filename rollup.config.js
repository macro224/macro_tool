import alias from '@rollup/plugin-alias'
import resolve from  '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'

const { files: input } = require('./build/inputs')

export default {
  input: input,
  output: {
    dir: 'lib',
    format: 'amd'
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