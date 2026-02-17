import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {Trash2} from "lucide-react"
import { useFormUI } from "../context/FormUIContext"
import {ChevronDown} from "lucide-react"
import {Plus} from "lucide-react"

const Step4Education = ({onNext, shake}) => {
  const {
    register,
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const { showErrors } = useFormUI();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i,
  );

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">

      {/* PAGE CONTAINER */}
      <div className="max-w-md sm:max-w-lg  px-4 sm:px-6  mx-auto pt-4 pb-8">

        {/* PAGE TITLE */}
        <h1 className="text-2xl font-semibold mb-8">
          Education Details
        </h1>

        {fields.map((item, index) => (
          <div
            key={item.id}
             className={`relative mb-8 p-4 bg-[#1a1a1a] rounded-md shadow-lg ${ shake ? "shake" : "" }`}
          >
            {/* CARD TITLE */}
            <h3 className="text-lg font-semibold mb-4">
              Education #{index + 1}
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

            {/* EDUCATION LEVEL */}
            <div className="relative mb-4">
              <label className="block mb-2 font-medium">
                Education Level <span className="text-red-400">*</span>
              </label>
              <select
                {...register(`education.${index}.level`, { onChange: () => clearErrors(`education.${index}.level`) } )}
                className="w-full p-3 sm:p-4  rounded-md bg-[#0f0f0f] text-gray-200 appearance-none cursor-pointer focus:outline-none"
              >
                <option value="">Select Level</option>
                <option value="Diploma">Diploma</option>
                <option value="B.E/B.Tech">B.E / B.Tech</option>
                <option value="M.E/M.Tech">M.E / M.Tech</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Others">Others</option>
              </select>

              <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
                 <ChevronDown />
              </span>

              {showErrors && errors.education?.[index]?.level && (
                  <p className="mt-1 text-sm text-red-400">
                    * {errors.education[index].level.message}
                  </p>
                )}
            </div>

            {/* FIELD OF STUDY */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Field of Study <span className="text-red-400">*</span>
              </label>
              <input
                {...register(`education.${index}.field`, { onChange: () => clearErrors(`education.${index}.field`) })}
                placeholder="e.g., Computer Science"
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
              />
              {showErrors && errors.education?.[index]?.field && (
                  <p className="mt-1 text-sm text-red-400">
                    * {errors.education[index].field.message}
                  </p>
                )}
            </div>

            {/* INSTITUTION */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Institution Name <span className="text-red-400">*</span>
              </label>
              <input
                {...register(`education.${index}.institution`, { onChange: () => clearErrors(`education.${index}.institution`) })}
                placeholder="e.g. IIT"
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
              />
              {showErrors && errors.education?.[index]?.institution && (
                  <p className="mt-1 text-sm text-red-400">
                    * {errors.education[index].institution.message}
                  </p>
                )}
            </div>

            {/* LOCATION */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Location 
              </label>
              <input
                {...register(`education.${index}.location`, { onChange: () => clearErrors(`education.${index}.location`) })}
                placeholder="e.g., Puducherry"
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
              />

            </div>

            {/* PASSING YEAR */}
            <div className="relative mb-4">
              <label className="block mb-2 font-medium">
                Passing Year <span className="text-red-400">*</span>
              </label>
              <select
                {...register(`education.${index}.passingYear`, { onChange: () => clearErrors(`education.${index}.passingYear`) })}
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 appearance-none cursor-pointer focus:outline-none"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
                <ChevronDown />
              </span>

              {showErrors && errors.education?.[index]?.passingYear && (
                  <p className="mt-1 text-sm text-red-400">
                    * {errors.education[index].passingYear.message}
                  </p>
                )}
            </div>

            {/* GRADE */}
            <div className="mb-2">

              <label className="block mb-2 font-medium">
                Grade / Percentage <span className="text-red-400">*</span>
              </label>

              <input
                {...register(`education.${index}.grade`, { onChange: () => clearErrors(`education.${index}.grade`) })}
                placeholder="e.g., A+ or 9.5 CGPA"
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
              />

              {showErrors && errors.education?.[index]?.grade && (
                  <p className="mt-1 text-sm text-red-400">
                    * {errors.education[index].grade.message}
                  </p>
                )}
            </div>
          </div>
        ))}

        {/* ADD EDUCATION */}
        <div className="flex justify-end mb-8">
          <button
            type="button"
            onClick={() =>
              append({
                level: "",
                field: "",
                institution: "",
                location: "",
                passingYear: "",
                grade: "",
              })
            }
            className="flex items-center space-x-1.5 px-4 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm"><Plus /></span>
            <span className="text-md font-semibold">Add Education</span>
          </button>
        </div>

        {/* NEXT BUTTON */}
        <div className="mt-4 mb-8">
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

export default Step4Education;
