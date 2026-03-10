import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constent.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice.js";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!input.email || !input.password || !input.role) {
      return toast.error("All fields are required");
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        //  Pehle check karo ki token actual mein backend se aaya hai ya nahi.
        // Ye aapke browser ko "undefined" text save karne se bachayega.
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        } else {
          console.warn(
            " Token not received in JSON. Relying purely on HTTP-Only Cookies.",
          );
        }

        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Login Failed. Try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Agar user already logged in hai toh home page pe bhej do
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-2 sm:px-4">
        <form
          onSubmit={submitHandler}
          className="
            w-full
            sm:w-3/4
            md:w-2/3
            lg:w-1/2
            border border-gray-200 rounded-md p-4 my-10 shadow-sm
            bg-white
            "
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="your password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="text-sm block text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
