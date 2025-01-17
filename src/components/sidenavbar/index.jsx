import React from "react";
import { Link } from "react-router-dom";

import { MdSignalCellularAlt } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { BsReceipt } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";
import "./sidenavbar.css";
import { getUserData } from "../../server/user";

function Sidenavbar() {
  return (
    <div className="sidebar"  >
      <div className="px-8 py-3">
        <Link to="/">
          {/* <img src="/assets/cart.png" alt="Cart" width="60px" height="60px" /> */}
          <img src="/assets/newlogo.png" alt="Logo" className="w-[100px] h-[100px]" />
        </Link>
      </div>
      <div className="flex items-center px-8 py-5">
        <div className="mr-4 flex items-center justify-center border border-white w-10 h-10 rounded-full bg-[#FFFFFF]">
          <img
            src="/assets/winter.png"
            alt="Cart"
            className="rounded-full w-full h-full object-cover"
          />
        </div>

        <p className="text-[#011F4B] font-[Poppins] font-bold">
          {getUserData()?.storeDetails?.storeName?.toLowerCase()}{" "}
          
        </p>
      </div>

      <div className="px-1">
        <ul className="px-5 font-[Poppins] text-[#000000] font-normal hover:text-#FFFFFF">
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full  transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/seller" className="flex items-center gap-2">
                <button className="flex justify-center items-center gap-4 p-2">
                  <div className="p-2 iconDiv">
                    <MdSignalCellularAlt size={21} className="icon" />
                  </div>
                  Dashboard
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/seller/orders" className="flex items-center gap-2">
                <button className="flex justify-center items-center gap-4  p-2">
                  <div className="p-2 iconDiv">
                    <BsReceipt size={21} className="icon" />
                  </div>
                  Orders
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/seller/products" className="flex items-center gap-2">
                <button className="flex justify-center items-center gap-4  p-2">
                  <div className="p-2 iconDiv">
                    <FiTruck size={21} className="icon" />
                  </div>
                  Products
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/seller/users" className="flex items-center gap-2 ">
                <button className="flex justify-center items-center gap-4 p-2">
                  <div className="p-2 iconDiv">
                    <BsWallet2 size={21} className="icon" />
                  </div>
                  Users
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/seller/category" className="flex items-center gap-2">
                <button className="flex justify-center items-center gap-4 p-2">
                  <div className="p-2 iconDiv">
                    <BsReceipt size={21} className="icon" />
                  </div>
                  Category
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/seller/brands" className="flex items-center gap-2">
                <button className="flex justify-center items-center gap-4 p-2">
                  <div className="p-2 iconDiv">
                    <BsReceipt size={21} className="icon" />
                  </div>
                  Brands
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
          {/* <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/seller/invoice" className="flex items-center gap-2">
                <button
                  className="flex justify-center items-center gap-4 p-2"
                >
                  <div className="p-2 iconDiv">
                    <BsReceipt size={21} className="icon" />
                  </div>
                  Invoice
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li> */}
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/seller/profile" className="flex items-center gap-2 ">
                <button className="flex justify-center items-center gap-4    p-2">
                  <div className="p-2 iconDiv">
                    <BsPerson size={21} className="icon" />
                  </div>
                  Profile
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidenavbar;
