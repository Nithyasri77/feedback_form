import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useFormUI } from "../context/FormUIContext";
import { Star } from "lucide-react";

const Step4Communication = ({ onNext, shake }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();

  const [teamRating, setTeamRating] = useState(0);
  const [learningRating, setLearningRating] = useState(0);

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">

      {/* PAGE CONTAINER */}
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">

        {/* PAGE TITLE */}
        <h1 className="text-2xl font-semibold mb-8">
          Communication and Teamworks
        </h1>

        <div className={`bg-[#1a1a1a] rounded-md p-6 shadow-lg ${shake ? "shake" : ""}`}>

          {/* IDEA COMMUNICATION */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Were you encouraged to communicate your ideas and challenges?
            </label>

            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" value={opt} {...register("ideaCommunication")} />
                {opt}
              </label>
            ))}
          </div>

          {/* TEAM FEEL */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Did you feel like part of the team?
            </label>

            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" value={opt} {...register("teamFeeling")} />
                {opt}
              </label>
            ))}
          </div>

          {/* TEAM COORDINATION */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              How was the coordination with the team or other interns?
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => {
                    setTeamRating(star);
                    setValue("teamCoordination", star);
                  }}
                  className={`cursor-pointer ${
                    star <= teamRating ? "text-yellow-400" : "text-gray-500"
                  }`}
                  fill={star <= teamRating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          {/* LEARNING EXPERIENCE */}
          <h2 className="text-xl font-semibold mt-6 mb-4">
            Learning Experience
          </h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Did you gain practical (real-world) knowledge?
            </label>

            {["Yes", "No"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" value={opt} {...register("practicalKnowledge")} />
                {opt}
              </label>
            ))}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Rate your learning experience
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => {
                    setLearningRating(star);
                    setValue("learningRating", star);
                  }}
                  className={`cursor-pointer ${
                    star <= learningRating ? "text-yellow-400" : "text-gray-500"
                  }`}
                  fill={star <= learningRating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <h2 className="text-xl font-semibold mt-6 mb-4">
            Skills Development
          </h2>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              What skills did you improve?
            </label>

            {["Technical", "Communication", "Teamwork"].map((skill) => (
              <label key={skill} className="flex items-center gap-2">
                <input type="checkbox" value={skill} {...register("skills")} />
                {skill}
              </label>
            ))}
          </div>

          {/* CAREER ALIGNMENT */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Did this internship align with your career goals?
            </label>

            {["Yes", "No", "Partially"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input type="radio" value={opt} {...register("careerAlignment")} />
                {opt}
              </label>
            ))}
          </div>

        </div>

        {/* NEXT BUTTON */}
        <div className="mt-4 mb-8">
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

export default Step4Communication;