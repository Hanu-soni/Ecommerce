import React from 'react'
import { Link } from "react-router-dom";

import { MdSignalCellularAlt } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { BsReceipt } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";
import './superadminNav.css'
import { getUserData } from "../../server/user";


 function SuperAdminNav() {
  return (
    <div className="sidebar"  >
      <div className=''>
      <div className="px-8 py-3">
       
          {/* <img src="/assets/cart.png" alt="Cart" width="60px" height="60px" /> */}
          
          <img src="/assets/newlogo.png" alt="Logo" className="w-[100px] h-[100px]" />
      </div>
      <div className="flex items-center px-8 py-5">
       
      <p className="font-[Poppins] font-bold  text-[#000000] ">Vardakart</p>
       
      </div>
      <hr className=' bg-gray-500 mx-10 my-4'></hr>
      </div>
      <div className="px-1 sidebarSubDiv overflow-y-auto">
        <ul className="px-5 font-[Poppins] text-[#000000] font-normal hover:text-#FFFFFF">
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full  transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/admin" className="flex items-center gap-2">
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
              <Link to="/admin/vendors" className="flex items-center gap-2">
                <button className="flex justify-center items-center gap-4  p-2">
                  <div className="p-2 iconDiv">
                    <BsReceipt size={21} className="icon" />
                  </div>
                 Vendors/Seller
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/admin/products" className="flex items-center gap-2">
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
              <Link to="/admin/buyers" className="flex items-center gap-2 ">
                <button className="flex justify-center items-center gap-4 p-2">
                  <div className="p-2 iconDiv">
                    <BsWallet2 size={21} className="icon" />
                  </div>
                  Users/Buyers
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
         
         
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/admin/invoice" className="flex items-center gap-2">
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
          </li>
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/admin/profile" className="flex items-center gap-2 ">
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
          <li>
            <div className="hover:bg-[#011F4B]  border-[#011F4B] rounded-md  hover:rounded-full transition-all duration-300 hover:text-[#FFFFFF] hoverOnDiv">
              <Link to="/admin/approval" className="flex items-center gap-2 ">
                <button className="flex justify-center items-center gap-4    p-2">
                  <div className="p-2 iconDiv">
                    <BsPerson size={21} className="icon" />
                  </div>
                 Approvals
                </button>
                <IoIosArrowRoundForward className="opacity-60" />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default SuperAdminNav