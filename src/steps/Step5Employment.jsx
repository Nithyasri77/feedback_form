import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { useFormUI } from "../context/FormUIContext";
import { CalendarDays } from "lucide-react";
import { Plus } from "lucide-react";
import { ChevronDown, Upload, X } from "lucide-react";
import { isFileTooLarge, MAX_FILE_MB } from "@/utils/fileValidation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Step5Employment = ({ onNext, shake, isSubmitting }) => {
  const [employmentType, setEmploymentType] = useState(null);

  const {
    register,
    control,
    formState: { errors },
    clearErrors,
    setValue,
  } = useFormContext();

  const { showErrors, setError } = useFormUI();

  const [openTerms, setOpenTerms] = useState(false);

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
        <h1 className="text-2xl font-semibold mb-6">Employment Details</h1>

        {/* EMPLOYMENT TYPE SELECTION CARD */}
        <div className="mb-8 p-4 bg-[#1a1a1a] rounded-md shadow-lg">
          <p className="mb-4 font-medium text-gray-200">
            Are you a fresher or experienced?
          </p>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-lg bg-[#0f0f0f] cursor-pointer">
              <input
                type="radio"
                name="employmentType"
                value="fresher"
                checked={employmentType === "fresher"}
                onChange={() => {
                  setEmploymentType("fresher");
                  setValue("employmentType", "fresher", {
                    shouldValidate: false,
                  });
                }}
                className="w-5 h-5 accent-white"
              />
              <span className="font-medium text-gray-200">Fresher</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg bg-[#0f0f0f] cursor-pointer">
              <input
                type="radio"
                name="employmentType"
                value="experienced"
                checked={employmentType === "experienced"}
                onChange={() => {
                  setEmploymentType("experienced");
                  setValue("employmentType", "experienced", {
                    shouldValidate: false,
                  });
                }}
                className="w-5 h-5 accent-white"
              />
              <span className="font-medium text-gray-200">Experienced</span>
            </label>
          </div>
        </div>

        {/* EXPERIENCED CONTENT FORM CONTAINER*/}

        {employmentType === "experienced" && (
          <div>
            {/* PAGE TITLE */}
            <h2 className="text-2xl font-semibold mb-6 whitespace-nowrap">
              Employment History
            </h2>

            {/* INSTRUCTION TEXT */}
            <p className="text-gray-300 mb-6">
              Add your previous organizations
            </p>

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

                {/* ORGANIZATION NAME*/}
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

                {/* ORGANIZATION LOCATION */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Organization Location{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register(`employment.${index}.location`, {
                      onChange: () =>
                        clearErrors(`employment.${index}.location`),
                    })}
                    placeholder="e.g. Chennai, Tamil Nadu"
                    className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white focus:outline-none"
                  />
                  {showErrors && errors.employment?.[index]?.location && (
                    <p className="mt-1 text-sm text-red-400">
                      * {errors.employment[index].location.message}
                    </p>
                  )}
                  
                </div>

                {/* WORK MODE */}
                <div className="mb-4 relative">
                  <label className="block mb-2 font-medium">
                    Work Mode <span className="text-red-400">*</span>
                  </label>

                  <select
                    {...register(`employment.${index}.workMode`, {
                      onChange: () =>
                        clearErrors(`employment.${index}.workMode`),
                    })}
                    className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 appearance-none cursor-pointer focus:outline-none"
                  >
                    <option value="">Select Work Mode</option>
                    <option value="On-site">On-Site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>

                  <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
                    <ChevronDown />
                  </span>

                  {showErrors && errors.employment?.[index]?.workMode && (
                    <p className="mt-1 text-sm text-red-400">
                      * {errors.employment[index].workMode.message}
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
                <div className=" mb-4">
                  <label className="block mb-2 font-medium">
                    Service Period From <span className="text-red-400">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="date"
                      {...register(`employment.${index}.from`, {
                        onChange: () => clearErrors(`employment.${index}.from`),
                      })}
                      className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white focus:outline-none"
                    />

                    {/* <span className="absolute right-4 top-12 text-gray-400 pointer-events-none"> */}
                    <span className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
                      <CalendarDays />
                    </span>
                  </div>

                  {showErrors && errors.employment?.[index]?.from && (
                    <p className="mt-1 text-sm text-red-400">
                      * {errors.employment[index].from.message}
                    </p>
                  )}
                </div>

                {/* SERVICE PERIOD TO */}
                <div className=" mb-4">
                  <label className="block mb-2 font-medium">
                    Service Period To <span className="text-red-400">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="date"
                      {...register(`employment.${index}.to`, {
                        onChange: () => clearErrors(`employment.${index}.to`),
                      })}
                      className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white focus:outline-none"
                    />
                    {/* <span className="absolute right-4 top-12 text-gray-400 pointer-events-none"> */}
                    <span className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
                      <CalendarDays />
                    </span>
                  </div>

                  {showErrors && errors.employment?.[index]?.to && (
                    <p className="mt-1 text-sm text-red-400">
                      * {errors.employment[index].to.message}
                    </p>
                  )}
                </div>

                {/* MONTHLY SALARY */}
                <div className="mb-2">
                  <label className="block mb-2 font-medium">
                    Last Company CTC <span className="text-red-400">*</span>
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

                {/* PAYSLIP UPLOAD */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Payslip Upload <span className="text-red-400">*</span>
                  </label>

                  <label
                    htmlFor={`payslipUpload-${index}`}
                    className="w-full p-3 sm:p-4 border-2 border-dashed rounded-md
      bg-[#0f0f0f] text-gray-300 cursor-pointer
      flex flex-col items-center justify-center gap-2
      transition-colors border-gray-500 hover:border-gray-400"
                  >
                    {!watch(`employment.${index}.payslip`)?.[0] && (
                      <span className="text-center flex gap-2">
                        Click to upload payslip <Upload size={22} />
                      </span>
                    )}

                    {watch(`employment.${index}.payslip`)?.[0] && (
                      <div className="flex items-center justify-between w-full bg-black/40 px-3 py-2 rounded-md text-sm">
                        <span className="truncate">
                          {watch(`employment.${index}.payslip`)[0].name}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setValue(`employment.${index}.payslip`, null, {
                              shouldValidate: true,
                            });
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </label>

                  <input
                    type="file"
                    id={`payslipUpload-${index}`}
                    accept=".pdf,image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (isFileTooLarge(file)) {
                        setError(`employment.${index}.payslip`, { type: "manual", message: `File must be under ${MAX_FILE_MB} MB` });
                         e.target.value = "";
                         return;
                       }

                      setValue(`employment.${index}.payslip`, [file], {
                        shouldValidate: true,
                      });

                      clearErrors(`employment.${index}.payslip`);
                      e.target.value = "";
                    }}
                  />

                  {showErrors && errors.employment?.[index]?.payslip && (
                    <p className="mt-1 text-sm text-red-400">
                      * {errors.employment[index].payslip.message}
                    </p>
                  )}
                </div>

                {/* EXPERIENCE CERTIFICATE */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Experience Certificate{" "}
                    <span className="text-red-400">*</span>
                  </label>

                  <label
                    htmlFor={`experienceUpload-${index}`}
                    className="w-full p-3 sm:p-4 border-2 border-dashed rounded-md
      bg-[#0f0f0f] text-gray-300 cursor-pointer
      flex flex-col items-center justify-center gap-2
      transition-colors border-gray-500 hover:border-gray-400"
                  >
                    {!watch(
                      `employment.${index}.experienceCertificate`,
                    )?.[0] && (
                      <span className="text-center flex gap-2">
                        Click to upload certificate <Upload size={22} />
                      </span>
                    )}

                    {watch(
                      `employment.${index}.experienceCertificate`,
                    )?.[0] && (
                      <div className="flex items-center justify-between w-full bg-black/40 px-3 py-2 rounded-md text-sm">
                        <span className="truncate">
                          {
                            watch(
                              `employment.${index}.experienceCertificate`,
                            )[0].name
                          }
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setValue(
                              `employment.${index}.experienceCertificate`,
                              null,
                              {
                                shouldValidate: true,
                              },
                            );
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </label>

                  <input
                    type="file"
                    id={`experienceUpload-${index}`}
                    accept=".pdf,image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (isFileTooLarge(file)) {
                       setError(`employment.${index}.experienceCertificate`, { type: "manual", message: `File must be under ${MAX_FILE_MB} MB` });
                        e.target.value = "";
                        return;
                      }

                      setValue(
                        `employment.${index}.experienceCertificate`,
                        [file],
                        {
                          shouldValidate: true,
                        },
                      );

                      clearErrors(`employment.${index}.experienceCertificate`);
                      e.target.value = "";
                    }}
                  />

                  {showErrors &&
                    errors.employment?.[index]?.experienceCertificate && (
                      <p className="mt-1 text-sm text-red-400">
                        *{" "}
                        {errors.employment[index].experienceCertificate.message}
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
                <span className="text-sm">
                  <Plus />
                </span>
                <span className="text-md font-semibold">Add Education</span>
              </button>
            </div>
          </div>
        )}

        {/* DECLARATION */}
        <div className="mt-12 mb-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("declaration")}
              className="mt-1 w-5 h-5 rounded border-2 border-gray-300 bg-white focus:ring-2 focus:ring-slate-500"
            />
            <span className="leading-relaxed">
               I agree the <button  type="button" onClick={() => setOpenTerms(true)} className="text-purple-400 underline hover:text-purple-300">terms and conditions</button> of Shine Craft Technologies. I hereby confirm that the information provided by me is true and correct to the best of my knowledge. I agree to abide by the policies, rules, and regulations.
              <span className="text-red-400 ml-1">*</span>
            </span>
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-7 mb-8">
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
      <Dialog open={openTerms} onOpenChange={setOpenTerms}>
  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto flex flex-col">
    <DialogHeader>
      <DialogTitle>Appointment Terms & Conditions</DialogTitle>
    </DialogHeader>

    {/* SCROLL AREA */}
    <div className="overflow-y-auto pr-2 text-sm leading-relaxed space-y-5 flex-1">
      
      <section>
        <h3 className="font-semibold text-base mb-1">
          Appointment Overview
        </h3>
        <p>
          You have been selected for employment with Shine Craft Technologies.
          Your appointment is subject to successful completion of the company’s
          onboarding and verification processes.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-base mb-1">
          Duties & Responsibilities
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Perform duties assigned by management.</li>
          <li>Maintain professionalism and confidentiality.</li>
          <li>Comply with company policies and guidelines.</li>
          <li>Protect company data and assets.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base mb-1">
          Working Conditions
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Working hours are as per company policy.</li>
          <li>Leave is governed by company leave rules.</li>
          <li>Notice period applies as per appointment terms.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base mb-1">
          Confidentiality & Conduct
        </h3>
        <p>
          Employees must maintain strict confidentiality of company and client
          information and follow ethical workplace practices at all times.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-base mb-1">
          Employee Declaration
        </h3>
        <p>
          I hereby confirm that the information provided by me is true and
          correct to the best of my knowledge and I agree to abide by the
          company policies.
        </p>
      </section>

    </div>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default Step5Employment;
