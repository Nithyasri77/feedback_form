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
    resolver: yupResolver(schema),
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
      employment: [
        {
          organization: "",
          designation: "",
          from: "",
          to: "",
          ctc: "",
        },
      ],
      declaration: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      await submitToGoogle(data);

      setStep(6); // success page
    } catch (err) {
      // console.error(err);
      toast({
        title: "Submission failed",
        description:
         "Something went wrong while submitting your information.",
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
