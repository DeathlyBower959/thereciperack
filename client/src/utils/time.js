const formatTime = (days, hours, minutes) => {
    let formatted = '';
    if (days && days > 0) {
        formatted += days
        if (days > 1)
            formatted += " days, "
        else
            formatted += " day, "
    }

    if (hours && hours > 0) {
        formatted += hours
        if (hours > 1)
            formatted += " hours, "
        else
            formatted += " hour, "
    }

    if (minutes && minutes > 0) {
        formatted += minutes
        if (minutes > 1)
            formatted += " minutes, "
        else
            formatted += " minute, "
    }

    if (formatted.endsWith(', ')) formatted = formatted.slice(0, formatted.length - 2)

    return formatted;
}

const parseTime = (totalDays, totalHours, totalMinutes) => {

    const seconds = (totalMinutes * 60) + (totalHours * 60 * 60) + (totalDays * 60 * 60 * 24)
    let days = Math.floor(seconds / (3600 * 24));
    let hours = Math.floor(seconds % (3600 * 24) / 3600);
    let minutes = Math.floor(seconds % 3600 / 60);
    return { days, hours, minutes }
}

const parseFormat = (tDays, tHours, tMinutes) => {
    const { days, hours, minutes } = parseTime(tDays, tHours, tMinutes)

    const formatted = formatTime(days, hours, minutes)

    return formatted
}

module.exports = { formatTime, parseTime, parseFormat }