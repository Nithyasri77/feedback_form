import { useState, useRef, useEffect } from "react";
import { useFormUI } from "../context/FormUIContext";
import { Phone, Globe, Mail, MapPin, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useFormContext } from "react-hook-form";
import CompanyLogo from "../../public/images/FINAL.svg";
import CompanyName from "../../public/images/LogotextwithMotto.svg";

// ─── Calendar helpers ────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const WEEKDAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MIN_YEAR = 2025;
const MIN_DATE = new Date(2025, 0, 1);   // Jan 1 2025

function buildGrid(year, month) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function toDisplay(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1].slice(0, 3)} ${d}, ${y}`;
}

function parseISO(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function isSameDay(a, b) {
  return a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate();
}

// ─── Inline calendar popup ───────────────────────────────────
function CalendarPicker({ value, onChange, minDate }) {
  const effectiveMin = minDate || MIN_DATE;
  const selected     = parseISO(value);

  const initYear  = selected ? selected.getFullYear()  : Math.max(effectiveMin.getFullYear(), new Date().getFullYear());
  const initMonth = selected ? selected.getMonth()     : effectiveMin.getMonth();

  const [viewYear,  setViewYear]  = useState(initYear);
  const [viewMonth, setViewMonth] = useState(initMonth);

  // Sync view when value changes externally
  useEffect(() => {
    if (selected) {
      setViewYear(selected.getFullYear());
      setViewMonth(selected.getMonth());
    }
  }, [value]);

  const cells = buildGrid(viewYear, viewMonth);
  const today = new Date(); today.setHours(0,0,0,0);

  const isDisabled = (date) => {
    if (!date) return true;
    const d = new Date(date); d.setHours(0,0,0,0);
    const m = new Date(effectiveMin); m.setHours(0,0,0,0);
    return d < m;
  };

  const prevDisabled = () => {
    // disable prev if going back would be entirely before MIN
    return new Date(viewYear, viewMonth, 0) < effectiveMin;
  };

  const goPrev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const goNext = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const pick = (date) => {
    if (isDisabled(date)) return;
    onChange(toISO(date));
  };

  return (
    <div className="bg-[#111] border border-[#2e2e2e] rounded-xl overflow-hidden shadow-2xl w-full">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2e2e2e]">
        <button
          type="button"
          onClick={goPrev}
          disabled={prevDisabled()}
          className="p-1.5 rounded-lg hover:bg-[#2a2a2a] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={15} />
        </button>

        <span className="text-sm font-semibold tracking-wide select-none">
          {MONTHS[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={goNext}
          className="p-1.5 rounded-lg hover:bg-[#2a2a2a] transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 px-2 pt-2">
        {WEEKDAYS.map(d => (
          <div key={d} className="text-center text-[11px] font-medium text-gray-500 py-1 select-none">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 px-2 pb-3 gap-y-0.5">
        {cells.map((date, i) => {
          const disabled = isDisabled(date);
          const sel      = date && selected && isSameDay(date, selected);
          const isToday  = date && isSameDay(date, today);

          return (
            <button
              key={i}
              type="button"
              onClick={() => date && pick(date)}
              disabled={disabled || !date}
              className={[
                "h-8 w-full text-xs rounded-full flex items-center justify-center transition-all duration-100 select-none",
                !date                     ? "invisible pointer-events-none"           : "",
                disabled && date          ? "text-[#383838] cursor-not-allowed"       : "",
                sel                       ? "bg-white text-black font-bold"           : "",
                !sel && !disabled && isToday ? "ring-1 ring-white text-white"         : "",
                !sel && !disabled && !isToday ? "text-gray-200 hover:bg-[#2a2a2a] cursor-pointer" : "",
              ].filter(Boolean).join(" ")}
            >
              {date ? date.getDate() : ""}
            </button>
          );
        })}
      </div>

      {/* Today shortcut */}
      {!isDisabled(today) && (
        <div className="px-3 pb-3">
          <button
            type="button"
            onClick={() => pick(today)}
            className="w-full text-xs text-gray-400 hover:text-white border border-[#2e2e2e] hover:border-[#555] rounded-lg py-1.5 transition-colors"
          >
            Today — {toDisplay(toISO(today))}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Date field with toggle ───────────────────────────────────
function DateField({ label, fieldName, value, onChange, minDate, error, showErrors }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePick = (iso) => {
    onChange(iso);
    setOpen(false);
  };

  return (
    <div ref={ref} className="mb-4">
      <label className="block mb-2 font-medium">
        {label} <span className="text-red-400">*</span>
      </label>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-left flex items-center justify-between border transition-colors ${
          open ? "border-gray-500" : "border-transparent hover:border-[#333]"
        }`}
      >
        <span className={value ? "text-white" : "text-gray-500"}>
          {value ? toDisplay(value) : "Select a date"}
        </span>
        <CalendarDays
          size={18}
          className={`transition-colors ${open ? "text-white" : "text-gray-400"}`}
        />
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div className="mt-2">
          <CalendarPicker
            value={value}
            onChange={handlePick}
            minDate={minDate}
          />
        </div>
      )}

      {showErrors && error && (
        <p className="mt-1 text-sm text-red-400">* {error.message}</p>
      )}
    </div>
  );
}

