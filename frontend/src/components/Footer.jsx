import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

function Footer() {
  return (
     <footer className="bg-white  pt-15">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold ">
            Job<span className="text-[#6A38C2]">Hunt</span>
          </h2>
          <p className="mt-4 text-sm">
            JobHunt helps you find the right job faster. Search thousands of jobs
            from top companies and build your career.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold  mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#6A38C2] cursor-pointer">Home</li>
            <li className=" hover:text-[#6A38C2] cursor-pointer">Browse Jobs</li>
            <li className="hover:text-[#6A38C2]  cursor-pointer">Companies</li>
            <li className="hover:text-[#6A38C2]  cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold  mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#6A38C2]  cursor-pointer">Resume Tips</li>
            <li className="hover:text-[#6A38C2]  cursor-pointer">Interview Prep</li>
            <li className="hover:text-[#6A38C2]  cursor-pointer">Career Advice</li>
            <li className="hover:text-[#6A38C2]  cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold  mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 ">
            <Facebook className="hover:text-blue-600 text-[#6A38C2] cursor-pointer" />
            <Twitter className="hover:text-blue-400 text-[#6A38C2] cursor-pointer" />
            <Linkedin className="hover:text-blue-600 text-[#6A38C2] cursor-pointer" />
            <Instagram className="hover:text-pink-500 text-[#6A38C2] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm">
        © {new Date().getFullYear()} JobHunt. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer