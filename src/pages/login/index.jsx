import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HttpClient } from "../../server/client/http";
import { LogIn } from "../../server/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../components/loader";

export default function Login() {
  const navigate = useNavigate();
  const [forgetPassword, setForgetPassword] = useState(false);
  const [isShow, setisShow] = useState(false);
  const[loader,setLoader]=useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: resetPassword,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetError },
  } = useForm({ submitFocusError: true });
  const onResetSubmit = async (data) => {
    try {
      const { message } = await HttpClient.post("/users/forgetPassword", data);
      toast.success(message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const response = await HttpClient.post("/users/login", data);
      if(response){
        setLoader(false);
      }
      LogIn(response);
      toast.success("Login Successfully");
      if (response?.userData?.role === "SELLER") {
        navigate("/seller");
      } else if(response?.userData?.role === "ADMIN"){
        navigate("/admin");

      }
      else if(response?.userData?.role === "USER"){
        navigate("/profile");

      }
     
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      {loader ? <Loader /> :
        <section className="login-bg h-screen">
          <div className="go-home absolute right-[30px] top-[20px] z-[1]">
            <Link
              className="text-end text-[#011f4b] font-[Quicksand] font-medium"
              to="/"
            >
              Back to Home
            </Link>
            <div className="h-[2px] bg-[#011f4b] w-[0px] transition-all duration-300"></div>
          </div>
          <div className="absolute z-[1] w-full md:w-[50%] px-5 sm:px-0 right-0 text-center top-[25vh] font-[Quicksand]">
            {forgetPassword && (
              <div
                id="popup-modal"
                tabIndex="-1"
                className="font-[QuickSand] overflow-y-auto overflow-x-hidden  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div className="relative sm:p-4 w-full max-w-md max-h-full mx-auto">
                  <div className="text-end">
                    <button
                      onClick={() => setForgetPassword(false)}
                      type="button"
                      className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="popup-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                      <h3 className="mb-5 text-2xl font-semibold text-black font-[QuickSand]">
                        Forgot Password{" "}
                      </h3>
                      <form onSubmit={handleResetSubmit(onResetSubmit)}>
                        <label className="block my-3 text-[#011F4B]">
                          Enter Your Email-address to reset password
                        </label>
                        <input
                          type="email"
                          className={`bg-transparent rounded-lg text-[#011F4B] block border-[#6b7280] border-[1px] border-solid p-2 w-full outline-none my-3 ${resetError.email ? "border-red-500" : ""
                            } `}
                          {...resetPassword("email", {
                            required: "*email is required.",
                            pattern: {
                              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                              message: "*email is not valid.",
                            },
                          })}
                        />
                        {resetError.email && (
                          <p className="text-end errorMsg text-[#E40606]">
                            {resetError.email.message}
                          </p>
                        )}
                        <button
                          type="submit"
                          className="my-3 bg-[#011F4B]  text-white xl:text-xl lg:text-lg font-medium p-3  focus:outline-none rounded-lg   text-center w-full font-[QuickSand]"
                        >
                          Reset Password
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!forgetPassword && (
              <>
                <p className="font-semibold text-3xl md:4xl xl:text-6xl text-black mb-8">
                  LOG IN
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control mb-10">
                    <input
                      className="text-[#5A5A5A] pl-2 font-medium text-lg  border-b-2 border-black border-solid bg-transparent outline-none w-full sm:w-3/4 xl:w-1/2"
                      type="text"
                      name="email"
                      placeholder="Email"
                      {...register("email", {
                        required: "*username is required.",
                        pattern: {
                          value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                          message: "*username is not valid.",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="errorMsg text-[#E40606]">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="form-control relative">
                    <input
                      className="text-[#5A5A5A] pl-2 font-medium text-lg  border-b-2 border-black border-solid bg-transparent outline-none w-full sm:w-3/4 xl:w-1/2 my-3"
                      placeholder="Password"
                      type={isShow ? "text" : "password"}
                      name="password"
                      autoComplete="on"
                      {...register("password", {
                        required: "*Password is required.",
                        minLength: {
                          value: 8,
                          message: "*Password should be at-least 8 characters.",
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "*Password must contain one uppercase letter,one lowercase letter,one number,one special character.",
                          },
                        },
                      })}
                    />
                    {isShow ? (
                      <FaEyeSlash
                        onClick={() => setisShow(false)}
                        className="absolute bottom-[17px] right-[2%] sm:right-[15%] xl:right-[27%]"
                      />
                    ) : (
                      <FaEye
                        onClick={() => setisShow(true)}
                        className="absolute bottom-[17px] right-[2%] sm:right-[15%] xl:right-[27%]"
                      />
                    )}
                    {errors.password && (
                      <p className="errorMsg text-[#E40606]">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <p
                    onClick={() => setForgetPassword(true)}
                    className="text-[#011F4B] font-medium mt-2 mb-4 ml-[30%]"
                  >
                    <span className="cursor-pointer">FORGET PASSWORD?</span>
                  </p>
                  <button className="font-medium text-[#011F4B] border-2 border-solid border-[#011F4B] py-2 px-8">
                    LOG IN
                  </button>
                  <p className="text-[#5A5A5A] font-medium my-3">OR</p>
                  <div className="text-[#011F4B] font-medium go-home">
                    <div>
                    <Link
                      className="hover:underline decoration-2 underline-offset-4"
                      to="/"
                    >
                      CREATE AN ACCOUNT AS USER
                    </Link>
                    </div>
                    <div>
                    <Link
                      className="hover:underline decoration-2 underline-offset-4"
                      to="/"
                    >
                      CREATE AN ACCOUNT AS SELLER?
                    </Link>
                    </div>
                    
                  </div>
                </form>

              </>
            )}
          </div>
        </section>

      }

    </>
  );
}
