/**
 * 根据传入的数据判断数据是否为数组类型
 * @param {*} value 传入的数据
 * @returns {Boolean} 返回是否为数组 true || false
 */
const isArray = function(value) {
    return Array.isArray(value)
}
  
export default isArray