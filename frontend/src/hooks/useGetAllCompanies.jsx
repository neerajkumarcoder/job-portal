import { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../utils/axios";
import { setCompanies } from "../redux/companySlice";

function useGetAllCompanies() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Sirf ek clean API call!
        const res = await API.get("/company/get");

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Error in useGetAllCompanies:", error);
      }
    };
    fetchCompanies();
  }, [dispatch]);
}

export default useGetAllCompanies;
