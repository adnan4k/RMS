import { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerValue() {
  const [starttime, setStart] = useState(dayjs('2022-04-17T00:00'));
  const [endtime, setEnd] = useState(dayjs('2022-04-17T01:00'));

  return (
    <div className='flex-0 flex gap-2 bg-white rounded-lg shadow dark:bg-gray-700 p-1.5'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            className='max-w-32 text-sm p-1 text-white'
            label="Start time"
            value={starttime}
            onChange={(newValue) => setStart(newValue)}
            timeSteps={{minutes: 1}}
          />
          <TimePicker
            className='max-w-32 text-sm p-1'
            label="End time"
            value={endtime}
            onChange={(newValue) => console.log(newValue.hour())}
            timeSteps={{minutes: 1}}
          />
      </LocalizationProvider>
    </div>
  );
}
