import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validationSchema";
import { submitToGoogle } from "./submitToGoogle";
import React from "react";
import { useState } from "react";
import { uploadFilesToDrive } from "./uploadToGoogleDrive";
import { toast } from "../components/ui/use-toast";

const useEnrollmentForm = (setStep) => {
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
   // resolver: yupResolver(schema),
    mode: "onSubmit", // IMPORTANT
    reValidateMode: "onSubmit",
    defaultValues: {
      education: [
        {
          level: "",
          field: "",
          institution: "",
          location: "",
          passingYear: "",
          grade: "",
        },
      ],
      employmentType: "",
      employment: [
        {
          organization: "",
          location: "",
          workMode: "",
          designation: "",
          from: "",
          to: "",
          ctc: "",
          payslip: null,
          experienceCertificate: null,
        },
      ],
      declaration: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const folderId = methods.getValues("submissionFolderId");
      const fullName = data.fullName;

      if (Array.isArray(data.employment)) {
        for (const employment of data.employment) {
          if (employment.payslip) {
            const payslipUpload = await uploadFilesToDrive(
              employment.payslip,
              fullName,
              folderId,
            );

            employment.payslipLinks = payslipUpload?.links || [];
          }

          if (employment.experienceCertificate) {
            const expUpload = await uploadFilesToDrive(
              employment.experienceCertificate,
              fullName,
              folderId,
            );

            employment.experienceLinks = expUpload?.links || [];
          }
        }
      }
      
      // To check data is passed to google sheets
      // console.log("FINAL DATA:", data);

      await submitToGoogle(data);
      // show success notification
      toast({
        title: "Submission successful",
        description: "Your information has been submitted successfully.",
        variant: "success",
        duration: 3000,
      });

      // go to success page
      setStep(6);
    } catch (err) {
      console.error("FINAL ERROR:", err);
      toast({
        title: "Submission failed",
        description: err.message || "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...methods,
    onSubmit,
    showErrors,
    setShowErrors,
    isSubmitting,
  };
};

export default useEnrollmentForm;
