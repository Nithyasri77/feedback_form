import { useState } from "react";
import { useFormUI } from "../context/FormUIContext";
import {
  ChevronDown,
  Phone,
  Globe,
  Mail,
  MapPin,
  CalendarDays,
  X,
  Upload,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import CompanyLogo from "../../public/images/FINAL.svg";
import CompanyName from "../../public/images/LogotextwithMotto.svg";

const Step1Personal = ({ onNext, shake }) => {
  const {
    register,
    control,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      
      {/* HEADER BOX */}
      <div
        className="-mx-6 bg-gray-800 py-11 pb-7 px-6 bg-cover bg-no-repeat relative"
        style={{ backgroundImage: "url('/images/bg-2.jpg')" }}
      >
        <div className="max-w-md sm:max-w-lg mx-auto p-5">
          <div className="flex justify-start items-center gap-3 mt-0 mb-10">
            <img src={CompanyLogo} alt="Company Logo" className="h-20 w-auto" />
            <img src={CompanyName} alt="Company Name" className="h-16 w-auto" />
          </div>

          <h1 className="text-[27px] sm:text-3xl md:text-4xl font-bold mb-4">
            Submit Your Feedback Form
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed mb-8">
            Please fill out the form below to complete your employee enrollment.
          </p>

          <div className="space-y-4">
            <div className="text-lg flex items-center gap-2">
              <Phone /> +91 7200353789
            </div>
            <div className="text-lg flex items-center gap-2">
              <Mail /> shinecrafttech@gmail.com
            </div>
            <div className="text-lg flex items-center gap-2">
              <Globe /> www.shinecrafttechnologies.com
            </div>
            <div className="text-lg flex items-center gap-2">
              <MapPin /> Puducherry
            </div>
          </div>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto py-8">
        <div
          className={`bg-[#1a1a1a] shadow-lg rounded-md p-6 ${
            shake ? "shake" : ""
          }`}
        >
          <h2 className="text-2xl font-semibold mb-8">
            Personal Information
          </h2>

          {/* FULL NAME */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Your Full Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("fullName", {
                onChange: () => clearErrors("fullName"),
              })}
              placeholder="Enter your full name"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />
            {showErrors && errors.fullName && (
              <p className="text-sm text-red-400">
                * {errors.fullName.message}
              </p>
            )}
          </div>

          {/* MOBILE NUMBER */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Mobile Number <span className="text-red-400">*</span>
            </label>
            <input
              {...register("mobileNumber", {
                onChange: () => clearErrors("mobileNumber"),
              })}
              placeholder="Enter your mobile number"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />
          </div>

          {/* COLLEGE NAME */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              College Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("collegeName", {
                onChange: () => clearErrors("collegeName"),
              })}
              placeholder="Enter your college name"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />
          </div>

          {/* DEPARTMENT */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Department / Specialization{" "}
              <span className="text-red-400">*</span>
            </label>
            <input
              {...register("department", {
                onChange: () => clearErrors("department"),
              })}
              placeholder="e.g. Computer Science"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />
          </div>

          {/* START DATE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Internship Start Date{" "}
              <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("startDate", {
                  onChange: () => clearErrors("startDate"),
                })}
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                <CalendarDays />
              </span>
            </div>
          </div>

          {/* END DATE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Internship End Date{" "}
              <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("endDate", {
                  onChange: () => clearErrors("endDate"),
                })}
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                <CalendarDays />
              </span>
            </div>
          </div>

          {/* INTERNSHIP MODE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Internship Mode <span className="text-red-400">*</span>
            </label>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Online"
                  {...register("mode")}
                />
                Online
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Offline"
                  {...register("mode")}
                />
                Offline
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Hybrid"
                  {...register("mode")}
                />
                Hybrid
              </label>
            </div>
          </div>
        </div>

        {/* NEXT BUTTON */}
        <div className="mt-5 mb-8">
          <button
            type="button"
            onClick={onNext}
            className="max-w-lg w-full py-4 rounded-full bg-white text-black text-lg font-bold hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1Personal;
