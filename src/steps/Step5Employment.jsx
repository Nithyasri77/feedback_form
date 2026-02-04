import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { useFormUI } from "../context/FormUIContext";
import { CalendarDays } from "lucide-react";
import {Plus} from "lucide-react"


const Step5Employment = ({ onNext, shake, isSubmitting }) => {
  const {
    register,
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const { showErrors } = useFormUI();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employment",
  });

  const { watch } = useFormContext();
  const isDeclared = watch("declaration");

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      {/* PAGE CONTAINER */}
      <div className="max-w-md sm:max-w-lg  px-4 sm:px-6  mx-auto pt-4 pb-8">
        {/* PAGE TITLE */}
        <h1 className="text-2xl font-semibold mb-6 whitespace-nowrap">
          Employment History
        </h1>

        {/* INSTRUCTION TEXT */}
        <p className="text-gray-300 mb-6">Add your previous organizations</p>

        {fields.map((item, index) => (
          <div
            key={item.id}
            className={`relative mb-8 p-4 bg-[#1a1a1a] rounded-md shadow-lg ${shake ? "shake" : ""}`}
          >
            {/* CARD TITLE */}
            <h3 className="text-lg font-semibold mb-4">
              Employment #{index + 1}
            </h3>

            {/* REMOVE BUTTON */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 text-red-400 hover:bg-red-900/20 p-2 rounded-full transition-colors"
              >
                <Trash2 />
              </button>
            )}

            {/* ORGANIZATION */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Organization Name <span className="text-red-400">*</span>
              </label>

              <input
                {...register(`employment.${index}.organization`, {
                  onChange: () =>
                    clearErrors(`employment.${index}.organization`),
                })}
                placeholder="e.g., Acme Corporation"
                className="w-full p-3 sm:p-4  rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
              />

              {showErrors && errors.employment?.[index]?.organization && (
                <p className="mt-1 text-sm text-red-400">
                  * {errors.employment[index].organization.message}
                </p>
              )}
            </div>

            {/* DESIGNATION */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Designation <span className="text-red-400">*</span>
              </label>
              <input
                {...register(`employment.${index}.designation`, {
                  onChange: () =>
                    clearErrors(`employment.${index}.designation`),
                })}
                placeholder="e.g., Software Engineer"
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
              />
              {showErrors && errors.employment?.[index]?.designation && (
                <p className="mt-1 text-sm text-red-400">
                  * {errors.employment[index].designation.message}
                </p>
              )}
            </div>

            {/* SERVICE PERIOD FROM */}
            <div className="relative mb-4">
              <label className="block mb-2 font-medium">
                Service Period From <span className="text-red-400">*</span>
              </label>

              <input
                type="date"
                {...register(`employment.${index}.from`, {
                  onChange: () => clearErrors(`employment.${index}.from`),
                })}
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white focus:outline-none"
              />

              <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
                <CalendarDays />
              </span>

              {showErrors && errors.employment?.[index]?.from && (
                <p className="mt-1 text-sm text-red-400">
                  * {errors.employment[index].from.message}
                </p>
              )}
            </div>

            {/* SERVICE PERIOD TO */}
            <div className="relative mb-4">
              <label className="block mb-2 font-medium">
                Service Period To <span className="text-red-400">*</span>
              </label>

              <input
                type="date"
                {...register(`employment.${index}.to`, {
                  onChange: () => clearErrors(`employment.${index}.to`),
                })}
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white focus:outline-none"
              />
              <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
                <CalendarDays />
              </span>

              {showErrors && errors.employment?.[index]?.to && (
                <p className="mt-1 text-sm text-red-400">
                  * {errors.employment[index].to.message}
                </p>
              )}
            </div>

            {/* MONTHLY CTC */}
            <div className="mb-2">
              <label className="block mb-2 font-medium">
                Monthly CTC <span className="text-red-400">*</span>
              </label>
              <input
                {...register(`employment.${index}.ctc`, {
                  onChange: () => clearErrors(`employment.${index}.ctc`),
                })}
                placeholder="e.g., 50000"
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
              />
              {showErrors && errors.employment?.[index]?.ctc && (
                <p className="mt-1 text-sm text-red-400">
                  * {errors.employment[index].ctc.message}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* ADD EMPLOYMENT */}
        <div className="flex justify-end mb-8">
          <button
            type="button"
            onClick={() =>
              append({
                organization: "",
                designation: "",
                from: "",
                to: "",
                ctc: "",
              })
            }
            className="flex items-center space-x-2 px-4 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm"><Plus /></span>
            <span className="text-md font-semibold">Add Education</span>
          </button>
        </div>

        {/* DECLARATION */}
        <div className="mt-12 mb-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("declaration")}
              className="mt-1 w-5 h-5 rounded border-2 border-gray-300 bg-white focus:ring-2 focus:ring-slate-500"
            />
            <span className="leading-relaxed">
              I hereby declare that the provided information is true and correct
              to the best of my knowledge and belief.
              <span className="text-red-400 ml-1">*</span>
            </span>
          </label>

        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-4 mb-8">
          <button
            type="button"
            onClick={onNext}
            disabled={!isDeclared || isSubmitting}
            className={`w-full py-4 rounded-full  text-lg font-bold flex items-center justify-center gap-2
           ${
             !isDeclared || isSubmitting
               ? "bg-gray-400 text-gray-600 cursor-not-allowed"
               : "bg-white text-black hover:bg-gray-100"
           }
          `}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
            ) : (
              "Submit"
            )}
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5Employment;
