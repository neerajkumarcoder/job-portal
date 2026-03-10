import React from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constent";

const shortlistingStatus = ["Accepted", "Rejected"];

function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-150 md:min-w-full text-xs sm:text-sm md:text-base">
        <TableCaption className="text-xs md:text-sm"> A list of your applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-30">FullName</TableHead>
            <TableHead className="min-w-37.5">Email</TableHead>
            <TableHead className="min-w-22.5">Contact</TableHead>
            <TableHead className="min-w-22.5">Resume</TableHead>
            <TableHead className="min-w-20">Date</TableHead>
            <TableHead className="text-right min-w-20">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id} className="border-b last:border-none hover:bg-gray-50 transition md:hover:bg-gray-100">
                <TableCell className="whitespace-nowrap">{item?.applicant?.fullname}</TableCell>
                <TableCell className="whitespace-nowrap">{item?.applicant?.email}</TableCell>
                <TableCell className="whitespace-nowrap">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 cursor-pointer underline"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
      <style jsx="true">{`
        @media (max-width: 768px) {
          /* Scroll table horizontally, reduce font size */
          .min-w-\[600px\] {
            min-width: 600px !important;
          }
          .text-xs {
            font-size: 0.75rem !important;
          }
        }
        @media (max-width: 640px) {
          .text-xs {
            font-size: 0.7rem !important;
          }
          .min-w-\[90px\], .min-w-\[80px\], .min-w-\[120px\], .min-w-\[150px\] {
            min-width: 70px !important;
          }
          .min-w-\[600px\] {
            min-width: 400px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ApplicantsTable;
