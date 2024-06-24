import React from "react";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import WebHostingPlan from "@/components/home/WebHostingPlan";

const Home = () => {
  return (
    <div>
      <Hero />
      <h2 className="text-center mt-10 text-3xl font-bold">
        choose your web hosting plan
      </h2>
      <div className="container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </div>
  );
};

export default Home;
