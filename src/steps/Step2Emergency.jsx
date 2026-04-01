import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useFormUI } from "../context/FormUIContext";
import { Star } from "lucide-react";

const Step2Emergency = ({ onNext, shake }) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
  } = useFormContext();

  const { showErrors } = useFormUI();
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      {/* FORM CONTAINER */}
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">
        <div
          className={`bg-[#1a1a1a] rounded-md p-6 shadow-lg ${
            shake ? "shake" : ""
          }`}
        >
          {/* SECTION TITLE */}
          <h1 className="text-2xl font-semibold mb-8">
            Internship Activities and Learning
          </h1>

          {/* PROJECT DESCRIPTION */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              Briefly describe the projects you worked on
              <span className="text-red-400">*</span>
            </label>

            <textarea
              {...register("projects", {
                onChange: () => clearErrors("projects"),
              })}
              placeholder="Your Answer"
              rows={4}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />

            {showErrors && errors.projects && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.projects.message}
              </p>
            )}
          </div>

          {/* ROLES */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              Your roles and responsibilities
              <span className="text-red-400">*</span>
            </label>

            <textarea
              {...register("roles", {
                onChange: () => clearErrors("roles"),
              })}
              placeholder="Your Answer"
              rows={4}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />
          </div>

          {/* TECHNOLOGIES */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              Tools / Technologies you used or learned
              <span className="text-red-400">*</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {[
                "AI",
                "ML and DL",
                "Chatbot",
                "Flutter",
                "React",
                "Three.js",
                "Node/Express",
                "Blender 3D Design",
                "Arduino/ESP",
                "Angular",
                "SolidWorks",
                "Firebase",
                "Python applications",
                "UI, Posters, Video and Logo designing",
              ].map((tech) => (
                <label key={tech} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={tech}
                    {...register("technologies")}
                  />
                  {tech}
                </label>
              ))}
            </div>

            {/* OTHER */}
            <input
              {...register("otherTech")}
              placeholder="Other"
              className="mt-3 w-full p-3 rounded-md bg-[#0f0f0f] text-white"
            />
          </div>

          {/* SUPPORT */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              Were you given enough learning resources and support?
              <span className="text-red-400">*</span>
            </label>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Yes"
                  {...register("support")}
                />
                Yes
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="No"
                  {...register("support")}
                />
                No
              </label>
            </div>
          </div>

          {/* STAR RATING */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">
              Rate the technical knowledge gained
              <span className="text-red-400">*</span>
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => {
                    setRating(star);
                    setValue("rating", star);
                  }}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-500"
                  }`}
                  fill={star <= rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* NEXT BUTTON */}
        <div className="mt-5 mb-8">
          <button
            type="button"
            onClick={onNext}
            className="w-full py-4 rounded-full bg-white text-black text-lg font-bold hover:bg-gray-200 transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2Emergency;