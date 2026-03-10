import React from "react";
import LatestJobCards from "./LatestJobCards";
import Footer from "./Footer";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings{" "}
      </h1>
      {/* Responsive grid: 1 col (mobile), 2 cols (sm, md), 3 cols (lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available </span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => (
              <LatestJobCards className="cursor-pointer" key={job._id} job={job} />
            ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LatestJobs;
