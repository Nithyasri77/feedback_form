import React from 'react'
import { useFormContext } from "react-hook-form";
import { ChevronDown } from 'lucide-react';
import { useFormUI } from "../context/FormUIContext"

const Step3Bank = ({onNext, shake}) => {

  const { register,  formState: { errors }, clearErrors,} = useFormContext();
  const { showErrors } = useFormUI();

  return (
   <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">

      {/* FORM CONTAINER */}
      <div className="max-w-md sm:max-w-lg  px-4 sm:px-6  mx-auto pt-4 pb-8">

        <div className={`bg-[#1a1a1a] rounded-md p-6 shadow-lg ${ shake ? "shake" : "" }`}>

          {/* SECTION TITLE */}
          <h1 className="text-2xl font-semibold mb-8">
            Bank Information for Payroll
          </h1>

          {/* BANK NAME */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Bank Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("bankName", { onChange: () => clearErrors("bankName")})}
              placeholder="e.g., State Bank of India"
              className="w-full p-3 sm:p-4  rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.bankName && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.bankName.message}
              </p>
            )}
          </div>

          {/* ACCOUNT HOLDER NAME */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Account Holder&apos;s Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("accountHolderName", { onChange: () => clearErrors("accountHolderName")})}
              placeholder="e.g., John Doe"
              className="w-full p-3 sm:p-4  rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.accountHolderName && (
                <p className="mt-1 text-sm text-red-400">
                  * {errors.accountHolderName.message}
                </p>
              )}
          </div>

          {/* ACCOUNT NUMBER */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Account Number <span className="text-red-400">*</span>
            </label>
            <input
              {...register("accountNumber", { onChange: () => clearErrors("accountNumber")})}
              placeholder="e.g., 123456789012"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 font-mono tracking-wide focus:outline-none"
            />
            {showErrors && errors.accountNumber && (
                <p className="mt-1 text-sm text-red-400">
                  * {errors.accountNumber.message}
                </p>
              )}
          </div>

          {/* IFSC CODE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              IFSC Code <span className="text-red-400">*</span>
            </label>
            <input
              {...register("ifscCode", { 
                onChange: (e) => {
                e.target.value = e.target.value.toUpperCase(); 
                clearErrors("ifscCode")
                }
              })}
              placeholder="e.g., SBIN0001234"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 font-mono tracking-wide focus:outline-none"
            />
            {showErrors && errors.ifscCode && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.ifscCode.message}
              </p>
            )}
          </div>

          {/* ACCOUNT TYPE */}
          <div className="relative mb-4">
            <label className="block mb-2 font-medium">
              Account Type <span className="text-red-400">*</span>
            </label>
            <select
              {...register("accountType", { onChange: () => clearErrors("accountType")})}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 appearance-none cursor-pointer focus:outline-none"
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
              <option value="Salary">Salary</option>
            </select>

            <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
              <ChevronDown />
            </span>

            {showErrors && errors.accountType && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.accountType.message}
              </p>
            )}
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

  )
}

export default Step3Bank
