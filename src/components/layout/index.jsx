import React, { useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";
import Loader from "../loader";

export default function Layout({ changeHeaderColor, children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      {isLoading ? (
        <div
        className="h-[100vh]"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
         <Loader />
      </div>
      ) : (
        <>
        {/* <div className="fixed top-0 left-0 w-full z-10 bg-[]">
        <Header changeHeaderColor={changeHeaderColor} />
        </div> */}
          {/* <Header changeHeaderColor={changeHeaderColor} /> */}
          <div
            className={`fixed top-0 left-0 w-full z-10 h-[80px] transition-colors duration-1000 ${
              isScrolled ? "bg-[#FFFFFF]" : "bg-transparent"
            }`}
          >
            <Header changeHeaderColor={changeHeaderColor} />
          </div>
          {children}
          <Footer />
        </>
      )}
    </div>
  );
}
