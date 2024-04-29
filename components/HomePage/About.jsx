import React from "react";

const About = () => {
  return (
    <section>
      <div className="px-[3%] ">
        <div className="gap-8 md:grid md:grid-cols-2">
          <div className="flex flex-col justify-center ">
            <div className="mt-20 mb-20 text-xl md:mb-0 md:mt-0 md:text-2xl">
              About Us
            </div>
            <div className="text-3xl md:text-6xl">
              I TRULY believe tea touches all our lives
            </div>
            <div className="mt-10 mb-0 md:max-w-[55%] text-2xl md:text-[28px] leading-8">
              Immerse yourself in our world of steeped opulence
            </div>
          </div>
          <div className="flex flex-col justify-center h-[100vh]">
            <div className="md:text-4xl text-2xl max-w-[90%] ">
              In the moments the rain is pouring outside your doorstep, in the
              moments you share desserts at your favorite aunts house, with
              cookies after your first day at a new job, or on your drive to
              search for your new home, chilled during a hot summers afternoon,
              at the table of a loved one speaking of their cancer, the lazy
              morning you wake up in a new country, and in the moment you first
              realize how truly wonderful this day is.
            </div>
            <div className="text-[#757575] mt-2 text-xs md:text-sm md:max-w-[90%]">
              Tea starts us off, meets us in the middle, and dances us through
              to the end. May all your days be filled with health, happiness,
              love, laughter, and the simplest pleasures life has to offer, like
              a beautiful cup of tea. Thank you for allowing us to share in your
              life's wondrous moments
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
