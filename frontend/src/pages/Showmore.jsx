import React from 'react'
import { getHouses } from '../api/house';
import { useQuery } from '@tanstack/react-query';
import { HouseAdv } from '../components/HouseAdv';
import { FilterByRoom } from '../components/FilterByRoom'
import { useSearchParams } from 'react-router-dom';
import { FilterByPrice } from '../components/FilterByPrice';
import { FilterByArea } from '../components/FilterByArea';
import { FilterByType } from '../components/FilterByType';

function Showmore() {
    const [searchParams, setSearchParams] = useSearchParams({});
    const { data:datas, status } = useQuery({
        queryKey: ['house', {
            minrooms: searchParams.get('minrooms'), 
            maxrooms: searchParams.get('maxrooms'),
            maxprice: searchParams.get('maxprice'),
            minprice: searchParams.get('minprice'),
            maxsize: searchParams.get('maxsize'),
            minsize: searchParams.get('minsize'),
            types: searchParams.getAll('types'),
        }],
        placeholderData: (data) => data,
        queryFn: () => {
            const query = searchParams.toString();
            return getHouses(query)
        },
    });

    
    if(datas)
    return (
        <div className="flex justify-between  min-h-screen">
            <div className='flex flex-col mr-3'>
                <FilterByRoom />
                <FilterByPrice />
                <FilterByType />
                <FilterByArea />
            </div> 
            <div className="grid gap-10 grid-cols-3 w-full felx-1">
                {datas.data.map((data, index) => {
                    const image = "http://localhost:4001/" + data.images[0];
                    return (
                        <HouseAdv key={index} image={image} {...data}/>
                    );
                })}
            </div>
        </div>
    )
}

export default Showmore