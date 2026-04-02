import React from "react";
import { useFormContext } from "react-hook-form";
import { useFormUI } from "../context/FormUIContext";
import { Upload, X } from "lucide-react";

const Step8Document = ({ onNext, shake }) => {
  const { setValue, watch } = useFormContext();
  const { showErrors } = useFormUI();

  const files = watch("finalDocuments") || [];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 10) {
      alert("You can upload up to 10 files only.");
      return;
    }

    setValue("finalDocuments", [...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setValue("finalDocuments", updated);
  };

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-6">
          Upload Internship Documents
        </h1>

        <div className={`bg-[#1a1a1a] rounded-md p-6 shadow-lg ${shake ? "shake" : ""}`}>

          {/* DESCRIPTION */}
          <p className="text-gray-300 mb-4 text-sm leading-relaxed">
            Kindly upload any final presentation, reports, flow diagrams,
            handing over documents, or related files for our records.
          </p>

          {/* UPLOAD BOX */}
          <label className="w-full p-6 border-2 border-dashed rounded-md bg-[#0f0f0f] text-gray-300 cursor-pointer flex flex-col items-center justify-center gap-2 hover:border-gray-400 transition">
            
            <Upload size={28} />
            <span>Add Files</span>
            <span className="text-xs text-gray-400">
              Max 10 files • 100MB each
            </span>

            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* FILE LIST */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-md text-sm"
                >
                  <span className="truncate">{file.name}</span>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* NEXT BUTTON */}
        <div className="mt-7 mb-8">
          <button
            type="button"
            onClick={onNext}
            className="w-full py-4 rounded-full bg-white text-black text-lg font-bold hover:bg-gray-200 transition-colors duration-200"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default Step8Document;