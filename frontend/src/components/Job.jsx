import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const navigate = useNavigate();
  // const jobId=123456;

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-3 sm:p-4 md:p-5 rounded-md shadow-xl bg-white border-gray-200 max-w-full md:max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <div className="flex justify-end">
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 my-2">
        <div className="flex justify-center sm:justify-start mb-2 sm:mb-0">
          <Button className="p-4 sm:p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="font-medium text-base sm:text-lg">
            {job?.company?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-base sm:text-lg my-1 sm:my-2">
          {job?.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold text-xs sm:text-sm"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold text-xs sm:text-sm"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold text-xs sm:text-sm"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] w-full sm:w-auto">Save For Later</Button>
      </div>
    </div>
  );
}

export default Job;
