import React from "react";
import dance from '../assets/dance.svg'

const Hero = () => {
  return (
    <>
      <div className="min-h-[100vh] sm:min-h-[600px] bg-blue-100 flex justify-center items-center text-white">
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col justify-center gap-6 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
              <h1
                data-aos="fade-up"
                data-aos-once="true"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold"
              >
                Experience the Most Vibrant{" "}
                <span
                  data-aos="zoom-out"
                  data-aos-delay="300"
                  className="bg-clip-text text-blue-600 bg-gradient-to-b from-primary to-primary/90 font-cursive"
                >
                  Dance
                </span>{" "}
                in the city
              </h1>
              <div data-aos="fade-up" data-aos-delay="400">
                <button className="bg-gradient-to-r from-primary to-secondary border-2 border-primary hover:scale-105 duration-200 text-blue-400 py-2 px-4 rounded-full">
                  stepSync Studio
                </button>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="300"
              className="min-h-[450px] sm:min-h-[250px] flex justify-center items-center relative order-1 sm:order-2 "
            >
              <img
                data-aos-once="true"
                src={dance}
                alt="biryani img"
                className="w-[300px] sm:w-[450px] sm:scale-125 mx-auto spin sm:min-h-[250px]"
              />
              
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;