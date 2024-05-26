import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getLatestHouses } from '../api/house';
import { Link } from 'react-router-dom';

function LatestHouses() {
    // Ensure datas is always an array
    const { data: datas, status } = useQuery({
        queryKey: ['house'],
        queryFn: getLatestHouses
    });
    if (datas)
        return (
            <div className="grid gap-10 grid-cols-3 mx-auto">
                {datas.map((data, index) => {
                    const image = "http://localhost:4001/" + data.images[0];
                    // console.log(data,'data')
                    return (
                        <div key={index} className="container">
                            <Link
                                to="/details"
                                state={{ house: data }}
                            >
                                <div>
                                    <img src={image} alt="home" />
                                </div>
                                <div className="my-2">
                                    <h3>
                                        <span className="text-[#081E4A] text-[18px] mx-2 font-semibold">Type:</span>
                                        <span className="font-semibold">{data.house_type}</span>
                                    </h3>
                                    <h3>
                                        <span className="text-[#081E4A] mx-2 text-[18px] font-semibold">Location:</span>
                                        <span className="font-semibold">{data.address.city}</span>
                                    </h3>
                                    <h3>
                                        <span className="text-[#081E4A] mx-2 text-[18px] font-semibold">Price:</span>
                                        <span className="font-semibold">{data.price}</span>
                                    </h3>
                                </div>
                            </Link>

                        </div>
                    );
                })}
            </div>
        );
}

export default LatestHouses;
