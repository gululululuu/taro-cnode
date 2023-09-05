export const formatTime = (time) => {
    if (!time && typeof time !== 'number') {
        return ""
    }
    let localTime = ""
    // time = new Date(time).getTime()
    // const offset = (new Date()).getTimezoneOffset()
    // localTime = (new Date(time - offset * 60000)).toLocaleString('zh-cn', { hour12: false });
    localTime += time.split('T')[0] + ' ';
    localTime += time.split('T')[1].split('.')[0];
    return localTime
}

export const fromNowTime = (oldTime) => {
    const time = formatTime(oldTime)
    const timeNow = new Date() // 当前时间
    const timeOld = new Date(time)
    const timeGap = timeNow - timeOld
    return getTimeAgo(timeGap)
}

export const getTimeAgo = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const months = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30 * 12));


    if (minutes < 60) {
        return `${minutes}分钟前`;
    } else if (hours < 24) {
        return `${hours}小时前`;
    } else if (days < 30) {
        return `${days}天前`;
    } else if (months < 12) {
        return `${months}月前`;
    } else {
        return `${years}年前`;
    }
}