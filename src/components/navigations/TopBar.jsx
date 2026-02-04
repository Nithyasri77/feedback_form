import React from "react";
import { ArrowLeft } from "lucide-react";
import CompanyLogo from "../../assets/FINAL.svg";
import CompanyName from "../../assets/Logotextonly.svg";

const TopBar = ({ onBack }) => {
  return (
    <div className="bg-[#000001] border-b border-gray-700 px-4 py-4">
      <div className="max-w-full sm:max-w-2xl mx-auto relative gap-4 flex justify-center items-center">

        <button
          type="button"
          onClick={onBack}
          className="absolute left-0 top-1 px-3 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center space-x-2 text-white"
        >
          {/* back arrow svg */}
          <ArrowLeft size={28}/>
        </button>

        <div className="flex justify-start items-center gap-3 mt-0 p-1.75">
          <div>
            <img
              src={CompanyLogo}
              alt="Company Logo"
              className="h-20 sm:h-20 md:h-20 w-auto object-contain"
            />
          </div>

          <div>
            <img
              src={CompanyName}
              alt="Company Name"
              className="h-14 sm:h-14 md:h-14 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
