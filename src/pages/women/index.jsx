import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";

export default function WomenCollection() {
  const [allCategories, setAllCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { categories } = await HttpClient.get("/category?group=women");
      setAllCategories(categories);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <section>
        <div className="women-banner py-[45%] lg:py-[35%] xl:py-[28%] px-[10%]">
          <div>
            <p className="font-[Quicksand] font-normal text-[#011F4B] text-center text-4xl md:text-7xl uppercase">
              I dress to kill, but
            </p>{" "}
            <p className="font-[Quicksand] font-normal text-[#011F4B] text-center text-4xl md:text-7xl uppercase">
              tastefully
            </p>
            <p className="font-[Poppins] font-normal text-center text-black ">
              Lorem Ipsum, sometimes referred to as 'lipsum', is the placeholder
              text
            </p>
            <p className="font-[Poppins] font-normal text-center text-black ">
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
              const [groupDetails] = category?.group.filter((g) => g.name === "women");
              return (
                <li key={i} className="w-[45%] md:w-[30%] m-1">
                  <Link to={`/collections?category=${category?._id}&group=women`}>
                    <div className="relative mb-2">
                      <img
                        className="aspect-[1/1.5] object-cover w-[100%] rounded-md"
                        src={groupDetails?.image}
                        alt={groupDetails?.name}
                      />
                      <p className="font-[Quicksand] absolute bottom-0 font-medium md:text-xl tracking-wide bg-[#969696A8] w-full text-center text-white py-1 px-5 uppercase">
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

        <div className="flex flex-wrap justify-center gap-4">
          <div className="relative h-[100%] sm:w-[40%] mb-4">
            <Link to={`/collections?newArrival=true&group=women`}>
              <img src="assets/ladki.png" alt="new arrivals" className="h-full w-full object-cover" />
              <div className="absolute py-3 px-2 text-3xl md:text-2xl left-5 top-16 md:top-1/2 transform md:-translate-y-1/2 uppercase bg-[#000000A8] text-white text-center font-[Quicksand]">
                NEW ARRIVALS
              </div>
            </Link>
          </div>
          <div className="relative h-[100%] sm:w-[40%]">
            <Link to={`/collections?discount=50&group=women`}>
              <img src="assets/ladki-side.png" alt="50% off" className="h-full w-full object-cover" />
              <div className="absolute py-1 px-2 text-3xl md:text-2xl left-5 top-[75%] md:top-[85%] uppercase bg-[#000000A8] text-white text-center font-[Quicksand]">
                UPTO 50% OFF
              </div>
            </Link>
          </div>
        </div>



        {/* <button className="font-[Quicksand] font-medium text-xl text-[#011F4B] border-[#011F4B] rounded-[3px] bg-white block m-auto py-[5px] px-5 border-2 border-solid mt-4">
              LOAD MORE
            </button> */}
      </section>
    </>
  );
}
