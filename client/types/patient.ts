// Define types for patient data
export interface PatientDocuments {
  idProof: boolean;
  bloodHlaReport: boolean;
  medicalReport: boolean;
  insuranceProof: boolean;
  signedConsent: boolean;
}

export interface Patient {
  id: string;
  fullName: string;
  dob: string;
  organNeeded: string;
  bloodType: string;
  hlaTyping: string;
  medicalHistoryUploaded: boolean;
  insuranceVerified: boolean;
  transplantStatus: string;
  consentSigned: boolean;
  lastReviewDate: string;
  documents: PatientDocuments;
  justification?: string;

}