import { f2f, newAgeFontBold } from "@/fonts/font";
import React from "react";

export const Footer = () => {
  return (
    <footer className=" border-t-4 rounded-sm border-gray-200 px-6 sm:p-10 mb-10 mt-40">
      <div className="flex flex-col sm:flex-row justify-between space-y-6 sm:space-y-0 pt-6">
        <div>
          <a
            href="#"
            className="text-6xl font-bold text-primary"
            style={f2f.style}
          >
            SANDBOX
          </a>
          <p className="text-gray-500 mt-2">
            &copy; 2024 Sandbox. Decentralizing hackers Portfolios.
          </p>
        </div>
        <div className="grid grid-cols-2  gap-6">
          <div>
            <h4
              className="text-primary text-lg font-medium mb-2"
              style={newAgeFontBold.style}
            >
              Platform
            </h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Passport
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Stamps
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Hackathons
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className="text-primary text-lg font-medium mb-2"
              style={newAgeFontBold.style}
            >
              For Community
            </h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Hackers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Event Organizers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Verification
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  How It Works
                </a>
              </li>
            </ul>
          </div>
          {/* <div>
            <h4
              className="text-primary text-lg font-medium mb-2"
              style={newAgeFontBold.style}
            >
              Resources
            </h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                  Brand Assets
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </footer>
  );
};
