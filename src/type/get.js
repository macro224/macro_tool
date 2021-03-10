import toString from './toString'

const config = {
  '[object Boolean]': 'boolean',
  '[object Number]': 'number',
  '[object String]': 'string',
  '[object Undefined]': 'undefined',
  '[object Null]': 'null',
  '[object Array]': 'array',
  '[object Object]': 'object',
  '[object Function]': 'function',
  '[object Symbol]': 'symbol',
  '[object Date]': 'date',
  '[object Json]': 'json',
  '[object Set]': 'set',
  '[object Map]': 'map'
}

/**
 * 根据传入的数据判断数据类型
 * @param {*} value 传入的数据
 * @returns {String} 返回该数据的类型
 */
function get(value) {
  const key = toString.call(value)
  const type = config[key]
  if (type === undefined) {
    throw new Error(`暂不支持判断 ${key} 类型，请联系开发维护人员进行添加`)
  }
  return type
}

export default get
