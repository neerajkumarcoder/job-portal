import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constent";
import { setCompanies } from "../redux/companySlice";

function useGetAllCompanies() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // 1. LocalStorage se token nikaalein
        const token = localStorage.getItem("token");

        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          headers: {
            // 2. Token ko Authorization header mein bhejein
            // Iske bina Render (Backend) request reject kar dega
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Error in useGetAllCompanies:", error);
      }
    };
    fetchCompanies();
  }, [dispatch]); // dispatch ko dependency mein daalna achhi practice hai
}

export default useGetAllCompanies;
