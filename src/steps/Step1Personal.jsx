import { useState } from "react";
import { useFormUI } from "../context/FormUIContext";
import {
  ChevronDown,
  Phone,
  Globe,
  Mail,
  MapPin,
  CalendarDays,
  X,
  Upload,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import CompanyLogo from "../../public/images/FINAL.svg";
import CompanyName from "../../public/images/LogotextwithMotto.svg";


const Step1Personal = ({ onNext, shake }) => {
  const {
    register,
    control,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();
  
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const watchedProof = useWatch({ control, name: "proof" });
  const uploadedFiles = selectedFiles; // ← Use component state
  const fullName = watch("fullName");
  
  const removeFile = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove,
    );
    setSelectedFiles(updatedFiles);
    setValue("proof", updatedFiles, { shouldValidate: true });
  };


  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      {/* HEADER BOX */}
      <div
        className="-mx-6 bg-gray-800 py-11 pb-7 px-6 bg-cover bg-no-repeat relative"
        style={{ backgroundImage: "url('/images/bg-2.jpg')" }}
      >
        <div className="max-w-md sm:max-w-lg mx-auto p-5">
          <div className="flex justify-start items-center gap-3 mt-0 mb-10">
            <div>
              <img
                src={CompanyLogo}
                alt="Company Logo"
                className="h-19.75 sm:h-20 md:h-28 w-auto object-contain"
              />
            </div>

            <div>
              <img
                src={CompanyName}
                alt="Company Name"
                className="h-16 sm:h-20 md:h-20 w-auto object-contain"
              />
            </div>
          </div>

          <h1 className="text-[27px] sm:text-3xl md:text-4xl font-bold mb-4">
            Submit Your Employee Information
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed mb-8">
            Please fill out the form below to complete your employee enrollment.
          </p>

          <div className="space-y-4">
            <div className="text-lg sm:text-xl flex items-center gap-2">
              <Phone /> +91 7200353789
            </div>
            <div className="text-lg sm:text-xl flex items-center gap-2">
              <Mail />
              shinecrafttech@gmail.com
            </div>
            <div className="text-lg sm:text-xl flex items-center gap-2">
              <Globe />
              www.shinecrafttechnologies.com
            </div>
            <div className="text-lg sm:text-xl flex items-center gap-2">
              <MapPin />
              Puducherry
            </div>
          </div>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto py-8">
        <div
          className={`bg-[#1a1a1a] shadow-lg rounded-md p-6 ${shake ? "shake" : ""}`}
        >
          <h2 className="text-2xl font-semibold mb-8">Personal Information</h2>

          {/* FULL NAME */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("fullName", {
                onChange: () => clearErrors("fullName"),
              })}
              placeholder="Full Name"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.fullName && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.fullName.message}
              </p>
            )}
          </div>

          {/* FULL ADDRESS */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Full Address <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("address", {
                onChange: () => clearErrors("address"),
              })}
              placeholder="Full Address"
              rows={4}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 resize-y min-h-30 focus:outline-none"
            />
            {showErrors && errors.address && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.address.message}
              </p>
            )}
          </div>

          {/* HOME PHONE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Home Phone <span className="text-red-400">*</span>
            </label>
            <input
              {...register("homePhone", {
                onChange: () => clearErrors("homePhone"),
              })}
              placeholder="Home Phone Number"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.homePhone && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.homePhone.message}
              </p>
            )}
          </div>

          {/* ALTERNATE PHONE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Alternate Phone 
            </label>
            <input
              {...register("alternatePhone", {
                onChange: () => clearErrors("alternatePhone"),
              })}
              placeholder="Alternate Phone Number"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.alternatePhone && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.alternatePhone.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              {...register("email", { onChange: () => clearErrors("email") })}
              placeholder="Email Address"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.email && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.email.message}
              </p>
            )}
          </div>

          {/* PAN */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              PAN Number <span className="text-red-400">*</span>
            </label>
            <input
              {...register("panId", {
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase();
                  clearErrors("panId");
                },
              })}
               placeholder="e.g. ABCDE1234F"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.panId && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.panId.message}
              </p>
            )}
          </div>

          {/* AADHAAR */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Aadhaar Number <span className="text-red-400">*</span>
            </label>
            <input
              {...register("aadharNumber", {
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase();
                  clearErrors("aadharNumber");
                },
              })}
               placeholder="e.g. 8234 5678 9012"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.aadharNumber && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.aadharNumber.message}
              </p>
            )}
          </div>

          {/* DOB */}
          <div className="relative mb-4">
            <label className="block mb-2 font-medium">
              Birth Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              {...register("birthDate", {
                onChange: () => clearErrors("birthDate"),
              })}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white focus:outline-none"
            />
            <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
              <CalendarDays />
            </span>
            {showErrors && errors.birthDate && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.birthDate.message}
              </p>
            )}
          </div>

          {/* MARITAL STATUS */}
          <div className="mb-4 relative">
            <label className="block mb-2 font-medium">
              Marital Status <span className="text-red-400">*</span>
            </label>
            <select
              {...register("maritalStatus", {
                onChange: () => clearErrors("maritalStatus"),
              })}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 appearance-none cursor-pointer focus:outline-none"
            >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Other">Other</option>
            </select>
            <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
              <ChevronDown />
            </span>
            {showErrors && errors.maritalStatus && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.maritalStatus.message}
              </p>
            )}
          </div>

          {/* FILE UPLOAD */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Proof Attached <span className="text-red-400">*</span>
            </label>

            <label
              htmlFor="proofUpload"
              className={`w-full p-3 sm:p-4 border-2 border-dashed rounded-md
                bg-[#0f0f0f] text-gray-300 cursor-pointer
                flex flex-col items-center justify-center gap-2
                transition-colors
                ${isUploading ? "border-blue-500 cursor-wait" : "border-gray-500 hover:border-gray-400"}`}
            >
              {uploadedFiles.length === 0 && (
                <span className="text-center flex gap-2">
                  Click to upload documents <Upload size={23} />
                </span>
              )}

              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full bg-black/40
                    px-3 py-2 rounded-md text-sm"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFile(index);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </label>

            <input
              type="file"
              id="proofUpload"
              multiple
              className="sr-only"
              onChange={(e) => {
                const newFiles = Array.from(e.target.files || []);
                if (newFiles.length === 0) return;

                const mergedFiles = [...selectedFiles, ...newFiles];
                setSelectedFiles(mergedFiles);
                setValue("proof", mergedFiles, { shouldValidate: true });
                clearErrors("proof");

                e.target.value = "";
              }}
            />

            {showErrors && errors.proof && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.proof.message}
              </p>
            )}
          </div>
        </div>

        {/* NEXT BUTTON */}
        <div className="mt-5 mb-8">
          <button
            type="button"
            onClick={onNext}
            className="max-w-lg w-full py-4 rounded-full bg-white text-black text-lg font-bold hover:bg-gray-200 transition-colors  duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1Personal;
