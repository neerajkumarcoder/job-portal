import { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../utils/axios";
import { setCompanies } from "../redux/companySlice";

function useGetAllCompanies() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await API.get("/company/get");

        if (res.data.success) {
          // Agar sab sahi hai, toh backend ka data set karo (ya khali array)
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Error in useGetAllCompanies:", error);
        // 👇 SAFETY NET: Agar API fail ho jaye, toh screen par purana kachra na dikhe
        dispatch(setCompanies([]));
      }
    };
    fetchCompanies();
  }, [dispatch]);
}

export default useGetAllCompanies;
