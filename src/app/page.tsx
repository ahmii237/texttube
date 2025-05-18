"use client";
import React from "react";
import Header from "../components/Hero";
import Tips from "@/components/Tips";
import AutoScrollFeedback from "@/components/AutoScrollFeedback";
import Texttubeusers from "@/components/Texttubeusers";
import Faqs from "@/components/Faqs";


const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />

      <section className="w-full px-4 max-w-6xl mt-10">
        <h2 className="text-4xl font-bold text-center mb-6">
          Why Choose TextTube?
        </h2>

        {/* Tips and TextTube Users in one row */}
        <div id="features" className="flex flex-col md:flex-col gap-8 mb-12">
          
          <div className="">
            <Tips />
          </div>

          
          <div className="">
            <Texttubeusers />
          </div>
        </div>

      </section>

      <section
        id="feedback"
        className="w-full px-4 max-w-6xl mt-16 flex flex-col items-center"
      >
        <h2 className="text-4xl font-bold text-center mb-6">
          What People Are Saying
        </h2>
        <AutoScrollFeedback />
        <section id="faqs" >
          <Faqs />
        </section>
      </section>
    </div>
  );
};

export default Home;
