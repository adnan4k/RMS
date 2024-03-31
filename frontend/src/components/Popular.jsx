function Popular() {
  const datas = [
    {
      image: "/images/home1.png",
      type: "Apartment",
      price: "10000",
      location: "Addis ababa,bole",
    },
    {
      image: "/images/home1.png",
      type: "Apartment",
      price: "10000",
      location: "Addis ababa,bole",
    },
    {
      image: "/images/home3.png",
      type: "Apartment",
      price: "10000",
      location: "Addis ababa,bole",
    },
    {
      image: "/images/home4.png",
      type: "Apartment",
      price: "10000",
      location: "Addis ababa,bole",
    },
    {
      image: "/images/home5.png",
      type: "Apartment",
      price: "10000",
      location: "Addis ababa,bole",
    },
    {
      image: "/images/home6.png",
      type: "Apartment",
      price: "10000",
      location: "Addis ababa,bole",
    },
  ];
  return (
    <div className="grid gap-10 grid-cols-3 mx-auto">
      {datas.map((data, index) => (
        <div key={index} className="container ">
          <div>
            <img src={data.image} alt="home" />
          </div>
          <div className="my-2">
            <h3> <span className="text-[#081E4A] text-[18px] mx-2 font-semibold">type: </span> <span className="font-semibold">{data.type}</span></h3>
            <h3> <span className="text-[#081E4A] mx-2 text-[18px] font-semibold">location: </span> <span className="font-semibold">{data.location}</span> </h3>
            <h3><span className="text-[#081E4A] mx-2 text-[18px] font-semibold">price: </span> <span className="font-semibold">{data.price}</span></h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Popular;
