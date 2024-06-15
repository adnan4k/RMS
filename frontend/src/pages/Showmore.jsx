import React, { useState } from 'react'
import { getHouses } from '../api/house';
import { useQuery } from '@tanstack/react-query';
import { HouseAdv } from '../components/HouseAdv';
import { FilterByRoom } from '../components/FilterByRoom'
import { Link, useSearchParams } from 'react-router-dom';
import { FilterByPrice } from '../components/FilterByPrice';
import { FilterByArea } from '../components/FilterByArea';
import { FilterByType } from '../components/FilterByType';
import { FilterByLocation } from '../components/FilterByLocation';
import { FaDropbox } from 'react-icons/fa6';

const DEFAULT_TYPES = [{name:"Apartment", img:'apartment.png'}, {name:"Condo", img:'condo.png'}, {name:"Duplex", img:'duplex.png'}, {name:"House", img:'house.png'}, {name:"Mansion", img:'mansion.png'}, {name:"Penthouse", img:'penthouse.png'}, {name:"Studio", img:'studio-apartment.png'}, {name:"Villa", img:'villa.png'}, {name:"Bedsitter", img:'bedsitter.png'}, {name:"Chalet", img:'chalet.png'}, {name:"Farm House", img:'townhouse.png'}, {name:"Building", img:'condo.png'}];

function Houses() {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [search, setSearch] = useState(searchParams.get('q'));
    const [signal, setSignal] = useState(false);

    const { data:datas, status, isFetching, error } = useQuery({
        queryKey: ['house', {
            minrooms: searchParams.get('minrooms'), 
            maxrooms: searchParams.get('maxrooms'),
            maxprice: searchParams.get('maxprice'),
            minprice: searchParams.get('minprice'),
            maxsize: searchParams.get('maxsize'),
            minsize: searchParams.get('minsize'),
            city: searchParams.get('city'),
            sub_city: searchParams.get('sub_city'),
            woreda: searchParams.get('woreda'),
            kebele: searchParams.get('kebele'),
            types: searchParams.getAll('types'),
            owner: searchParams.get('owner'),
            q: searchParams.get('q'),
        }],
        placeholderData: (data) => data,
        queryFn: () => {
            const query = searchParams.toString();
            console.log(query)
            return getHouses(query)
        },
    });

    const searchHouse = () => {
        setSearchParams(prev => {
            if (search != '')
                prev.set('q', search)
            else
                prev.delete('q')
            return prev
        })
    }
    
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10

    if(datas)
    return (
        <div className="flex justify-between h-screen">
            <div className='flex flex-col mr-3 min-w-64 overflow-y-scroll'>
                <div className="flex items-center peer border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 mb-3 dark:border-gray-600">
                    <svg className="w-8 h-8 p-1 pointer-events-none text-gray-500 dark:text-gray-400 rounded-l-lg m-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <input type="text" id="search" onChange={(e) => setSearch(e.target.value)} value={search} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search house, ..."/>
                    <button onClick={searchHouse} className='p-1 bg-blue-500 mx-1 text-sm rounded-lg border'>Search</button>
                </div>
                <FilterByLocation signal={signal}/>
                <FilterByRoom signal={signal}/>
                <FilterByPrice signal={signal}/>
                <FilterByType />
                <FilterByArea signal={signal}/>
                <Link onClick={() => setSignal(!signal)} className='min-h-10 w-full p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-lg dark:text-white' to='/houses'>Clear all filters</Link>
            </div> 
            <div className='max-h-screen felx-1 overflow-y-scroll w-full flex flex-col'>
                <div className='w-full  max-w-full overflow-x-scroll px-2 h-20 min-h-20 flex mb-4 border border-gray-600 rounded-lg'>
                    {DEFAULT_TYPES.map(({name, img}) =>
                    <>
                        <label htmlFor={name} className={'border flex flex-col p-1.5 pb-0 mx-2 cursor-pointer border-gray-200 dark:border-gray-700 h-full w-20 min-w-20 rounded ' + (searchParams.has('types', name.toLowerCase())?'dark:bg-gray-500':'dark:bg-gray-800')}>
                            <img src={"/images/"+img} className='w-full h-1 flex-1 rounded-full' alt="image" />
                            <span className='text-[11px] self-center'>{name}</span>
                        </label>
                    </>
                    )
                    }
                </div>
                
                <p className='mb-2 text-lg'>{isFetching? '...':datas.total + " results"}</p>
                    
                <div className="grid gap-10 grid-cols-3 w-full px-2">
                    {datas.data.length === 0 || status === 'error'? 
                    <>
                        <div className='w-64 h-1'></div>
                        <div className="w-64 h-64 m-auto">
                            <FaDropbox className="w-full h-full" />
                            <p className="text-center">No houses found! <Link onClick={() => setSignal(!signal)} to=''> Clear all filters and try</Link></p>
                        </div>
                    </>
                    :
                    datas.data.map((data, index) => {
                        const image = "http://localhost:4001/" + data.images[0];
                        return (
                            <HouseAdv key={index} image={image} {...data}/>
                        );
                    })}
                </div>
                {
                    datas.data.length > 0 &&
                <div className="flex flex-col items-center self-end p-2">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{1+(page - 1) * limit}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(page*limit, datas?.total)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{datas?.total}</span> Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                        {datas.prev &&
                            <button onClick={()=>setSearchParams((prev) => {
                                prev.set('page', datas.prev)
                                return prev
                            })} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Prev
                            </button>
                        }
                        {datas.next &&
                            <button onClick={()=>setSearchParams((prev) => {
                                prev.set('page', datas.next)
                                return prev
                            })} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Next
                            </button>
                        }
                    </div>
                </div>
                }
            </div>
            </div>
    )
}

export default Houses