import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constent";

function CompanyCreate() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required!");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
            // Yahan se Authorization header hata diya hai kyunki token ab cookie se jayega
          },
          withCredentials: true, // Ye automatically browser se token (cookie) bhej dega
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
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="my-8 md:my-10">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
            Your Company Name
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>

        <div className="space-y-2 sm:space-y-4">
          <Label className="text-sm sm:text-base">Company Name</Label>
          <Input
            type="text"
            className="my-2 w-full max-w-md"
            placeholder="Google, Microsoft, etc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 my-8 md:my-10 max-w-md">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button className="w-full sm:w-auto" onClick={registerNewCompany}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;
