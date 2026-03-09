import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../utils/constent";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // 1. LocalStorage se token nikalna
        const token = localStorage.getItem("token");

        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          headers: {
            // 2. Token ko Authorization header mein bhejna
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log("Error in useGetAppliedJobs:", error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
