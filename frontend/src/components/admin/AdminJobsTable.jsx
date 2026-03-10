import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Responsive table styles (Tailwind CSS classes inline + some utility classes)
function AdminJobsTable() {
  const navigate = useNavigate();

  const allAdminJobs = useSelector((store) => store.job.allAdminJobs) || [];
  const searchJobByText = useSelector((store) => store.job.searchJobByText) || "";

  // Always start with []
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText || searchJobByText.trim() === "") return true;
      const searchLower = searchJobByText.toLowerCase();
      return job?.title?.toLowerCase().includes(searchLower) || job?.company?.name?.toLowerCase().includes(searchLower);
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="w-full overflow-x-auto">
      {/* Table - Hidden on small screens, visible on md+ */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>
            A list of your recent posted jobs
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  You haven't posted any Job yet.
                </TableCell>
              </TableRow>
            ) : (
              filterJobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>
                    {job?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${job._id}`)
                          }
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Card/List layout for small screens (mobile/tablet) */}
      <div className="md:hidden flex flex-col gap-4">
        {filterJobs.length === 0 ? (
          <div className="bg-white rounded shadow p-4 text-center text-sm text-gray-500">
            You haven't posted any Job yet.
          </div>
        ) : (
          filterJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded shadow p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-base font-semibold">
                    {job?.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {job?.company?.name}
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${job._id}`)
                      }
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-xs text-gray-500">
                Posted: {job?.createdAt?.split("T")[0]}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminJobsTable;
