import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LogOut, User2, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constent";
import { setUser } from "../../redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Menu Links Helper
  const navLinks =
    user && user.role === "recruiter" ? (
      <>
        <li>
          <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>
            Companies
          </Link>
        </li>
        <li>
          <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>
            Jobs
          </Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>
            Jobs
          </Link>
        </li>
        <li>
          <Link to="/browse" onClick={() => setMenuOpen(false)}>
            Browse
          </Link>
        </li>
      </>
    );

  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8">
        {/* Logo */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Hamburger menu for mobile/tablet */}
        <button
          className="md:hidden p-2 rounded transition hover:bg-gray-100 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Main Nav Desktop & Tablet */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-5">{navLinks}</ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5224a1]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    // src="https://github.com/shadcn.png"
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 sm:w-80">
                <div className="flex gap-4 items-center space-y-0">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      // src="https://github.com/shadcn.png"
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile & Tablet Menu */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-50">
            <div className="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg flex flex-col p-6">
              <button
                className="self-end mb-6"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                {/* X icon with SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ul className="flex flex-col gap-4 font-medium mb-6">
                {navLinks}
              </ul>
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full" variant="outline">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-[#6A38C2] hover:bg-[#5224a1]">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-xs text-gray-500">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600 gap-3">
                    {user && user.role === "student" && (
                      <div className="flex items-center gap-2 cursor-pointer">
                        <User2 />
                        <Link
                          to="/profile"
                          onClick={() => setMenuOpen(false)}
                          className="text-blue-600 hover:underline"
                        >
                          View Profile
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2 cursor-pointer">
                      <LogOut />
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          logoutHandler();
                        }}
                        className="text-blue-600 hover:underline bg-none border-none p-0 outline-none"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
