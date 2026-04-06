import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Star } from "lucide-react";
import { useFormUI } from "../context/FormUIContext";

const Step6Feedback = ({ onNext, shake }) => {
  const {
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const { showErrors } = useFormUI();

  const [environmentRating, setEnvironmentRating] = useState(0);

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-8">
          Final Reflection and Feedback
        </h1>

        <div className={`bg-[#1a1a1a] rounded-md p-6 shadow-lg ${shake ? "shake" : ""}`}>

          {/* TAKEAWAY */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Biggest takeaway from this internship
            </label>
            <textarea
              {...register("takeaway", {
                onChange: () => clearErrors("takeaway"),
              })}
              placeholder="Write your answer..."
              rows={3}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.takeaway && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.takeaway.message}
              </p>
            )}
          </div>

          {/* CHALLENGES */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              What challenges did you face and how did you overcome them?
            </label>
            <textarea
              {...register("challengesOvercome", {
                onChange: () => clearErrors("challengesOvercome"),
              })}
              placeholder="Write your answer..."
              rows={3}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* IMPROVEMENTS */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              What would you improve in this internship program?
            </label>
            <textarea
              {...register("improvements", {
                onChange: () => clearErrors("improvements"),
              })}
              placeholder="Write your answer..."
              rows={3}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* JOIN */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Would you like to join us for future collaborations or jobs?
            </label>
            {["Yes", "No", "Maybe"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opt}
                  {...register("joinFuture")}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* RECOMMEND */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Would you recommend Shine Craft Technologies to others?
            </label>
            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opt}
                  {...register("recommend")}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* SOURCE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              How did you hear about Shine Craft Technologies?
            </label>

            {[
  
              "Instagram",
              "LinkedIn",
              "College/Institution Reference",
              "Faculty Recommendation",
              "Word of Mouth / Friend",
              "Online Search",
              "Email",
            ].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={opt}
                  {...register("source")}
                />
                {opt}
              </label>
            ))}

            <input
              {...register("otherSource")}
              placeholder="Other..."
              className="w-full mt-2 p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
           <div className="mb-4">
            <label className="block mb-2 font-medium" >
              Did you post anything about this internship?
            </label>
               {[
  
              "Instagram",
              "LinkedIn",
              "Indeed",
            ].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={opt}
                  {...register("source")}
                />
                {opt}
              </label>
            ))}

            <input
              {...register("otherSource")}
              placeholder="Other..."
              className="w-full mt-2 p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          
          {/* WORK CULTURE */}
          <h2 className="text-xl font-semibold mt-6 mb-4">
            Work Culture
          </h2>

          {/* ENVIRONMENT */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              How was the work environment?
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => {
                    setEnvironmentRating(star);
                    setValue("environment", star);
                  }}
                  className={`cursor-pointer ${
                    star <= environmentRating
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                  fill={star <= environmentRating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          {/* COMFORTABLE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Did you feel comfortable asking questions?
            </label>

            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opt}
                  {...register("comfortable")}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* TEAMWORK */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              How was teamwork and collaboration?
            </label>

            <textarea
              {...register("teamwork")}
              placeholder="Write your answer..."
              rows={3}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
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

export default Step6Feedback;