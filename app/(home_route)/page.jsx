import About from "@/components/HomePage/About";
import Collection from "@/components/HomePage/Collection";
import Hero from "@/components/HomePage/Hero";
import Journel from "@/components/HomePage/Journel";
import Nav from "@/components/HomePage/Nav";
import Partner from "@/components/HomePage/Partner";
import Scroll from "@/components/HomePage/Scroll";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Partner />
      {/* <Scroll /> */}
      <Collection />
      <Journel />
      <About />
    </>
  );
};

export default HomePage;
