import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { getHouseVisits } from '../api/house';

function ScheduleVisit({calendar, id}) {
    const {data, status, error} = useQuery({
        queryKey: ['house', id, 'visits'],
        queryFn: ()=>getHouseVisits(id)
    })
    
    const [choosenDate, setChoosenDate] = useState(null)

    const scehdulesToMap = useMemo(() => {
        const map = new Map();
        if (data)
        data.forEach((s) => {
            console.log(s)
            // Change the dates to different format
            map[dayjs(s._id).format('YYYY-MM-DD')] = s.requests.map(dates => dates);
        });
        return map
    }, [data, status])

    return <div className='flex justify-center items-center'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
                shouldDisableDate={(date) => {
                    return !calendar.schedule[(7+date.day() - 1) % 7]
                }}
                minDateTime={dayjs()}
                shouldDisableTime={(time) => {

                    if (!choosenDate)
                        return true

                    const c = calendar.schedule[(7+choosenDate.day() - 1) % 7]
                    let starttime = dayjs(c.starttime)
                    starttime = dayjs().set('hour', starttime.hour()).set('minute', starttime.minute())
                    let endtime = dayjs(c.endtime)
                    endtime = dayjs().set('hour', endtime.hour()).set('minute', endtime.minute())
                    const now = dayjs().set('hour', time.hour()).set('minute', time.minute())
                    
                    if (now.isAfter(endtime) || now.isBefore(starttime))
                        return true

                    const s = scehdulesToMap[choosenDate.format('YYYY-MM-DD')]
                    if (s) {
                        if (s.filter(dates => time.isAfter(dayjs(dates)) && time.isBefore(dayjs(dates).add(1,'hour'))).length > 1)
                            return true
                    }

                    // Minutes are not working
                    // And also check if it is not booked
                    return false
                }}
                value={choosenDate}
                onChange={(date, error) => {
                    if (!error.validationError || error.validationError === 'shouldDisableTime-hours') 
                        setChoosenDate(date)
                    else{
                        console.log(error)
                        setChoosenDate(null)
                    }
                    }}
            />
        </LocalizationProvider>
    </div> 
}

export default ScheduleVisit
