import macro_utils from 'macro_utils'
function isExistence (url, param) {
    return url.indexOf(param) > -1
}

/**
 * 路由跳转
 * @memberof url
 * @param {Router} router 路由
 * @returns {Function} 返回跳转的路由
 *
 */
const jumpToPage = (router) => {
    return function (url, target = '_self') {
        const isRouter = !macro_utils.type.inOf(url, 'http://') && !macro_utils.type.inOf(url, 'https://') && router
        if (isRouter) {
            router && router.push && router.push({ path: url })
        } else {
            if (target === '_self') {
                window.location.href = url
            } else {
                window.open(url, target)
            }
        }
    }
}

export default jumpToPage
  