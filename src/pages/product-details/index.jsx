import React, { useEffect, useState } from "react";
import { PiCurrencyInr } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { isLoggedIn } from "../../server/user";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import EmailLink from "../../components/e-mail-link";
import MobileNumberLink from "../../components/phone";

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({
    colors: [],
    sizes: [],
    productDetails: [],
    sizeAndFit: [],
  });
  const [similarProducts, setSimilarProducts] = useState([]);
  const [moreProductsFromBrands, setMoreProductsFromBrands] = useState([]);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [images, setImages] = useState([]);
  const [isOpenSellerDetails, setIsOpenSellerDetails] = useState(false);
  const [pincode, setPincode] = useState("");
  const {
    register: registerPincode,
    handleSubmit: handleSubmitPincode,
    formState: { errors: errorsPincode },
    // reset: resetPincode,
  } = useForm();

  const getProductDetails = async (productId) => {
  
    try {
      const { product } = await HttpClient.get(`/product/productId`,
        {
          productId:productId ,
        }
      );
      await getSimilarProduct(product?.category?._id);
      await getMoreProductsFromBrands(product?.brand?._id);
      setProductDetails(product);
      setSize(product?.sizes[0].size);
      setColor(product?.colors[0].colorCode);
      setImages(product?.colors[0]?.images);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getSimilarProduct = async (_id) => {
    try {
      const { products } = await HttpClient.get(`/product?category=${_id}`);
      setSimilarProducts(products);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getMoreProductsFromBrands = async (_id) => {
    try {
      const { products } = await HttpClient.get(`/product?brand=${_id}`);
      setMoreProductsFromBrands(products);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const addToCart = async () => {
    console.log("Product Details:", productDetails);
    try {
      const { message } = await HttpClient.post("/cart", {
        _id: productDetails._id,
        productId: productDetails.productId,
        name: productDetails.name,
        bannerImage: productDetails.bannerImage,
        size,
        color,
        quantity: 1,
        price: productDetails.price,
        discount: productDetails.discount ?? 0,
        seller: productDetails?.seller,
        isReturnable: productDetails?.isReturnable,
      });
      toast.success(message);
      console.log("API Response:", message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const addToWishlist = async () => {
    try {
      const { message } = await HttpClient.post("/wishlist", {
        _id: productDetails._id,
        productId: productDetails.productId,
        name: productDetails.name,
        bannerImage: productDetails.bannerImage,
        size,
        color,
        quantity: 1,
        price: productDetails.price,
        discount: productDetails.discount ?? 0,
        seller: productDetails?.seller,
      });
      toast.success(message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message)
    }
  };

  const checkPincode = (data) => {
    setPincode(data?.pincode);
    toast.success("We are available at this place.");
  };

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  return (
    <div className="p-10 sm:px-20 font-[Quicksand]">
      <section className="grid lg:grid-cols-2 gap-7">
        <div>
          <div className="grid sm:grid-cols-2 gap-5">
            {images.length ?
              images.map((img, i) => {
                return (
                  <div key={i}>
                    <img
                      className="object-cover w-full rounded-lg h-[80vh]"
                      src={img}
                      alt={productDetails?.name}
                    />
                  </div>
                );
              }) : <h2>No Product Image Available</h2>}
          </div>
        </div>
        <div>
          <div>
            <p className="font-[Quicksand] font-semibold text-xl mb-2">
              {productDetails?.name}
            </p>
            <p className="font-[Quicksand] font-normal mb-2 text-[#4c4c4c]">
              {productDetails?.description}
            </p>
            <p className="font-medium mb-2 font-[Poppins]">
              <PiCurrencyInr className="inline-block" />
              {productDetails?.price}
              {/* <span>(60% off)</span> */}
            </p>
            <p className="text-[#50AD06] mb-2 font-medium font-[Poppins]">
              inclusive of all taxes
            </p>
            <p className="font-medium mb-3 text-[#6C6C6C] font-[Poppins]">
              Select Size
              <span className="ml-3 text-[#011F4B] font-[Poppins]">
                Size Chart &gt;
              </span>
            </p>
            <ul className="flex gap-5 text-[#2D2D2D] font-medium font-[Poppins]">
              {productDetails?.sizes.map((info, i) => {
                return (
                  <li
                    className="flex items-center justify-center rounded-full w-[40px] h-[40px] border-2"
                    key={i}
                  >
                    {info?.size}
                  </li>
                );
              })}
            </ul>
            <div className="my-4">
              <p className="font-medium mb-3 text-[#6C6C6C] font-[Poppins]">
                Select Color
              </p>
              <ul className="flex gap-5 text-[#2D2D2D] font-medium font-[Poppins]">
                {productDetails?.colors.length &&
                  productDetails?.colors.map((info, i) => {
                    return (
                      <li
                        key={i}
                        className="h-10 w-10 rounded-full cursor-pointer"
                        style={{ backgroundColor: info?.colorCode }}
                      />
                    );
                  })}
              </ul>
            </div>
            <div className="flex gap-5 flex-wrap sm:flex-nowrap">
              <button
                className="font-[Quicksand] w-full sm:w-auto font-medium text-sm xl:text-xl py-[5px] text-white px-12 bg-[#011F4B] rounded-md"
                onClick={() =>
                  isLoggedIn() ? addToCart() : toast.error("please Login First")
                }
              >
                Add To Bag
              </button>
              <button
                className="font-[Quicksand] w-full sm:w-auto font-medium text-[#2D2D2D] text-sm xl:text-xl py-[5px] px-12 bg-[#FFFFFF] border-2 rounded-md"
                onClick={() =>
                  isLoggedIn()
                    ? addToWishlist()
                    : toast.error("please Login First")
                }
              >
                WishList
              </button>
            </div>
          </div>
          <hr className="my-4" />
          <div className="font-[Poppins]">
            <p className="text-[#4D4D4D] font-medium text-lg mb-2 font-[Poppins]">
              DELIVERY OPTIONS <CiDeliveryTruck className="inline-block" />{" "}
            </p>
            <form onSubmit={handleSubmitPincode(checkPincode)}>
              <div className="relative">
                <input
                  className="text-[#9B9B9B] font-normal outline-none border-2 rounded-md py-3 pr-7 pl-3 mb-2"
                  type="text"
                  placeholder="Enter Pincode*"
                  {...registerPincode("pincode", {
                    required: "Pincode is required.",
                    validate: {
                      notStartWithZero: (value) =>
                        value[0] !== "0" ||
                        "Pincode should not start with zero",
                      length: (value) =>
                        value.length === 6 ||
                        "Pincode must be exactly 6 digits long",
                    },
                  })}
                />
                <button className="text-[#011F4B] absolute top-[13px] left-[180px]">
                  Check
                </button>
              </div>
              {errorsPincode.pincode && (
                <p className="text-red-600 text-sm mb-2">
                  {errorsPincode.pincode.message}
                </p>
              )}
            </form>
            <p className="font-normal text-[#909090] text-sm mb-7">
              Please enter PIN code to check delivery time & Pay on Delivery
              Availability
            </p>
            <div className="mb-3">
              <p className="font-medium text-[#6C6C6C] font-[Poppins]">
                Seller Details
              </p>
              <p className="font-medium text-[#909090] font-[Poppins] pl-2 text-base">
                Name :{" "}
                {productDetails?.seller?.firstName +
                  " " +
                  productDetails?.seller?.lastName}
              </p>
              <p className="font-medium text-[#909090] font-[Poppins] pl-2 text-base">
                Product Code : {productDetails?.productId}
              </p>
              <button
                className="text-[#011F4B] underline"
                onClick={() => setIsOpenSellerDetails(true)}
              >
                View Details
              </button>
            </div>
            <div className="text-[#4D4D4D] font-normal mb-7">
              <p className="mb-2">100% Original Products</p>
              <p className="mb-2">Pay on delivery might be available</p>
              <p className="mb-2">Easy 7 days returns and exchanges</p>
              <p className="mb-2">Try & Buy might be available</p>
            </div>
            <div className="text-[#4D4D4D] font-normal">
              <p className="mb-2">BEST OFFERS</p>
              <p className="mb-2">
                Best Price:<span>Rs.758</span>
              </p>
              <ul>
                <li className="mb-2 list-disc ml-7">
                  Coupon code:
                  <span className="text-[#011F4B] font-medium">KURTI300</span>
                </li>
                <li className="mb-2 list-disc ml-7">
                  Coupon Discount:Rs. 240 off (check cart for final savings)
                </li>
                <li className="mb-2 list-disc ml-7">
                  Applicable on:Orders above Rs. 1249 (only on first purchase)
                </li>
              </ul>
              <p className="mb-2">Products</p>
              <p className="mb-2">Max Discount Up to ₹750 on every spends.</p>
              <p>
                <Link to="" className="text-[#011F4B] underline">
                  Terms & Condition
                </Link>
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="font-[Poppins]">
            {productDetails?.productDetails.length !== 0 && (
              <div>
                <p className="font-semibold text-[#4D4D4D] mb-2">
                  PRODUCT DETAILS
                </p>
                <ul>
                  {productDetails?.productDetails.map((element, i) => {
                    return (
                      <li
                        className="mb-2 list-disc ml-7 font-normal text-[#4D4D4D]"
                        key={i}
                      >
                        {element}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {productDetails?.sizeAndFit.length !== 0 && (
              <div>
                <p className="font-semibold text-[#4D4D4D] mb-2">Size & Fit</p>
                <ul>
                  {productDetails?.sizeAndFit.map((element, i) => {
                    return (
                      <li
                        className="mb-2 list-disc ml-7 font-normal text-[#4D4D4D]"
                        key={i}
                      >
                        {element}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {productDetails?.materialAndCare && (
              <div>
                <p className="font-semibold text-[#4D4D4D] mb-2">
                  Material & Care
                </p>
                <p className="font-normal mb-2 text-[#4D4D4D]">
                  {productDetails?.materialAndCare}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="py-4">
        <p className="font-[Quicksand] font-medium mb-4 text-center text-[#011F4B] text-4xl">
          SIMILAR PRODUCTS
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {similarProducts.slice(0, 5).map((info, i) => {
            return (
              <div className="w-full border-2" key={i}>
                <div>
                  <img
                    className="w-full h-[300px] object-cover"
                    src={info?.bannerImage || "/assets/similar-lady.png"}
                    alt={info?.name}
                  />
                </div>
                <div className="font-[Poppins] py-[5px] px-3">
                  <p>{info?.name}</p>
                  <p className="text-[#4C4C4C]">{info?.description}</p>
                  <p className="">
                    {"₹ " + info?.price}
                    {/* <span className="text-[#011F4B] font-medium">(45% OFF) </span> */}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="py-4">
        <p className="font-[Quicksand] font-medium mb-4 text-center text-[#011F4B] text-4xl">
          More from brands
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {moreProductsFromBrands.slice(0, 5).map((info, i) => {
            return (
              <div className="w-full border-2" key={i}>
                <div>
                  <img
                    className="w-full h-[300px] object-cover"
                    src={info?.bannerImage || "/assets/similar-lady.png"}
                    alt={info?.name}
                  />
                </div>
                <div className="font-[Poppins] py-[5px] px-3">
                  <p>{info?.name}</p>
                  <p className="text-[#4C4C4C]">{info?.description}</p>
                  <p className="">
                    {"₹ " + info?.price}
                    {/* <span className="text-[#011F4B] font-medium">(45% OFF) </span> */}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Transition appear show={isOpenSellerDetails}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none cart"
          onClose={() => {
            setIsOpenSellerDetails(false);
          }}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 bg-[rgba(0,0,0,.6)]">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white text-black p-6 max-h-[80vh] overflow-scroll m-auto">
                  <div className="mt-2 text-sm/6">
                    <div className="pb-3 font-[Poppins] relative border-b">
                      <button
                        className="flex items-center justify-center absolute top-1 right-3 h-6 w-6 rounded-full bg-white font-bold text-xl"
                        onClick={() => {
                          setIsOpenSellerDetails(false);
                        }}
                        type="button"
                      >
                        <RxCross2 className="text-md" />
                      </button>
                      <p className="text-[#535353] font-medium text-lg text-center">
                        Seller Details
                      </p>
                    </div>
                    <div className="my-3">
                      <h3 className="text-lg font-bold text-[#535353] mb-1">
                        More Information
                      </h3>
                      <p className="font-medium text-[#535353] font-[Poppins] pl-2 text-base">
                        Product Code : {productDetails?.productId}
                      </p>
                    </div>
                    <div className="my-3">
                      <h3 className="text-lg font-bold text-[#535353]">
                        Manufacturer Details
                      </h3>
                      <p className="font-medium text-[#535353] font-[Poppins] pl-2 text-base">
                        {productDetails?.productId}
                      </p>
                    </div>
                    <div className="my-3">
                      <h3 className="text-lg font-bold text-[#535353]">
                        Packer Details
                      </h3>
                      <p className="font-medium text-[#535353] font-[Poppins] pl-2 text-base">
                        Product Code : {productDetails?.productId}
                      </p>
                    </div>
                    <div className="my-3 flex gap-3 justify-between">
                      {productDetails?.seller?.email ? (
                        <EmailLink email={productDetails?.seller?.email} />
                      ) : (
                        ""
                      )}
                      {productDetails?.seller?.mobileNumber ? (
                        <MobileNumberLink
                          number={productDetails?.seller?.mobileNumber}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
