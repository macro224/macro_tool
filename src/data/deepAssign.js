import getType from '../type/get.js'

function deepAssignObject (obj) {
  if (obj === null) return null
  if (typeof obj !== 'object') return obj
  if (obj.constructor === Date) return new Date(obj)
  const newObj = new obj.constructor() // 保持继承链
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) { // 不遍历其原型链上的属性
      const val = obj[key]
      newObj[key] = typeof val === 'object' ? deepAssignObject(val) : val // 使用递归处理嵌套
    }
  }
  return newObj
}

function deepAssignArray (arr) {
  const newArr = []
  for (let i = 0; i < arr.length; ++i) {
    const type = getType(arr[i])
    newArr[i] = (type === 'object' || type === 'date') ? deepAssignObject(arr[i]) : arr[i]
  }
  return newArr
}

/**
 * 根据传入的数据判断数据类型
 * @param {*} obj 传入的数据
 * @returns {*} 如果传入的是 对象||数组 则返回copy后数据,否则返回字符串提示
 */
const deepAssign = function (...obj) {
  // 参数数量为1
  if (obj.length === 0) {
    throw new Error('请输入深拷贝参数')
  }
  if (obj.length > 1) {
    throw Error('只处理单参情况，不支持多参')
  }
  // 除数组和对象外，提示错误信息
  let result = Object.create(null)
  switch (getType(obj[0])) {
    case 'array':
      result = deepAssignArray(obj[0])
      break
    case 'object':
      result = deepAssignObject(obj[0])
      break
    default:
      throw Error('只处理数组和对象，不支持其他类型')
  }
  return result
}

export default deepAssign
