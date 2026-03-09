import React, { useEffect } from "react";
import { setAllAdminJobs } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constent";

function useGetAllAdminJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        // 1. LocalStorage se token nikalna
        const token = localStorage.getItem("token");

        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          headers: {
            // 2. Token ko Header mein bhejna (Bearer format)
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error in useGetAllAdminJobs:", error);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]); // dispatch ko dependency mein rakhna best practice hai
}

export default useGetAllAdminJobs;
