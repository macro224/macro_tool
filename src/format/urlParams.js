/**
 * 根据传入的链接(string)获取链接后面的参数
 * @param {*} url 传入的链接
 * @returns {Object} 返回参数对象
 */
function formatUrlParams(url) {
    if (typeof url !== 'string') {
        return {}
    }
    let search = url.split('?')[1]
    const params = {}
    if (search) {
        search = search.replace(/#.+$/, '')
        if (search.length > 1) {
            const querys = search.split('&')
            const len = querys.length
            let i = 0
            while (i < len) {
                const query = querys[i].split('=')
                const key = query[0].replace(/\[\]$/, '')
                const val = decodeURIComponent(query[1])
                params[key] = val
                i++
            }
        }
    }
    return params
}
export default formatUrlParams