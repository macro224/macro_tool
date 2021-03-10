import getType from './get'
import isArray from './isArray'
import isPrototype from './isPrototype'
const hasOwnProperty = Object.prototype.hasOwnProperty
/**
 * 检查 value 是否是为空。
 * @param {*} value 传入的值
 * @param {*} space 是否判断空格
 * @returns {boolean} 如果value是空返回true，否则返回false。
 */

function isEmpty(value, space) {
  if (value === null) {
    return true
  }
  if (value === undefined) {
    return true
  }
  if (isArray(value) || typeof value === 'string' || typeof value.splice === 'function') {
    return space ? !value.trim().length : !value.length
  }
  const tag = getType(value)
  if (tag === 'map' || tag === 'set') {
    return !value.size
  }
  if (tag === 'number') {
    return value <= 0
  }
  if (isPrototype(value)) {
    return !Object.keys(value).length
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}

export default isEmpty
