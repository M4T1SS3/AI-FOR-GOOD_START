import { Patient } from "@/types/patient";

      
export const patientMockData:Patient[] =  [
    {
      id: 'P-20250312-001',
      fullName: 'John Doe',
      dob: '12/08/1980',
      organNeeded: 'Kidney',
      bloodType: 'O+',
      hlaTyping: 'HLA-A1, HLA-B8',
      medicalHistoryUploaded: true,
      insuranceVerified: true,
      transplantStatus: 'Active - Rank #24',
      consentSigned: true,
      lastReviewDate: '03/15/2025',
      documents: {
        idProof: true,
        bloodHlaReport: true,
        medicalReport: true,
        insuranceProof: true,
        signedConsent: true
      }
    },
    {
      id: 'P-20250312-002',
      fullName: 'Jane Smith',
      dob: '05/22/1975',
      organNeeded: 'Liver',
      bloodType: 'A-',
      hlaTyping: 'HLA-A3, HLA-B7',
      medicalHistoryUploaded: true,
      insuranceVerified: false,
      transplantStatus: 'On Hold',
      consentSigned: true,
      lastReviewDate: '03/10/2025',
      documents: {
        idProof: true,
        bloodHlaReport: true,
        medicalReport: true,
        insuranceProof: false,
        signedConsent: true
      }
    },
    {
      id: 'P-20250312-003',
      fullName: 'Michael Johnson',
      dob: '11/15/1990',
      organNeeded: 'Heart',
      bloodType: 'B+',
      hlaTyping: 'HLA-A2, HLA-B35',
      medicalHistoryUploaded: false,
      insuranceVerified: true,
      transplantStatus: 'Inactive',
      consentSigned: false,
      lastReviewDate: '03/01/2025',
      documents: {
        idProof: true,
        bloodHlaReport: false,
        medicalReport: false,
        insuranceProof: true,
        signedConsent: false
      }
    }
  ]