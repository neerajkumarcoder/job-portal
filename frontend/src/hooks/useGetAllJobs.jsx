import React, { useEffect } from "react";
import { setAllJobs } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constent";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // 1. LocalStorage se token nikaalein
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          {
            headers: {
              // 2. Token ko Authorization header mein bhejein
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error in useGetAllJobs:", error);
      }
    };
    fetchAllJobs();
  }, [searchedQuery, dispatch]); // ✅ FIX: searchedQuery add kiya taaki search refresh ho
}

export default useGetAllJobs;
