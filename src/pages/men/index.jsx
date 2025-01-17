import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";

export default function MenCollection() {
  const [allCategories, setAllCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { categories } = await HttpClient.get("/category?group=men");
      setAllCategories(categories);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.error
      );
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <section>
        <div className="men-banner py-[45%] lg:py-[35%] xl:py-[28%] px-[10%]">
          <div>
            <p className="font-[Quicksand] font-normal text-[#011F4B] text-center text-4xl md:text-7xl uppercase">
              Dressing well is a form of
            </p>{" "}
            <p className="font-[Quicksand] font-normal text-[#011F4B] text-center text-4xl md:text-7xl uppercase">
              {" "}
              good manners.
            </p>
            <p className="font-[Poppins] font-normal text-center text-[#0F0F0F] ">
              Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder
              text
            </p>
            <p className="font-[Poppins] font-normal text-center text-[#0F0F0F] ">
              {" "}
              used in design when creating content.{" "}
            </p>
          </div>
        </div>
      </section>
      <section className="px-[10%] py-5">
        <h2 className="font-[Quicksand] font-medium text-center text-[#011F4B] text-4xl mb-3">
          CATEGORIES
        </h2>
        <p className="font-[Poppins] font-normal text-[#949494] m-auto text-center w-full lg:w-[40%] mb-8">
          Alienum phaedrum torquatos nec eu, vis detraxit ertssa periculiser ex,
          nihil expetendis in meinerst gers frust bura erbu
        </p>
        <ul className="flex flex-wrap justify-center">
  {allCategories.length ? (
    allCategories.map((category, i) => {
      const [groupDetails] = category?.group.filter((g) => g.name === "men");
      return (
        <li key={i} className="w-[120px] md:w-[30%] m-1">
          <Link to={`/collections?category=${category?._id}&group=men`}>
            <div className="relative">
              <img
                className="aspect-[1/1.5] object-cover w-[100%] rounded-md"
                src={groupDetails?.image}
                alt={groupDetails?.name}
              />
              <p className="font-[Quicksand] absolute bottom-0 font-medium text-xl tracking-wide bg-[#969696A8] w-full text-center text-white py-1 px-2 uppercase">
                {category?.name}
              </p>
            </div>
          </Link>
        </li>
      );
    })
  ) : (
    <h2 className="font-[Quicksand] font-medium text-center text-4xl text-[#011F4B]">
      No Categories Available
    </h2>
  )}
</ul>


        <div className="grid sm:grid-cols-3 gap-5 my-5">
          <div className="relative col-span-2">
            <Link to={`/collections?newArrival=true&group=men`}>
              <img src="assets/kartik.png" alt="" />
              <div className="absolute py-1 px-5 text-3xl md:text-5xl left-[5px] top-[72px] md:top-[50%] md:left-[25%] uppercase bg-[#000000A8] text-white text-center font-[Quicksand] ">
                NEW ARRIVALS{" "}
              </div>
            </Link>
          </div>
          <div className="relative">
            <Link to={`/collections?discount=50&group=men`}>
              <img
                className="h-full object-cover"
                src="assets/kartik-side.png"
                alt=""
              />
              <div className="absolute py-1 px-5 text-2xl top-[25px] md:text-5xl md:top-[50%] md:left-[12%] uppercase bg-[#000000A8] text-white text-center font-[Quicksand] ">
                UPTO 50% OFF{" "}
              </div>
            </Link>
          </div>
        </div>
        {/* <button className="font-[Quicksand] font-medium text-xl text-[#011F4B] rounded-[3px] bg-white block m-auto py-[5px] px-5 border-2 border-[#011F4B] border-solid mt-4">
              LOAD MORE
            </button> */}
      </section>
    </>
  );
}
