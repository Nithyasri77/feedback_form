import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useFormUI } from "../context/FormUIContext";
import { Heart, Star } from "lucide-react";

const Step7Compilance = ({ onNext, shake }) => {
  const { register, setValue } = useFormContext();
  const { showErrors } = useFormUI();

  const [enjoyRating, setEnjoyRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-6">
          Compliance and Exit
        </h1>

        <div className={`bg-[#1a1a1a] rounded-md p-6 shadow-lg ${shake ? "shake" : ""}`}>

          {/* DOCUMENT HANDOVER */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Did you hand over all the required documents and login credentials?
            </label>

            {["Yes", "No", "Not Yet"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" value={opt} {...register("handover")} />
                {opt}
              </label>
            ))}
          </div>

          {/* KNOWLEDGE SHARE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Do you agree to share the knowledge gained with future team members?
            </label>

            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" value={opt} {...register("knowledgeShare")} />
                {opt}
              </label>
            ))}
          </div>

          {/* CERTIFICATE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Do you need a recommendation letter or certificate?
            </label>

            {["Yes", "No", "Both"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" value={opt} {...register("certificate")} />
                {opt}
              </label>
            ))}
          </div>

          {/* IMPROVEMENT TEXT */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Suggestions / Improvements
            </label>

            <textarea
              {...register("improvements")}
              placeholder="Share your suggestions..."
              rows={3}
              className="w-full p-3 rounded-md bg-[#0f0f0f] text-white"
            />
          </div>

          {/* HEART RATING */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Tell us how much you enjoyed being part of our team!
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((heart) => (
                <Heart
                  key={heart}
                  onClick={() => {
                    setEnjoyRating(heart);
                    setValue("enjoyment", heart);
                  }}
                  className={`cursor-pointer ${
                    heart <= enjoyRating ? "text-red-500" : "text-gray-500"
                  }`}
                  fill={heart <= enjoyRating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          {/* OVERALL RATING */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Overall internship experience
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => {
                    setOverallRating(star);
                    setValue("overallExperience", star);
                  }}
                  className={`cursor-pointer ${
                    star <= overallRating ? "text-yellow-400" : "text-gray-500"
                  }`}
                  fill={star <= overallRating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          {/* LIKE MOST */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              What did you like most?
            </label>

            <textarea
              {...register("likedMost")}
              placeholder="Write here..."
              rows={3}
              className="w-full p-3 rounded-md bg-[#0f0f0f] text-white"
            />
          </div>

          {/* IMPROVE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              What can we improve?
            </label>

            <textarea
              {...register("improveMore")}
              placeholder="Write here..."
              rows={3}
              className="w-full p-3 rounded-md bg-[#0f0f0f] text-white"
            />
          </div>

        </div>

        {/* NEXT BUTTON */}
        <div className="mt-7 mb-8">
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

export default Step7Compilance;