import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constent";
import { setSingleCompany } from "../redux/companySlice";

function useGetCompanyById(companyId) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        // 1. LocalStorage se token nikalna
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            headers: {
              // 2. Authorization header add kiya
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log("Error in useGetCompanyById:", error);
      }
    };

    // Tabhi call karein jab companyId available ho
    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId, dispatch]);
}

export default useGetCompanyById;
