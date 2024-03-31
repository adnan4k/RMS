import Popular from "../components/Popular";
import SearchComponent from "../components/SearchComponent";
import Layout from "../layout/Layout";

function Home() {
  return (
    <Layout>
      <div className="mt-32">
        <div className="flex flex-col justify-center items-center">
          <div>
            <h1 className="text-[#081E4A] text-center text-3xl font-bold">
              Find Your Perfect Rental Home
            </h1>
          </div>
          <div>
            <p className="text-xl my-5">
              A Great Platform to Connect users Directly with Tenant and
              Discover Your Dream Home
            </p>
          </div>
        </div>
        <div className="search">
          <SearchComponent />
        </div>
        <div>
          <div className="flex flex-col justify-center items-center mx-auto">
            <h2 className="text-[#081E4A] font-bold my-5 text-3xl">
              Trending Listings
            </h2>
            <Popular />
          </div>
          <div className="flex justify-end mr-10 my-5">
            <button className=" text-white bg-[#234B9A] rounded-2xl">
              Show More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
