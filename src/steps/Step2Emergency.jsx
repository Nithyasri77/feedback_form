import React from "react";
import { useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { useFormUI } from "../context/FormUIContext";

const Step2Emergency = ({ onNext, shake }) => {
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const { showErrors } = useFormUI();

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      {/* FORM CONTAINER */}
      <div className="max-w-md sm:max-w-lg  px-4 sm:px-6  mx-auto pt-4 pb-8">
        <div
          className={`bg-[#1a1a1a] rounded-md p-6 shadow-lg ${shake ? "shake" : ""}`}
        >
          {/* SECTION TITLE */}
          <h1 className="text-2xl font-semibold mb-8">
            Emergency Contact Information
          </h1>

          {/*  FULLNAME WITH INITIAL */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              FullName with Initial<span className="text-red-400">*</span>
            </label>

            <input
              {...register("emergencyFullNameWithInitial", {
                onChange: () => clearErrors("emergencyFullNameWithInitial"),
              })}
              placeholder="e.g. John.D"
              className="w-full p-3 sm:p-4  rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.emergencyFullNameWithInitial && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.emergencyFullNameWithInitial.message}
              </p>
            )}
          </div>

          {/* STREET ADDRESS */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              Street Address <span className="text-red-400">*</span>
            </label>

            <input
              {...register("emergencyStreet", {
                onChange: () => clearErrors("emergencyStreet"),
              })}
              placeholder="e.g. 2nd Cross Street, Gandhi Nagar"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.emergencyStreet && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.emergencyStreet.message}
              </p>
            )}
          </div>

          {/* CITY */}
          <div className="relative mb-4">
            <label className="block mb-2 font-medium">City</label>

            <input
              type="text"
              placeholder="e.g. Chennai"
              {...register("emergencyCity")}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* STATE */}
          <div className="relative mb-4">
            <label className="block mb-2 font-medium">
              State <span className="text-red-400">*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. TamilNadu"
              {...register("emergencyState", {
                onChange: () => clearErrors("emergencyState"),
              })}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 placeholder-gray-400 focus:outline-none"
            />

            {showErrors && errors.emergencyState && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.emergencyState.message}
              </p>
            )}
          </div>

          {/* ZIP */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              ZIP Code <span className="text-red-400">*</span>
            </label>

            <input
              {...register("emergencyZip", {
                onChange: () => clearErrors("emergencyZip"),
              })}
              placeholder="e.g. 600028"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.emergencyZip && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.emergencyZip.message}
              </p>
            )}
          </div>

          {/* PRIMARY PHONE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              Primary Phone <span className="text-red-400">*</span>
            </label>

            <input
              {...register("emergencyPrimaryPhone", {
                onChange: () => clearErrors("emergencyPrimaryPhone"),
              })}
              placeholder="e.g. 9123456789"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.emergencyPrimaryPhone && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.emergencyPrimaryPhone.message}
              </p>
            )}
          </div>

          {/* ALTERNATE PHONE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              Alternate Phone
            </label>

            <input
              {...register("emergencyAlternatePhone", {
                onChange: () => clearErrors("emergencyAlternatePhone"),
              })}
              placeholder="e.g. 8765432109"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* RELATIONSHIP */}
          <div className="relative mb-4">
            <label className="block mb-2 font-medium text-white">
              Relationship
            </label>

            <select
              {...register("emergencyRelationship", {
                onChange: () => clearErrors("emergencyRelationship"), 
              })}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 appearance-none cursor-pointer focus:outline-none"
            >
              <option value="">Select Relationship</option>
              <option value="Parent">Parent</option>
              <option value="Spouse">Spouse</option>
              <option value="Sibling">Sibling</option>
              <option value="Friend">Friend</option>
              <option value="Relative">Relative</option>
              <option value="Other">Other</option>
            </select>

            <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
              <ChevronDown />
            </span>
          </div>
        </div>

        {/* NEXT BUTTON */}
        <div className="mt-5 mb-8">
          <button
            type="button"
            onClick={onNext}
            className="w-full py-4 rounded-full bg-white text-black text-lg font-bold hover:bg-gray-200 transition-colors  duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2Emergency;
