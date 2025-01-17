import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { PiCurrencyInr } from "react-icons/pi";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  console.log(allProducts, "aall");
  const getAllBrands = async () => {
    try {
      const { brands } = await HttpClient.get("/brand");
      setBrands(brands);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getAllCategories = async () => {
    try {
      const { categories } = await HttpClient.get("/category");
      setAllCategories(categories);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const { products } = await HttpClient.get("/product");
      setAllProducts(products);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    getAllBrands();
    getAllCategories();
  }, []);

  return (
    <>
      <section>
        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div 
           style={{
            backgroundImage: 'url(https://i.etsystatic.com/ij/69a45a/6565032375/ij_680x540.6565032375_cxxnnddj.jpg?version=0)'
          }} 
           
              className="h-[80vh] sm:h-screen py-[33%] md:py-[20%] xl:py-[16%] px-[10%]"
              >
              <div>
                <p className="font-[Quicksand] font-normal text-[#011F4B] text-4xl md:text-7xl ">
                 {/* Renew Your Rooms{" "} */}
                </p>{" "}
                <p className="font-[Quicksand] font-normal text-[#f1b738] text-4xl md:text-7xl mb-2">
                  {" "}
                   {/* Shop original Home pieces */}
                </p>
                <p className="font-[Poppins] ml-3 font-normal text-[#3E3E3E] ">
                  {/* Lorem Ipsum, sometimes referred to as 'lipsum', is
                  the placeholder text */}
                </p>
                <p className="font-[Poppins] ml-3 font-normal text-[#3E3E3E]">
                  {" "}
                  {/* used in design when creating content.{" "} */}
                </p>
                <div className="ml-3 w-[15%] md:w-[5%] h-[3px] bg-[#011F4B]  mt-[1%]"></div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                backgroundImage: 'url(https://i.etsystatic.com/ij/69a45a/6565032375/ij_680x540.6565032375_cxxnnddj.jpg?version=0)'
              }}
              className="h-[80vh] sm:h-screen py-[33%] md:py-[20%] xl:py-[16%] px-[10%]"
            >
              <div
                className="bg-white h-[400px] w-[400px] rounded-3xl shadow-lg flex flex-col justify-center items-center p-6"
              >
                <p className="font-[Quicksand] font-bold text-[#eecc8d] text-4xl md:text-7xl">
                  RENEW
                </p>
                <p className="font-[Quicksand] font-bold text-[#eecc8d] text-4xl md:text-7xl mb-4">
                  YOUR ROOMS
                </p>
                <p className="font-[Poppins] font-semibold text-[#eecc8d] text-lg text-center">
                  SHOP ORIGINAL HOME PIECES
                </p>
                <div className="w-[60px] md:w-[80px] h-[3px] bg-[#011F4B] mt-4"></div>
              </div>

            </div>
          </SwiperSlide>
        </Swiper>
      </section>
     
      
      <section className="px-10 py-6">
        <h2 className="font-[Quicksand] font-medium text-center text-4xl text-[#011F4B]">
          CATEGORIES TO BAG
        </h2>
        <p className="font-[Poppins] text-[#949494] text-center text-lg font-light mb-5">
          Alienum phaedrum torquatos nec eu, vis detraxit ertssa periculiser ex,
          nihil
        </p>
        <div>
          {allCategories.length ? (
            <Swiper
              loop={true}
              className="mySwiper"
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                500: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
                2000: {
                  slidesPerView: 7,
                  spaceBetween: 50,
                },
              }}
            >
              {allCategories.map((category, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link
                      to={`/collections?category=${category?._id}`}
                      className="bg-[#F6F6F6] p-10 block"
                    >
                      <div className="flex flex-col items-center w-full gap-3">
                        <div className="rounded-full h-[100px] w-[100px]">
                          <img
                            src={category?.bannerImage}
                            alt={category?.name}
                            className="rounded-full aspect-square"
                            loading="lazy"
                          />
                        </div>
                        <p className="font-[Poppins] font-medium text-2xl text-[#011F4B] my-3">
                          {category?.name.toUpperCase()}
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <h2 className="font-[Quicksand] font-medium text-center text-2xl text-[#011F4B]">
              No Category Available
            </h2>
          )}
        </div>
      </section>
      <section className="bg-[#F6F6F6] px-5 py-5 ">
        <h2 className="font-[Quicksand] font-medium text-[#011F4B] text-center text-[#011F4B] text-4xl mb-7 border-3">
          WHAT THEY ARE SAYING
          <div className="w-[15%] md:w-[5%] h-[3px] bg-[#011F4B] m-auto mt-[2%]"></div>
        </h2>
        <Swiper
          navigation={true}
          loop={true}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="w-full font-[Poppins] flex flex-col justify-center items-center">
              <p className="text-[#949494] w-2/3 font-light text-lg p-4 text-center">
                Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
                Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
                ullamcorper ultricies nisi nam eget eres furis aviatis.
              </p>
              <p className="text-[#011F4B] font-medium text-center mb-2">
                Jennifer Jacobs
              </p>
              <p className="text-[#949494] font-light text-sm text-center">
                Designer
              </p>
            </div>
          </SwiperSlide>


          <SwiperSlide>
            <div className="w-full font-[Poppins] flex flex-col justify-center items-center">
              <p className="text-[#949494] w-2/3 font-light text-lg p-4 text-center">
                Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
                Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
                ullamcorper ultricies nisi nam eget eres furis aviatis.
              </p>
              <p className="text-[#011F4B] font-medium text-center mb-2">
                Jennifer Jacobs
              </p>
              <p className="text-[#949494] font-light text-sm text-center">
                Designer
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full font-[Poppins] flex flex-col justify-center items-center">
              <p className="text-[#949494] w-2/3 font-light text-lg p-4 text-center">
                Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
                Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
                ullamcorper ultricies nisi nam eget eres furis aviatis.
              </p>
              <p className="text-[#011F4B] font-medium text-center mb-2">
                Jennifer Jacobs
              </p>
              <p className="text-[#949494] font-light text-sm text-center">
                Designer
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    

      <section className="p-2">
        <p className="font-[Quicksand] font-medium text-center text-[#011F4B] text-4xl">
          EXPLORE TOP Wearing Product
        </p>
        <p className="font-[Poppins] font-light text-center text-[#949494] mb-4">
          Alienum phaedrum torquatos nec eu, vis detraxit ertssa periculiser ex,
          nihil
        </p>


        <ul className="flex flex-wrap justify-center">
          {allProducts.length ? (
            allProducts
              .filter((item) => item?.group === "men")
              .map((data, index) => {
                return (
                  <li className="w-[80px] lg:w-1/6 m-1" >
                    <Link to={`/product-details/${data.productId}`} key={index}>
                      <div className="relative">
                        <img src={data?.bannerImage || "assets/goggles.png"} alt={data.name} className="sm:w-[1/2] lg:h-[180px] rounded-lg h-[80px] w-[100%]" />
                        <p className="text-black p-1 font-semibold flex justify-between items-center text-[8px] lg:text-[14px]  rounded-lg shadow-sm">
                          <span className="font-[Quicksand] font-bold truncate text-[10px] lg:text-[16px] tracking-wide">
                            {data.name.toUpperCase()}
                          </span>
                          <span className="font-[Quicksand] font-extrabold ml-4 text-[10px] lg:text-[16px] ">
                            {"₹" + data.price}
                          </span>
                        </p>

                      </div>
                    </Link>
                  </li>
                );
              })
          ) : (
            <h2 className="font-[Quicksand] font-medium text-center text-4xl text-[#011F4B]">
              No Eyewear Available
            </h2>
          )}
        </ul>
      </section>
    
     
    </>
  );
}
