export const validateSchedule = (schedule) => {
    const error = Array(7).fill(false)
    // console.log(schedule)
    schedule.forEach((element, idx) => {
        const starttime = element.starttime.getUTCHours()
        if (element.starttime.setUTCHours(starttime+1) > element.endtime)
            error[idx] = true
    });
    return error
}