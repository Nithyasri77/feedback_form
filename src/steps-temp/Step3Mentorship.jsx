import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useFormUI } from "../context/FormUIContext";
import { Star } from "lucide-react";

const Step3Mentorship = ({ onNext, shake }) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
  } = useFormContext();

  const { showErrors } = useFormUI();

  const [mentorRating, setMentorRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [supportRating, setSupportRating] = useState(0);

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
            Mentorship and Guidance
          </h1>

          {/* MENTOR ACCESS */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Was your mentor accessible and helpful?
            </label>

            {["Always", "Usually", "Occasionally", "Rarely"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opt}
                  {...register("mentorAccessibility")}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* FEEDBACK */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Did you receive constructive feedback on your work?
            </label>

            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" value={opt} {...register("feedback")} />
                {opt}
              </label>
            ))}
          </div>

          {/* MENTOR RATING */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Rate your mentor's guidance throughout the internship
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => {
                    setMentorRating(star);
                    setValue("mentorRating", star);
                  }}
                  className={`cursor-pointer ${
                    star <= mentorRating ? "text-yellow-400" : "text-gray-500"
                  }`}
                  fill={star <= mentorRating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          {/* COMMUNICATION */}
          <h2 className="text-xl font-semibold mt-6 mb-4">
            Communication
          </h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              How would you rate communication from our team?
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => {
                    setCommunicationRating(star);
                    setValue("communicationRating", star);
                  }}
                  className={`cursor-pointer ${
                    star <= communicationRating
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                  fill={star <= communicationRating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Were responses timely?
            </label>

            {["Yes", "No", "Sometimes"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opt}
                  {...register("responseTime")}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* SUPPORT */}
          <h2 className="text-xl font-semibold mt-6 mb-4">
            Mentor / Supervisor Support
          </h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              How supportive was your mentor?
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => {
                    setSupportRating(star);
                    setValue("supportRating", star);
                  }}
                  className={`cursor-pointer ${
                    star <= supportRating ? "text-yellow-400" : "text-gray-500"
                  }`}
                  fill={star <= supportRating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Did your mentor provide regular feedback?
            </label>

            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opt}
                  {...register("regularFeedback")}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Were your doubts resolved properly?
            </label>

            {["Yes", "No", "Sometimes"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={opt}
                  {...register("doubtResolution")}
                />
                {opt}
              </label>
            ))}
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

export default Step3Mentorship;