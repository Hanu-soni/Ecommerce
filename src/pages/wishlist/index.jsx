import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HttpClient } from "../../server/client/http";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

export default function WishList() {
  const [products, setProducts] = useState([]);

  const fetchWishlist = async () => {
    try {
      const { data } = await HttpClient.get("/wishlist");
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const removeProductFromWishlist = async (productIdName) => {
    try {
      const { message } = await HttpClient.put("/wishlist/remove", {
        productIdName,
      });
      toast.success(message);
      fetchWishlist();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const moveToCart = async (productIdName) => {
    try {
      const { message } = await HttpClient.put("/wishlist/addToBag", {
        productIdName,
      });
      toast.success(message);
      fetchWishlist();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <section className="px-10 sm:px-20 py-7 font-[Quicksand]">
      {Object.keys(products).length ? (
        <div>
          <h2 className="text-lg font-bold text-[#282c3f] mb-9">
            My Wishlist{" "}
            <span className="font-normal">
              {Object.keys(products).length} items
            </span>
          </h2>
          <div className="grid grid-cols-4 gap-9 text-center">
            {Object.keys(products).map((key, i) => {
              return (
                <div
                  key={i}
                  className="border border-solid border-[#e9e9eb] relative"
                >
                  <button
                    className="flex items-center justify-center absolute top-3 right-3 h-6 w-6 border border-solid border-[#d4d5d9] rounded-full bg-white font-bold text-xl"
                    onClick={() => removeProductFromWishlist(key)}
                  >
                    <RxCross2 className="text-sm" />
                  </button>
                  <Link to={`/product-details/${products[key].productId}`}>
                    <img
                      src={products[key]?.bannerImage}
                      alt={products[key]?.name}
                      className="w-full h-[294px]"
                    />
                  </Link>
                  <p className="text-ellipsis my-3 text-base text-[#282c3f]">
                    {products[key]?.name}
                  </p>
                  <p className="text-ellipsis mb-3 text-base text-[#282c3f] font-bold">
                    {"₹ " + products[key]?.price}
                  </p>
                  <div className="py-3 text-center border-t border-solid border-[#e9e9eb]">
                    <button
                      className="text-[#ff3e6c] font-bold text-sm"
                      onClick={() => moveToCart(key)}
                    >
                      MOVE TO BAG
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <h2 className="text-xl font-semibold mb-2">YOUR WISHLIST IS EMPTY</h2>
          <p className="mb-3">Add items that you like to your wishlist.</p>
          <img
            className="h-[200px] my-3"
            src="./assets/wishlistEmpty.png"
            alt="wishlistEmpty"
          />
          <Link
            to="/"
            className="py-3 px-12 text-lg font-semibold text-[#3466e8] border border-solid border-[#3466e8] rounded"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      )}
    </section>
  );
}