// ─── Main Step1 component ─────────────────────────────────────
const Step1Personal = ({ onNext, shake }) => {
  const {
    register,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();

  const startValue = watch("startDate") || "";
  const endValue   = watch("endDate")   || "";

  const handleStartChange = (iso) => {
    setValue("startDate", iso, { shouldValidate: false });
    clearErrors("startDate");
    // reset end date if it's now before the new start
    if (endValue && endValue < iso) {
      setValue("endDate", "", { shouldValidate: false });
      clearErrors("endDate");
    }
  };

  const handleEndChange = (iso) => {
    setValue("endDate", iso, { shouldValidate: false });
    clearErrors("endDate");
  };

  // End-date minimum = whichever is later: Jan 1 2025 or chosen start date
  const endMin = startValue ? parseISO(startValue) : MIN_DATE;

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">

      {/* HEADER */}
      <div
        className="-mx-6 bg-gray-800 py-11 pb-7 px-6 bg-cover bg-no-repeat relative"
        style={{ backgroundImage: "url('/images/bg-2.jpg')" }}
      >
        <div className="max-w-md sm:max-w-lg mx-auto p-5">
          <div className="flex justify-start items-center gap-3 mt-0 mb-10">
            <img src={CompanyLogo} alt="Company Logo" className="h-20 w-auto" />
            <img src={CompanyName} alt="Company Name" className="h-16 w-auto" />
          </div>

          <h1 className="text-[27px] sm:text-3xl md:text-4xl font-bold mb-4">
            Submit Your Feedback Form
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed mb-8">
            Please fill out the form below to complete your Feedback Form.
          </p>

          <div className="space-y-4">
            <div className="text-lg flex items-center gap-2"><Phone /> +91 7200353789</div>
            <div className="text-lg flex items-center gap-2"><Mail /> shinecrafttech@gmail.com</div>
            <div className="text-lg flex items-center gap-2"><Globe /> www.shinecrafttechnologies.com</div>
            <div className="text-lg flex items-center gap-2"><MapPin /> Puducherry</div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto py-8">
        <div className={`bg-[#1a1a1a] shadow-lg rounded-md p-6 ${shake ? "shake" : ""}`}>

          <h2 className="text-2xl font-semibold mb-8">Personal Information</h2>

          {/* FULL NAME */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Your Full Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("fullName", { onChange: () => clearErrors("fullName") })}
              placeholder="Enter your full name"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />
            {showErrors && errors.fullName && (
              <p className="text-sm text-red-400">* {errors.fullName.message}</p>
            )}
          </div>

          {/* MOBILE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Mobile Number <span className="text-red-400">*</span>
            </label>
            <input
              {...register("mobileNumber", { onChange: () => clearErrors("mobileNumber") })}
              placeholder="Enter your mobile number"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />
            {showErrors && errors.mobileNumber && (
              <p className="text-sm text-red-400">* {errors.mobileNumber.message}</p>
            )}
          </div>

          {/* COLLEGE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              College Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("collegeName", { onChange: () => clearErrors("collegeName") })}
              placeholder="Enter your college name"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />
            {showErrors && errors.collegeName && (
              <p className="text-sm text-red-400">* {errors.collegeName.message}</p>
            )}
          </div>

          {/* DEPARTMENT */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Department / Specialization <span className="text-red-400">*</span>
            </label>
            <input
              {...register("department", { onChange: () => clearErrors("department") })}
              placeholder="e.g. Computer Science"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white"
            />
            {showErrors && errors.department && (
              <p className="text-sm text-red-400">* {errors.department.message}</p>
            )}
          </div>

          {/* START DATE */}
          <DateField
            label="Internship Start Date"
            fieldName="startDate"
            value={startValue}
            onChange={handleStartChange}
            minDate={MIN_DATE}
            error={errors.startDate}
            showErrors={showErrors}
          />

          {/* END DATE */}
          <DateField
            label="Internship End Date"
            fieldName="endDate"
            value={endValue}
            onChange={handleEndChange}
            minDate={endMin}
            error={errors.endDate}
            showErrors={showErrors}
          />

          {/* INTERNSHIP MODE */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Internship Mode <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-col gap-2">
              {["Online", "Offline", "Hybrid"].map((m) => (
                <label key={m} className="flex items-center gap-2">
                  <input type="radio" value={m} {...register("mode")} />
                  {m}
                </label>
              ))}
            </div>
            {showErrors && errors.mode && (
              <p className="text-sm text-red-400">* {errors.mode.message}</p>
            )}
          </div>
        </div>

        {/* NEXT */}
        <div className="mt-5 mb-8">
          <button
            type="button"
            onClick={onNext}
            className="max-w-lg w-full py-4 rounded-full bg-white text-black text-lg font-bold hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1Personal;