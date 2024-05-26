import { useState } from 'react';
import TimePicker from 'react-time-picker';

export const  ReactTimePicker = () =>  {
  const [value, onChange] = useState('10:00');

  return (
    <div>
      <TimePicker className='min-w-32 h-full' onChange={(e) => {console.log(e); onChange(e)}} value={value} />
    </div>
  );
}