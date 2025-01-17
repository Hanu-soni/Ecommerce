import React from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { pathname } = location;
  // const pathInclude = pathname === '/men-collection' || pathname === '/women-collection' || pathname === '/kids-collection' || pathname === '/'

  // const className =
  // (!pathInclude ? "bg-[#011f4b] text-white" : "bg-transparent absolute") +
  // " w-full font-semibold text-[#515151] px-10 py-3 z-10";
  return (
    <>
      <footer className="bg-[#FAFAFA] px-10 py-[50px]">
        <div className="mb-12 grid sm:grid-cols-7 gap-6">
          <div className="hidden lg:block"></div>
          <div className="col-span-6">
            <p className="font-[Quicksand] text-[#011F4B] font-semibold mb-2 xl:text-xl lg:text-lg">
              Like to hear from us!
            </p>
            <div className="flex flex-wrap lg:w-3/4 font-[Quicksand]">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                required
                className="bg-white border-2 border-[#011F4B] outline-none  text-[#9E9E9E] xl:text-xl lg:text-lg font-medium py-2 px-8 w-full sm:w-[70%]"
              />
              <button
                type="submit"
                className="bg-[#011F4B]  text-white xl:text-xl lg:text-lg font-medium p-3 w-full sm:w-[30%]"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-8 gap-6 md:flex-wrap lg:flex-nowrap">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <img src="/assets/logo1.png" alt="Logo" height={80} width={90} />
          </div>
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <p className="font-[Quicksand] font-medium lg:text-lg xl:text-xl text-[#0F0F0F] mb-4">
              Online shopping
            </p>
            <p className="text-[#949494] font-light font-[Poppins]">
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
              blandit vel, luctus pulvinar, hendrerit ...
            </p>
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <p className="font-[Quicksand] font-medium lg:text-lg xl:text-xl text-[#0F0F0F] mb-4">
              Customer Policy
            </p>
            <p className="text-[#949494] font-light font-[Poppins]">
              Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
              libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
              blandit vel, luctus pulvinar, hendrerit ...
            </p>
          </div>
          
          <div className="col-span-2 md:col-span-2 lg:col-span-1 sm:flex flex-col items-center">
          <Link to="/privacy">
            <p className="font-[Quicksand] font-medium lg:text-lg xl:text-xl text-[#0F0F0F] mb-4">
            Privacy Policy
            </p>
            </Link>
           <p className="text-[#949494] font-light font-[Poppins]">
           Complete discription of our privacy policy
           </p>
          </div>
          <div className="col-span-2 md:col-span-2 lg:col-span-1 sm:flex flex-col items-center">
          <Link to="/returnpolicy">
            <p className="font-[Quicksand] font-medium lg:text-lg xl:text-xl text-[#0F0F0F] mb-4">
         Return Policy
            </p>
            </Link>
           <p className="text-[#949494] font-light font-[Poppins]">
           Complete discription of our return policy
           </p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1 sm:flex flex-col items-center">
            <p className="font-[Quicksand] font-medium lg:text-lg xl:text-xl text-[#0F0F0F] mb-4">
              Stay connected
            </p>
            <ul>
              <li className="flex items-center gap-2 text-[#949494] font-[Quicksand] ">
                <p>
                  <FaInstagram />
                </p>
                <p>Instagram</p>
              </li>
              <li className="flex items-center gap-2 text-[#949494] font-[Quicksand] ">
                <p>
                  <FaFacebook />
                </p>
                <p>Facebook</p>
              </li>
              <li className="flex items-center gap-2 text-[#949494] font-[Quicksand] ">
                <p>
                  <FaWhatsapp />
                </p>
                <p>Whatsapp</p>
              </li>
            </ul>
          </div>
      
        </div>
      </footer>
    </>
  );
}
