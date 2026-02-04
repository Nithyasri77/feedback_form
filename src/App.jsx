import { useState, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import useEnrollmentForm from "./form/useEnrollmentForm";

import Step1Personal from "./steps/Step1Personal";
import Step2Emergency from "./steps/Step2Emergency";
import Step3Bank from "./steps/Step3Bank";
import Step4Education from "./steps/Step4Education";
import Step5Employment from "./steps/Step5Employment";
import SuccessCompletion from "./steps/SuccessCompletion";
import TopBar from "./components/navigations/TopBar";
import ProgressBar from "./components/navigations/ProgressBar";
import { FormUIContext } from "./context/FormUIContext";
import BackgroundFileUploader from './components/fileupload/BackgroundFileUploader';
import { Toaster } from "./components/ui/toaster"

const stepFields = {
  1: [
    "fullName",
    "address",
    "homePhone",
    "alternatePhone",
    "email",
    "panId",
    "aadharNumber",
    "birthDate",
    "maritalStatus",
    "proof",
  ],

  2: [
    "emergencyFullNameWithInitial",
    "emergencyStreet",
    "emergencyState",
    "emergencyZip",
    "emergencyPrimaryPhone",
  ],

  3: [
    "bankName",
    "accountHolderName",
    "accountNumber",
    "ifscCode",
    "accountType",
  ],

  4: [
    "education.0.level",
    "education.0.field",
    "education.0.institution",
    "education.0.passingYear",
    "education.0.grade",
  ],

  5: [
    "employment.0.organization",
    "employment.0.designation",
    "employment.0.from",
    "employment.0.to",
    "employment.0.ctc",
    "declaration",
  ],
};

function App() {
  const [step, setStep] = useState(1);
  const form = useEnrollmentForm(setStep);
  const [shakeForm, setShakeForm] = useState(false);


const nextStep = async () => {
  form.setShowErrors(true);

  const valid = await form.trigger(stepFields[step], {
    shouldFocus: false,
  });

  if (!valid) {
    //  trigger shake
    setShakeForm(true);

    // remove shake class after animation
    setTimeout(() => setShakeForm(false), 400);
    return;
  }

  form.setShowErrors(false);

  if (step === 5) {
    await form.onSubmit(form.getValues());
  } else {
    setStep(step + 1);
  }
};

  return (
    <div>
      <FormUIContext.Provider value={{ showErrors: form.showErrors }}>
        <FormProvider {...form}>
          {/* TOP BAR */}
          {step > 1 && step < 6 && <TopBar onBack={() => setStep(step - 1)} />}

          {/* PROGRESS BAR */}
          {step > 1 && step < 6 && <ProgressBar currentStep={step} />}

           <BackgroundFileUploader currentStep={step} />

          {/* STEP CONTENT */}
          <form onSubmit={form.handleSubmit(form.onSubmit)}>
            {step === 1 && <Step1Personal onNext={nextStep} shake={shakeForm}/>}
            {step === 2 && <Step2Emergency onNext={nextStep} shake={shakeForm}/>}
            {step === 3 && <Step3Bank onNext={nextStep} shake={shakeForm}/>}
            {step === 4 && <Step4Education onNext={nextStep} shake={shakeForm}/>}
            {step === 5 && <Step5Employment onNext={nextStep} shake={shakeForm}  isSubmitting={form.isSubmitting}/>}
            {step === 6 && <SuccessCompletion />}
          </form>
        </FormProvider>
      </FormUIContext.Provider>
        <Toaster />
    </div>
  );
}

export default App;
