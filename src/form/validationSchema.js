import * as yup from "yup";

// 📌 Date rules (NO past, max + 2 years)
const validDate = yup
  .date()
  .typeError("Please select a valid date")
  .required("Date is required");

export default yup.object({
  // ================= STEP 1: Personal Info =================
  fullName: yup
    .string()
    .required("Full name is required")
    .trim()
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed")
    .min(3, "Minimum 3 characters required"),

  mobileNumber: yup // Matched your JSX
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),

  collegeName: yup // Matched your JSX
    .string()
    .required("College name is required")
    .min(3, "Minimum 3 characters required"),

  department: yup
    .string()
    .required("Department is required")
    .min(2, "Minimum 2 characters required"),

 startDate: validDate
    .min(new Date(2025, 0, 1), "Start date must be in 2025 or later"),
 
  endDate: validDate
    .min(new Date(2025, 0, 1), "End date must be in 2025 or later")
    .test("endAfterStart", "End date must be on or after the start date", function(value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return new Date(value) >= new Date(startDate);
    }),

  mode: yup
    .string()
    .oneOf(["Online", "Offline", "Hybrid"], "Please select a mode")
    .required("Select an internship mode"),


  // ================= STEP 2: Activities =================
  projects: yup
    .string()
    .required("Project description is required")
    .trim()
    .min(10, "Please write at least 10 characters"),

  roles: yup
    .string()
    .required("Roles & responsibilities are required")
    .trim()
    .min(10, "Please write at least 10 characters"),

  technologies: yup // Checkbox array
    .array()
    .min(1, "Select at least one technology")
    .required("Select at least one technology"),

  otherTech: yup.string().optional(), // Optional text input

  support: yup // Radio
    .string()
    .oneOf(["Yes", "No"], "Invalid selection")
    .required("Please select Yes or No"),

  rating: yup // Star rating
    .number()
    .typeError("Please provide a rating")
    .min(1, "Minimum 1 star")
    .max(5, "Maximum 5 stars")
    .required("Rating is required"),


  // ================= STEP 3: Mentorship =================
  mentorAccessibility: yup
    .string()
    .oneOf(["Always", "Usually", "Occasionally", "Rarely"], "Invalid selection")
    .required("Please select an option"),

  feedback: yup
    .string()
    .oneOf(["Yes", "No"], "Invalid selection")
    .required("Please select Yes or No"),

  mentorRating: yup.number().min(1).max(5).required("Mentor rating is required"),
  communicationRating: yup.number().min(1).max(5).required("Communication rating is required"),

  responseTime: yup
    .string()
    .oneOf(["Yes", "No", "Sometimes"])
    .required("Please select an option"),

  supportRating: yup.number().min(1).max(5).required("Support rating is required"),
  
  regularFeedback: yup.string().oneOf(["Yes", "No"]).required("Please select an option"),
  
  doubtResolution: yup.string().oneOf(["Yes", "No", "Sometimes"]).required("Please select an option"),


  // ================= STEP 4: Communication =================
  ideaCommunication: yup.string().oneOf(["Yes", "No"]).required("Please select an option"),
  
  teamFeeling: yup.string().oneOf(["Yes", "No"]).required("Please select an option"),
  
  teamCoordination: yup.number().min(1).max(5).required("Coordination rating is required"),
  
  practicalKnowledge: yup.string().oneOf(["Yes", "No"]).required("Please select an option"),
  
  learningRating: yup.number().min(1).max(5).required("Learning experience rating is required"),

  skills: yup
    .array() // Changed to array because you used checkboxes for this in Step 4
    .min(1, "Select at least one skill")
    .required("Select at least one skill"),

  careerAlignment: yup.string().oneOf(["Yes", "No", "Partially"]).required("Please select an option"),


  // ================= STEP 5: Management =================
  internshipStructure: yup.number().min(1).max(5).required("Structure rating is required"),
  
  deadlines: yup.string().oneOf(["Yes", "No", "Partially"]).required("Please select an option"),
  
  projectGoals: yup.string().oneOf(["Yes", "No", "Somewhat"]).required("Please select an option"),
  
  github: yup.string().oneOf(["Yes", "No"]).required("Please select an option"),
  
  taskClarity: yup.string().oneOf(["Yes", "No"]).required("Please select an option"),
  
  taskMeaningful: yup.number().min(1).max(5).required("Task meaningfulness rating is required"),

  challenges: yup
    .string()
    .required("Please describe the challenges you faced")
    .trim()
    .min(5, "Enter at least 5 characters"),


  // ================= STEP 6: Feedback =================
  takeaway: yup
    .string()
    .required("Please write your biggest takeaway")
    .trim()
    .min(5, "Write at least 5 characters"),

  challengesOvercome: yup // Matched your JSX
    .string()
    .required("Please explain challenges and solution")
    .trim()
    .min(5, "Write at least 5 characters"),

  improvements: yup // Step 6 improvements
    .string()
    .required("Please suggest improvements")
    .trim()
    .min(5, "Write at least 5 characters"),

  joinFuture: yup.string().oneOf(["Yes", "No", "Maybe"]).required("Please select an option"),
  
  recommend: yup.string().oneOf(["Yes", "No"]).required("Please select an option"),

  source: yup.array().min(1, "Select at least one source").required("Select a source"),
  otherSource: yup.string().optional(),

  // These are the renamed fields from the bug fix we discussed
  postedPlatform: yup.array().optional(), 
  otherPostedPlatform: yup.string().optional(),

  environment: yup.number().min(1).max(5).required("Environment rating is required"),
  
  comfortable: yup.string().oneOf(["Yes", "No"]).required("Please select an option"),

  teamwork: yup
    .string()
    .required("Please describe your teamwork experience")
    .trim(),


  // ================= STEP 7: Compliance =================
  handover: yup.string().oneOf(["Yes", "No", "Not Yet"]).required("Please select an option"),
  
  knowledgeShare: yup.string().oneOf(["Yes", "No"]).required("Please select an option"),
  
  certificate: yup.string().oneOf(["Yes", "No", "Both"]).required("Please select an option"),

  generalSuggestions: yup // Fixed name to avoid conflict with Step 6 'improvements'
    .string()
    .nullable()
    .optional(),

  enjoyment: yup.number().min(1).max(5).required("Enjoyment rating is required"),
  
  overallExperience: yup.number().min(1).max(5).required("Overall experience rating is required"),

  likedMost: yup.string().required("Please tell us what you liked most").trim(),
  
  improveMore: yup.string().required("Please tell us what we can improve").trim(),


  // ================= STEP 8: Documents =================
  finalDocuments: yup // Matched your JSX
    .mixed()
    .test("fileLength", "Upload at least one file", (value) => {
      return value && value.length > 0;
    })
    .test("fileMax", "Max 10 files allowed", (value) => {
      return !value || value.length <= 10;
    })
    .test("fileSize", "Each file must be <= 100MB", (value) => {
      if (!value || value.length === 0) return true;
      // Convert FileList/Array to standard Array
      const filesArray = Array.from(value); 
      return filesArray.every((file) => file.size <= 100 * 1024 * 1024);
    })
});