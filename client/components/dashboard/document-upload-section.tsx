"use client"

import React from 'react';
import { FileText, Upload, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types/patient';

interface DocumentUploadSectionProps {
  patient: Patient;
  onFileUpload: (patientId: string, documentType: keyof Patient['documents']) => void;
}

const DocumentUploadSection = ({ patient, onFileUpload }: DocumentUploadSectionProps) => {
  // Document configuration with display names and descriptions
  const documentTypes = [
    {
      key: 'idProof' as keyof Patient['documents'],
      name: 'Identification Proof',
      description: 'Government issued photo ID or passport'
    },
    {
      key: 'medicalReport' as keyof Patient['documents'],
      name: 'Medical History Report',
      description: 'Comprehensive medical background and condition assessment'
    },
    {
      key: 'bloodHlaReport' as keyof Patient['documents'],
      name: 'Blood & HLA Typing Report',
      description: 'Lab results with blood group and Human Leukocyte Antigen typing'
    },
    {
      key: 'insuranceProof' as keyof Patient['documents'],
      name: 'Insurance Verification',
      description: 'Insurance card and policy coverage details'
    },
    {
      key: 'signedConsent' as keyof Patient['documents'],
      name: 'Consent Form',
      description: 'Signed patient consent for transplantation procedures'
    }
  ];

  // Calculate overall document completion
  const completedDocuments = Object.values(patient.documents).filter(Boolean).length;
  const totalDocuments = Object.keys(patient.documents).length;
  const completionPercentage = Math.round((completedDocuments / totalDocuments) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Required Documentation</h3>
          <p className="text-sm text-gray-500">
            {completedDocuments} of {totalDocuments} documents uploaded 
            ({completionPercentage}% complete)
          </p>
        </div>
        <Badge 
          variant={completionPercentage === 100 ? "default" : "outline"}
          className={completionPercentage === 100 ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
        >
          {completionPercentage === 100 ? "Complete" : "Incomplete"}
        </Badge>
      </div>

      <div className="space-y-4">
        {documentTypes.map(doc => {
          const isUploaded = patient.documents[doc.key];
          
          return (
            <div key={doc.key} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-start">
                  <FileText className={`h-5 w-5 mr-3 mt-0.5 ${isUploaded ? 'text-green-500' : 'text-gray-400'}`} />
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-gray-500">{doc.description}</p>
                  </div>
                </div>
                
                {isUploaded ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Uploaded
                  </Badge>
                ) : (
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onFileUpload(patient.id, doc.key)}
                    >
                      <Upload className="h-3.5 w-3.5 mr-1" /> Upload
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Special sections that appear based on document status */}
      <div className="mt-8 space-y-4">
        {!patient.insuranceVerified && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <h4 className="font-medium text-amber-800 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Insurance Verification Required
            </h4>
            <p className="text-sm text-amber-700 mt-1">
              Please upload insurance documents to proceed with the registration process.
            </p>
          </div>
        )}
        
        {!patient.consentSigned && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <h4 className="font-medium text-amber-800 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Patient Consent Required
            </h4>
            <p className="text-sm text-amber-700 mt-1">
              A signed consent form is required before the patient can be added to the transplant waiting list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadSection;
