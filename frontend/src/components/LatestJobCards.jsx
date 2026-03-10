import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

function LatestJobCards({ job }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job?._id}`)}
      className="p-4 sm:p-6 md:p-5 rounded-md shadow-2xl bg-white border border-gray-200 cursor-pointer transition hover:shadow-lg w-full max-w-full"
    >
      {/* <div>
        <h1 className="font-medium text-lg ">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div> */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 my-2">
        <Button className="p-3 sm:p-4 md:p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div className="flex flex-col">
          <h1 className="font-medium text-base sm:text-lg">{job?.company?.name}</h1>
          <p className="text-xs sm:text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-base sm:text-lg my-2">{job?.title}</h1>
        <p className="text-xs sm:text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex flex-col xs:flex-row xs:items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold text-xs sm:text-sm" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold text-xs sm:text-sm" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold text-xs sm:text-sm" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
