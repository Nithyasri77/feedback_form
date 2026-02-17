import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { uploadFilesToDrive } from "./../../form/uploadToGoogleDrive";

const BackgroundFileUploader = ({ currentStep }) => {
  const { watch, setValue, getValues } = useFormContext();
  const uploadedRef = useRef(false);

  useEffect(() => {
    if (currentStep > 1 && !uploadedRef.current) {
      const proof = getValues("proof");
      const fullName = watch("fullName");

      if (proof && proof.length > 0) {
        uploadedRef.current = true;

        // console.log("Background upload starting...");
        // console.log("Files to upload:", proof);

        uploadFilesToDrive(proof, fullName || "Unknown")
          .then((result) => {
            setValue("proofFiles", result.links);
            setValue("submissionFolderId", result.folderId);
          })
          .catch((error) => {
            console.error("Background upload failed:", error);
            uploadedRef.current = false;
          });
      }
    }
  }, [currentStep, watch, setValue, getValues]);

  return null;
};

export default BackgroundFileUploader;
