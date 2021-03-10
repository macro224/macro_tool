function formatTime(date, obj, division = '/') {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    
    return obj ? {year, month, day, hour, minute, second} 
    : 
    [year, month, day].map(formatNumber).join(division) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    return n < 10 ? '0' + n : n
}

export default formatTime
