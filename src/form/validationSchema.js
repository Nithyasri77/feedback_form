import * as yup from "yup";

const phoneRegex = /^[6-9]\d{9}$/;

const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/;

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const bankAccountRegex = /^[0-9]{9,18}$/;

const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export default yup.object({
  // STEP 1
  fullName: yup.string().required("Full name is required"),
  address: yup.string().required("Address is required"),
  homePhone: yup
    .string()
    .required("Home phone is required")
    .matches(phoneRegex, "Enter a valid 10-digit phone number"),
  alternatePhone: yup
    .string()
    .required("Alternate Phone is required")
    .matches(phoneRegex, "Enter a valid 10-digit phone number"),
  email: yup.string().email("Invalid email").required("Email is required"),
  panId: yup
    .string()
    .required("PAN number is required")
    .matches(panRegex, "Invalid PAN format (ABCDE1234F)"),
  aadharNumber: yup
    .string()
    .transform((value) => value?.replace(/\s/g, ""))
    .required("Aadhaar number is required")
    .matches(aadhaarRegex, "Aadhaar must be exactly 12 digits"),
  birthDate: yup
    .date()
    .typeError("Birth Date is required")
    .required("Birth Date is required"),

  maritalStatus: yup.string().required("Marital status is required"),

  proof: yup
    .array()
    .min(1, "At least one document is required")
    .of(yup.mixed())
    .required("Proof Attached is required")
    .test(
      "fileExists",
      "Proof Attached is required",
      (value) => value && value.length > 0,
    ),

  // STEP 2

  emergencyFullNameWithInitial: yup
    .string()
    .required("FullName with Initial is required"),
  emergencyStreet: yup.string().required("Street Address is required"),
  emergencyCity: yup.string().nullable(),
  emergencyState: yup.string().required("State is required"),
  emergencyZip: yup.string().required("ZIP Code is required"),
  emergencyPrimaryPhone: yup
    .string()
    .required("Primary Phone is required")
    .matches(phoneRegex, "Enter a valid 10-digit phone number"),
  emergencyAlternatePhone: yup
    .string()
    .matches(phoneRegex, "Enter a valid 10-digit phone number")
    .nullable(),
  emergencyRelationship: yup.string().nullable(),

  // STEP 3
  bankName: yup.string().required("Bank name is required"),
  accountHolderName: yup.string().required("Account holder name is required"),
  accountNumber: yup
    .string()
    .required("Account number is required")
    .matches(bankAccountRegex, "Account number must be 9-18 digits"),
  ifscCode: yup
    .string()
    .required("IFSC code is required")
    .matches(ifscRegex, "Invalid IFSC code"),
  accountType: yup.string().required("Account type is required"),

  // STEP 4
  education: yup.array().of(
    yup.object({
      level: yup.string().required("Education level is required"),

      field: yup.string().required("Field of study is required"),

      institution: yup.string().required("Institution name is required"),

      location: yup.string().nullable(),

      passingYear: yup.string().required("Passing year is required"),

      grade: yup.string().required("Grade or percentage is required"),
    }),
  ),

  // STEP 5
  employment: yup.array().of(
    yup.object({
      organization: yup.string().required("Organization name is required"),

      designation: yup.string().required("Designation is required"),

      from: yup
        .date()
        .typeError("Start date is required")
        .required("Start date is required"),

      to: yup
        .date()
        .typeError("End date is required")
        .required("End date is required")
        .min(
          yup.ref("from"),
          "Service Period To must be after Service Period From",
        ),

      ctc: yup.string().required("Monthly CTC is required"),
    }),
  ),

  declaration: yup.boolean().oneOf([true], "You must accept the declaration"),
});
