import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { setSearchedQuery } from "../redux/jobSlice";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  };

  return (
    <div className="text-center px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Search, Apply & <br className="hidden sm:block" /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-gray-600 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base">
          Find the right job that matches your skills and career goals. Explore
          thousands of opportunities from top companies, apply easily, and take
          the next step towards a successful future.
        </p>
        <div className="flex w-full sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto bg-white">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full py-2 px-2 text-sm sm:text-base rounded-l-full bg-white"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2] px-4 py-2 min-w-0"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
