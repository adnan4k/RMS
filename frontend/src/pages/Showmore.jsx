import React from 'react'
import Popular from '../components/Popular'
import Search from '../components/Search'
import { getHouse } from '../api/house';
import { useQuery } from '@tanstack/react-query';

function Showmore() {
    const { data:datas, status } = useQuery({
        queryKey: ['house'],
        queryFn: getHouse
    });
    if(datas)
    return (
        <div className="flex justify-center  min-h-screen">
            <div className='flex '>
                <div className='mx-5'><Search datas={datas} status={status} /></div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Showmore