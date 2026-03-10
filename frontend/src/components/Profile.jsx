import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = user?.profile?.resume && user?.profile?.resume.trim() !== "";

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage src="https://img.freepik.com/premium-vector/creative-elegant-abstract-minimalistic-logo-design-vector-any-brand-company_1287271-18452.jpg?semt=ais_hybrid&w=740&q=80" />
            </Avatar>
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <h1 className="font-medium text-lg sm:text-xl wrap-break-word">{user?.fullname}</h1>
              <p className="wrap-break-word">{user?.profile?.bio}</p>
            </div>
          </div>
          <div className="self-center mt-3 md:mt-0">
            <Button
              onClick={() => setOpen(true)}
              className="text-right"
              variant="outline"
              size="icon"
            >
              <Pen />
            </Button>
          </div>
        </div>
        <div className="my-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 my-2">
            <Mail />
            <span className="wrap-break-word">{user?.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 my-2">
            <Contact />
            <span className="wrap-break-word">{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-bold mb-2">Skills</h1>
          <div className="flex flex-wrap items-center gap-1">
            {user?.profile?.skills.length != 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge variant="outline" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-full sm:max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer break-all"
              download={user?.profile?.resumeOriginalName}
            >
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-full mt-2">
        <h1 className="text-lg font-bold my-5 text-center md:text-left">Applied Jobs</h1>
        {/* Application Table  */}
        <div className="overflow-x-auto">
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
