import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useFormUI } from "../context/FormUIContext";
import { Upload, X, CheckCircle } from "lucide-react";

// ── Phase labels shown in the overlay ───────────────────────
const PHASES = [
  { key: "uploading", label: "Uploading your documents",  sub: "Saving files to Drive…"          },
  { key: "saving",    label: "Saving your responses",     sub: "Writing data to the sheet…"      },
  { key: "done",      label: "All done!",                 sub: "Redirecting you in a moment…"    },
];

const Step8Document = ({ onNext, shake, isSubmitting }) => {
  const { setValue, watch } = useFormContext();
  const { showErrors } = useFormUI();

  const files = watch("finalDocuments") || [];

  // Local guard — flips to true the instant the button is clicked,
  // before the async chain even starts, so rapid clicks are blocked.
  const hasClickedRef = useRef(false);
  const [localBusy, setLocalBusy] = useState(false);

  // Phase cycling while submitting
  const [phaseIdx, setPhaseIdx] = useState(0);
  const phaseTimer = useRef(null);

  // When submission starts, cycle through phases
  useEffect(() => {
    if (isSubmitting || localBusy) {
      setPhaseIdx(0);
      let idx = 0;
      phaseTimer.current = setInterval(() => {
        idx = Math.min(idx + 1, PHASES.length - 2); // stay on "saving" until really done
        setPhaseIdx(idx);
      }, 2200);
    } else {
      // Submission finished — briefly show "done" phase then clean up
      if (hasClickedRef.current) {
        setPhaseIdx(PHASES.length - 1);
        setTimeout(() => {
          clearInterval(phaseTimer.current);
          hasClickedRef.current = false;
          setLocalBusy(false);
          setPhaseIdx(0);
        }, 800);
      }
      clearInterval(phaseTimer.current);
    }
    return () => clearInterval(phaseTimer.current);
  }, [isSubmitting]);

  const busy = isSubmitting || localBusy;

  const handleSubmitClick = () => {
    if (hasClickedRef.current || busy) return; // hard block
    hasClickedRef.current = true;
    setLocalBusy(true);
    onNext(); // triggers handleSubmit(onSubmit) from parent
  };

  const handleFileChange = (e) => {
    if (busy) return;
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 10) {
      alert("You can upload up to 10 files only.");
      return;
    }
    setValue("finalDocuments", [...files, ...selectedFiles], { shouldValidate: false });
  };

  const removeFile = (index) => {
    if (busy) return;
    const updated = [...files];
    updated.splice(index, 1);
    setValue("finalDocuments", updated, { shouldValidate: false });
  };

  const currentPhase = PHASES[phaseIdx];
  const isDone = phaseIdx === PHASES.length - 1;

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden relative">

      {/* ── LOADING OVERLAY ───────────────────────────────── */}
      {busy && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md">

          {/* Spinner / checkmark */}
          <div className="relative flex items-center justify-center mb-7">
            {isDone ? (
              /* Green checkmark when done */
              <CheckCircle
                size={72}
                className="text-green-400"
                style={{ animation: "scPop 0.35s cubic-bezier(.175,.885,.32,1.275) both" }}
              />
            ) : (
              <>
                {/* Outer track ring */}
                <div className="w-[72px] h-[72px] rounded-full border-4 border-[#2a2a2a]" />
                {/* Spinning arc */}
                <svg
                  className="absolute w-[72px] h-[72px]"
                  style={{ animation: "scSpin 0.9s linear infinite" }}
                  viewBox="0 0 72 72"
                  fill="none"
                >
                  <circle
                    cx="36" cy="36" r="32"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="60 140"
                    strokeDashoffset="0"
                  />
                </svg>
                {/* Pulsing centre dot */}
                <div
                  className="absolute w-3 h-3 rounded-full bg-white"
                  style={{ animation: "scPulse 1.1s ease-in-out infinite" }}
                />
              </>
            )}
          </div>

          {/* Phase label */}
          <p
            key={currentPhase.key}
            className="text-white text-[17px] font-semibold tracking-wide text-center"
            style={{ animation: "scFadeUp 0.3s ease both" }}
          >
            {currentPhase.label}
          </p>

          {/* Sub-label */}
          <p
            key={currentPhase.key + "_sub"}
            className="text-gray-400 text-sm mt-1.5 text-center"
            style={{ animation: "scFadeUp 0.3s ease 0.05s both" }}
          >
            {isDone ? currentPhase.sub : (
              <>
                {currentPhase.sub}
                <AnimatedDots />
              </>
            )}
          </p>

          {/* Progress bar */}
          {!isDone && (
            <div className="mt-8 w-48 h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                style={{ width: phaseIdx === 0 ? "40%" : "80%" }}
              />
            </div>
          )}

          {/* Warning */}
          {!isDone && (
            <p className="text-[#555] text-xs mt-5">Please don't close or refresh this page</p>
          )}

          <style>{`
            @keyframes scSpin    { to { transform: rotate(360deg); } }
            @keyframes scPulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.25;transform:scale(.55)} }
            @keyframes scFadeUp  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
            @keyframes scPop     { from{opacity:0;transform:scale(.5)} to{opacity:1;transform:scale(1)} }
            @keyframes scDot     { 0%,80%,100%{transform:scale(0);opacity:0} 40%{transform:scale(1);opacity:1} }
          `}</style>
        </div>
      )}

      {/* ── PAGE CONTENT ──────────────────────────────────── */}
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">

        <h1 className="text-2xl font-semibold mb-6">Upload Internship Documents</h1>

        <div className={`bg-[#1a1a1a] rounded-md p-6 shadow-lg ${shake ? "shake" : ""}`}>

          <p className="text-gray-300 mb-4 text-sm leading-relaxed">
            Kindly upload any final presentation, reports, flow diagrams,
            handing over documents, or related files for our records.
          </p>

          {/* UPLOAD AREA — fully locked during submission */}
          <label
            className={`w-full p-6 border-2 border-dashed rounded-md bg-[#0f0f0f] flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
              busy
                ? "opacity-30 cursor-not-allowed pointer-events-none select-none"
                : "text-gray-300 cursor-pointer hover:border-gray-400 hover:bg-[#161616]"
            }`}
          >
            <Upload size={28} />
            <span>Add Files</span>
            <span className="text-xs text-gray-400">Max 10 files • 100MB each</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={busy}
            />
          </label>

          {/* FILE LIST */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-opacity ${
                    busy ? "bg-black/20 opacity-50" : "bg-black/40"
                  }`}
                >
                  <span className="truncate text-gray-200">{file.name}</span>
                  {!busy && (
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-300 ml-2 shrink-0 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-7 mb-8">
          <button
            type="button"
            onClick={handleSubmitClick}
            disabled={busy}
            aria-busy={busy}
            className={`w-full py-4 rounded-full text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3 select-none ${
              busy
                ? "bg-[#1c1c1c] text-[#555] cursor-not-allowed border border-[#2a2a2a]"
                : "bg-white text-black hover:bg-gray-100 active:scale-[0.98] shadow-md"
            }`}
          >
            {busy ? (
              <>
                {/* Mini spinner inside button */}
                <svg className="w-[18px] h-[18px]" style={{ animation: "scSpin 0.9s linear infinite" }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#3a3a3a" strokeWidth="2.5" />
                  <path d="M12 2 a10 10 0 0 1 10 10" stroke="#666" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                Processing…
              </>
            ) : (
              "Submit"
            )}
          </button>

          {/* Helper text below button */}
          {busy && (
            <p
              className="text-center text-xs text-[#444] mt-3"
              style={{ animation: "scFadeUp 0.4s ease both" }}
            >
              Your submission is being processed — please wait
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

// Staggered bouncing dots
const AnimatedDots = () => (
  <span className="inline-flex gap-[3px] ml-1 align-middle">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-[4px] h-[4px] rounded-full bg-gray-400 inline-block"
        style={{ animation: `scDot 1.2s ease-in-out ${i * 0.18}s infinite` }}
      />
    ))}
  </span>
);

export default Step8Document;