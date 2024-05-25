import { getHouse } from "../api/house";
import { useQuery } from "@tanstack/react-query"

function Popular() {
  const {data:datas, status} = useQuery({
    queryKey: ['house'],
    queryFn: getHouse
  });
  console.log(datas, status)
  if (datas)
  return (
    <div className="grid gap-10 grid-cols-3 mx-auto">
      {datas.data.map((data, index) => (
        <div key={index} className="container">
          <div>
            <img src={data.image} alt="home" />
          </div>
          <div className="my-2">
            <h3> <span className="text-[#081E4A] text-[18px] mx-2 font-semibold">type: </span> <span className="font-semibold">{data.house_type}</span></h3>
            <h3> <span className="text-[#081E4A] mx-2 text-[18px] font-semibold">location: </span> <span className="font-semibold">{data.address.city}</span> </h3>
            <h3><span className="text-[#081E4A] mx-2 text-[18px] font-semibold">price: </span> <span className="font-semibold"></span></h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Popular;
