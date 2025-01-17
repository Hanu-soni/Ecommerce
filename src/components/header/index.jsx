import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiHeart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { LogOut, isLoggedIn } from "../../server/user";
import { toast } from "react-toastify";
import { HttpClient } from "../../server/client/http";
import { CiSearch } from "react-icons/ci";


export default function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const pathInclude = pathname === '/men-collection' || pathname === '/women-collection' || pathname === '/kids-collection' || pathname === '/'
  const [isSubmenu, SetisSubmenu] = useState(false);
  const [dropdownContent, SetdropdownContent] = useState(false);
  //search barch functionlatiy
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const seller = { role: 'seller' }
  const user = { role: 'user' }
  const closeSubmenu = () => {
    SetisSubmenu(false);
    document.body.style.overflow = "scroll";
  };
  const openSubmenu = () => {
    SetisSubmenu(true);
    document.body.style.overflow = "hidden";
  };
  const logout = async () => {
    try {
      const { message } = await HttpClient.post("/users/logout");
      toast.success(message);
      navigate("/login");
      LogOut();
    } catch (error) {
      console.error(error);
    }
  };
  const className =
    (!pathInclude ? "bg-[#011f4b] text-white" : "bg-transparent absolute") +
    " w-full font-semibold text-[#515151] px-10 py-3 z-10";


  const fetchSuggestions = async (searchword) => {
    try {
    const response = await HttpClient.get(`/search/?q=${searchword}`)
      ;
   
      setSearchResult(response.results);
      console.log(response.results)
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };


  // const debouncedFetchSuggestions = debounce((query) => {
  //   if (query.trim()) {
  //     fetchSuggestions(query);
  //   } else {
  //     setSearchResult([]);
  //   }
  // }, 300);

 
  const handleInputChange = (e) => {
console.log("testing")
    const query = e.target.value;
    setSearchQuery(query);
    console.log("Search Query:", query);
    // debouncedFetchSuggestions(query); // Trigger search suggestion
    console.log("testing 2")
    if (query.trim()) {           
      fetchSuggestions(query);      
    } else {
      setSearchResult([]);         
    }
  };

  
  const handleSearch = async (searchword) => {
    if (searchQuery.trim()) {
  
    try {
     
      const response = await HttpClient.get(`/search/result?q=${searchword}`);
      console.log('API Response:', response);
      const productId = response?.product?.productId
      ; 
     console.log(productId)
      if (productId) {
       
        navigate(`/product-details/${productId}`);
      } else {
        console.error('Product ID not found in response');
      }
    } catch (error) {
      console.error('Error fetching search result:', error);
    }
  }
  };

 
  const handleKeyInput = (e) => {   
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  const handleSuggestionClick = async (suggestion) => {
    const suggestionName = suggestion;
    setSearchQuery(suggestion); 
    setSearchResult([]); 
   
    await handleSearch(suggestionName);
    
  }

  return (
    <>
      <header className={className}>
        <div className="hidden md:flex items-center justify-between">
         
            <img src="/assets/logo1.png" alt="Logo" height={80} width={90} />
            

          <div className="flex items-center gap-10">
            <ul className="flex gap-5">
              <Link to="/">
                <li className="font-[Poppins] cursor-pointer">Home</li>
              </Link>
              <Link to="/collections">
                <li className="font-[Poppins] cursor-pointer">Collections</li>
              </Link>
              <Link to="/men-collection">
                <li className="font-[Poppins] cursor-pointer">Men</li>
              </Link>
              <Link to="/women-collection">
                <li className="font-[Poppins] cursor-pointer">Women</li>
              </Link>
              <Link to="/kids-collection">
                <li className="font-[Poppins] cursor-pointer">Kids</li>
              </Link>
              {/* <Link to="/brands">
                <li className="font-[Poppins] cursor-pointer">Brands</li>
              </Link> */}
            </ul>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  isLoggedIn()
                    ? navigate("/wishlist")
                    : toast.error("Please Login First")
                }
              >
                <FiHeart className="text-xl cursor-pointer" />
              </button>
              <button
                onClick={() =>
                  isLoggedIn()
                    ? navigate("/checkout/cart")
                    : toast.error("Please Login First")
                }
              >
                <HiOutlineShoppingBag className="text-xl cursor-pointer" />
              </button>
              {/* <FaRegUser
                onClick={() => SetdropdownContent(!dropdownContent)}
                className="text-lg cursor-pointer"
              /> */}
              {/* <button
                onClick={() =>
                 
                     navigate("/")
                   
                }
              >
                <CiSearch className="text-lg cursor-pointer" />
              </button> */}
              <button
                onClick={() =>
                  isLoggedIn()
                    ? navigate("/profile")
                    :navigate("/login")
                }
              >
                <FaRegUser className="text-lg cursor-pointer" />
              </button>

            </div>
          </div>
        </div>
        {dropdownContent && (
          <ul className="bg-white w-[180px] p-5 absolute top-15 right-9 rounded-md">
            {isLoggedIn() ? (
              <>
                <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                  Orders
                </li>
                <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                  Wishlist
                </li>
                <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                  Contact Us
                </li>
                <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                  Coupons
                </li>
                <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                  Saved Cards
                </li>
                <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                  Saved Addresses
                </li>
                <Link to="/profile" onClick={() => SetdropdownContent(false)}>
                  <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                    Edit Profile
                  </li>
                </Link>
                <li
                  onClick={() => logout()}
                  className="font-[Poppins] text-[#696969] font-medium cursor-pointer"
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <Link to="/login">
                  <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                    Login
                  </li>
                </Link>
                {/* <Link to={{ pathname: '/register/user', state: { user } }}>
                  <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                    Register as user
                  </li>
                </Link>
                <Link to={{ pathname: '/register/seller', state: { seller } }}>
                  <li className="font-[Poppins] text-[#696969] font-medium cursor-pointer">
                    Register as seller
                  </li>
                </Link> */}
              </>
            )}
          </ul>
        )}
        <div className="flex md:hidden justify-between items-center">
          <IoReorderThree onClick={() => openSubmenu()} className="text-3xl cursor-pointer" />
          <Link to="/">
            {/* <img src="assets/cart.png" alt="logo" /> */}
            <p className="text-2xl my-2">Logo</p>
          </Link>
          <div className="flex gap-3 justify-between items-center cursor-pointer">
            {/* <MdOutlineShoppingBag />
            <CiSearch />
            <FaRegUser onClick={() => SetdropdownContent(true)} /> */}
            <button
              onClick={() =>
                isLoggedIn()
                  ? navigate("/wishlist")
                  : toast.error("Please Login First")
              }
            >
              <FiHeart className="text-xl cursor-pointer" />
            </button>
            <button
              onClick={() =>
                isLoggedIn()
                  ? navigate("/checkout/cart")
                  : toast.error("Please Login First")
              }
            >
              <HiOutlineShoppingBag className="text-xl cursor-pointer" />
            </button>
            {/* <FaRegUser
                onClick={() => SetdropdownContent(!dropdownContent)}
                className="text-lg cursor-pointer"
              /> */}
            <button
              onClick={() =>
                isLoggedIn()
                  ? navigate("/profile")
                  : SetdropdownContent(!dropdownContent)
              }
            >
              <FaRegUser className="text-lg cursor-pointer" />
            </button>
          </div>
        </div>
      </header>
      {isSubmenu && (
        <section>
          <div className="block md:hidden z-10 bg-white fixed sm:w-[50%] w-[100%] p-5 top-0 h-full right-0">
            <div className="flex justify-between items-center">
              <div className="mb-5">
                {/* <img src="assets/cart.png" alt="logo" /> */}
                <p className="text-2xl my-2">Logo</p>
              </div>
              <button className="text-black " onClick={() => closeSubmenu()}>
                <RxCross2 />
              </button>
            </div>
            <ul>
              <li
                onClick={() => closeSubmenu()}
                className="text-[#515151] cursor-pointer mb-5"
              >
                <Link to="/">Home</Link>
              </li>
              <li
                onClick={() => closeSubmenu()}
                className="text-[#515151] cursor-pointer mb-5"
              >
                <Link to="/collections">Collections</Link>
              </li>
              <li
                onClick={() => closeSubmenu()}
                className="text-[#515151] cursor-pointer mb-5"
              >
                <Link to="/men-collection">Men</Link>
              </li>
              <li
                onClick={() => closeSubmenu()}
                className="text-[#515151] cursor-pointer mb-5"
              >
                <Link to="/women-collection">Women</Link>
              </li>
              <li
                onClick={() => closeSubmenu()}
                className="text-[#515151] cursor-pointer mb-5"
              >
                <Link to="/kids-collection">Kids</Link>
              </li>
              {/* <li
                onClick={() => closeSubmenu()}
                className="text-[#515151] cursor-pointer mb-3"
              >
                <Link to="/brands">Brands</Link>
              </li> */}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
