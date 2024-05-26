import React, { useEffect, useState } from "react";
import { validateSchedule } from "../utils/validateSchedule";
import TimePickerValue from "./TimePicker";
import { ReactTimePicker } from "./ReactTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs-plugin-utc";

dayjs.extend(utc)


const WEEKS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const AvailableDates = ({dates}) => {
    const {open, schedule} = dates
    const [myschedule, setMyschedule] = useState([]);

    const [initial, setInitial] = useState(true);
    useEffect(()=> {
        if (initial) {
            console.log(initial)
            const newSchedule = schedule.map((date) => {
                if (!date) {
                    return {starttime: newUTC, endtime: endUTC, display: false}
                }
                
                return {starttime:dayjs.utc(date.starttime).local(), endtime:dayjs.utc(date.endtime).local(), display: true}
            });
            setMyschedule(newSchedule);
            setInitial(false);
        }
    }, [initial]);

    const onChanged = (idx, date, type) => {
        console.log(date)
        myschedule[idx] = {...myschedule[idx], [type]:date}
        setMyschedule([...myschedule])
    }

    const onDisplay = (idx) => {
        console.log(myschedule[idx])
        myschedule[idx] = {...myschedule[idx], display:true}
        console.log(myschedule[idx])
        setMyschedule([...myschedule])
    }

    const errors = validateSchedule(myschedule)
    return (<div>
        {
            myschedule.map((date, idx) => 
                <div onClick={()=>{}} className="flex items-center p-3 mx-6 my-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ms-3 whitespace-nowrap">{WEEKS[idx]}</span>
                    {true ?
                        <TimePickerValue key={idx} />
                        :
                        <>
                            <span className="mr-1">No schedule available</span><span onClick={()=>{onDisplay(idx)}} className="text-lg ml-2 cursor-pointer">+</span>
                        </>
                    }
                    
                </div>
            )
        }    
    </div>)
}
