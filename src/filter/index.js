
//字数限制长度
exports.ellipsis = function (value, count = 9) {
    if (!value) return ''
    if (value.length > count) {
        return value.slice(0, count) + '...'
    }
    return value
}