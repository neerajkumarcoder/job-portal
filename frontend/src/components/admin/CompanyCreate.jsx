import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constent"; // Check spelling: constant vs constent

function CompanyCreate() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  //  Page load par check karega ki token hai ya nahi
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log(" Token not found in LocalStorage!");
    } else {
      console.log("Token detected successfully.");
    }
  }, []);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required!");
      return;
    }

    try {
      // 1. LocalStorage se token nikalna
      const token = localStorage.getItem("token");

      //  DEBUG LOG: Isse humein confirmation milegi
      console.log("Request bhej rahe hain is token ke sath:", token);

      if (!token) {
        toast.error("Session missing. Please login again.");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log("API Error Details:", error.response);

      // 2. 401 Error Handling
      if (error.response?.status === 401) {
        toast.error("Your session is invalid or expired. Please login again.");
        localStorage.removeItem("token"); // Purana invalid token hata do
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Internal server error");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>

        <div className="space-y-4">
          <Label>Company Name</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="Google, Microsoft, etc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;
