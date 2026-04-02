import React from "react";

const steps = [1, 2, 3, 4, 5,6,7,8];

const ProgressBar = ({ currentStep, setStep }) => {
  return (
    <div className="flex items-center justify-center gap-0.5 sm:gap-1 px-4 py-7 pb-7 bg-[#000001]">
      {steps.map((step, index) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
       const canNavigate = step <= currentStep;
       const isClickable = step === currentStep || step < currentStep;

        return (
          <React.Fragment key={step}>
            {/* STEP CIRCLE */}
            <div
              onClick={() => {
                 if (isClickable) setStep(step);
              }}

              className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-colors
              ${
                isCompleted
                  ? "bg-[#2F3A5F] shadow-[0_0_10px_rgba(47,58,95,0.75),0_0_22px_rgba(47,58,95,0.9)] transition-shadow duration-300 text-white cursor-pointer"
                  : isActive
                    ? "bg-[#4f63a1] border border-[#5B6DA8] shadow-[0_0_8px_rgba(70,87,138,0.7),0_0_18px_rgba(70,87,138,0.85)] text-white cursor-pointer"
                    : "bg-gray-200 text-gray-500"
              }
             `}
            >
              {step}
            </div>

            {/* CONNECTING LINE */}
            {index < steps.length - 1 && (
              <div
                className={`w-6 sm:w-10 md:w-12 h-0.5 mx-1 transition-colors
                  ${
                    step < currentStep
                      ? "bg-linear-to-r from-[#5d76ca] to-[#34416d]"
                      : "bg-gray-700"
                  }
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
