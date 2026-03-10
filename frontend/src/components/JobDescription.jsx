import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "../redux/jobSlice";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id,
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsApplied(true); //update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id,
            ),
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  return (
    <div className="max-w-7xl mx-auto my-10 px-2 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
        <div>
          <h1 className="font-bold text-lg sm:text-xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {" "}
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {" "}
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {" "}
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <div className="w-full md:w-auto shrink-0">
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`w-full md:w-auto mt-4 md:mt-0 rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font font-medium py-4 text-base sm:text-lg">
        {singleJob?.description}
      </h1>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-3">
        <h1 className="font-bold my-1 text-base sm:text-lg">
          Role:
          <span className="pl-4 font-normal text-gray-800 block sm:inline">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-base sm:text-lg">
          Location:
          <span className="pl-4 font-normal text-gray-800 block sm:inline">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-base sm:text-lg">
          Description:
          <span className="pl-4 font-normal text-gray-800 block sm:inline">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-base sm:text-lg">
          Experience:
          <span className="pl-4 font-normal text-gray-800 block sm:inline">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1 text-base sm:text-lg">
          Salary:
          <span className="pl-4 font-normal text-gray-800 block sm:inline">
            {singleJob?.salary}LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 text-base sm:text-lg">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800 block sm:inline">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1 text-base sm:text-lg">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800 block sm:inline">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default JobDescription;
