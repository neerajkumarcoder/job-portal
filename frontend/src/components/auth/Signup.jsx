import Navbar from "../shared/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constent.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice.js";
import { Loader2 } from "lucide-react";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      // FIX: Content-Type header hata diya hai taki browser khud boundary set kare
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          // "Content-Type": "multipart/form-data", // Ye line error de rahi thi
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      {/* Responsive container: px-2 for mobile, px-8 for md+ */}
      <div className="flex items-center justify-center max-w-7xl mx-auto px-2 md:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-4 md:p-6 my-6 sm:my-8 md:my-10 bg-white"
        >
          <h1 className="font-bold text-xl md:text-2xl mb-5 text-center md:text-left">Sign up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="patel"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="patel@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="number"
              placeholder=""
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            ></Input>
          </div>
          {/* Responsively stack on mobile, flex-row for md+ */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 my-5">
                          <div className="flex items-center gap-2">
                            <Input
                              type="radio"
                              name="role"
                              value="student"
                              checked={input.role === "student"}
                              onChange={changeEventHandler}
                              className="cursor-pointer w-4 h-4"
                            />
                            <Label className="cursor-pointer">Student</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="radio"
                              name="role"
                              value="recruiter"
                              checked={input.role === "recruiter"}
                              onChange={changeEventHandler}
                              className="cursor-pointer w-4 h-4"
                            />
                            <Label className="cursor-pointer">Recruiter</Label>
                          </div>
                        </RadioGroup>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <Label>Add Profile Photo</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span className="text-sm block text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
