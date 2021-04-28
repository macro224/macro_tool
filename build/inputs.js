const path = require('path')
const requireContext = require('require-context')

const files = []
const fileArr = requireContext(path.join(__dirname, '../src'), false, /\.js$/).keys()
fileArr.forEach(v => {
    files.push('src/' + v)
})

module.exports = {
    files
}