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

function AdminJobsTable() {
  const navigate = useNavigate();

  // const searchCompanyByText = useSelector(
  //   (store) => store.company.searchCompanyByText
  // );

  //  SAFE selector
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
                    <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                      <Eye className="w-4"/>
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
  );
}

export default AdminJobsTable;
