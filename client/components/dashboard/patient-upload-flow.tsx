"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Upload, CheckCircle, ArrowRight, ArrowLeft, User, X, UserCheck } from 'lucide-react';
import { Patient, PatientDocuments } from '@/types/patient';

interface PatientUploadFlowProps {
  onComplete: (patient: Patient, proceedToMatching?: boolean) => void;
  onCancel: () => void;
}

const PatientUploadFlow = ({ onComplete, onCancel }: PatientUploadFlowProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  
  // New patient data
  const [patientData, setPatientData] = useState<Partial<Patient>>({
    id: `P-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    fullName: '',
    dob: '',
    organNeeded: '',
    bloodType: '',
    hlaTyping: '',
    medicalHistoryUploaded: false,
    insuranceVerified: false,
    transplantStatus: 'Inactive',
    consentSigned: false,
    lastReviewDate: new Date().toISOString().slice(0, 10),
    documents: {
      idProof: false,
      bloodHlaReport: false,
      medicalReport: false,
      insuranceProof: false,
      signedConsent: false
    }
  });
  
  // Document upload state
  const [uploadedDocs, setUploadedDocs] = useState<Record<keyof PatientDocuments, boolean>>({
    idProof: false,
    bloodHlaReport: false,
    medicalReport: false,
    insuranceProof: false,
    signedConsent: false
  });
  
  const updatePatientField = (field: keyof Patient, value: any) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDocUpload = (docType: keyof PatientDocuments) => {
    // Simulate upload
    setTimeout(() => {
      setUploadedDocs(prev => ({
        ...prev,
        [docType]: true
      }));
      
      // Update patient documents
      setPatientData(prev => ({
        ...prev,
        documents: {
          ...prev.documents as PatientDocuments,
          [docType]: true
        }
      }));
      
      // Update related fields
      if (docType === 'signedConsent') {
        updatePatientField('consentSigned', true);
      } else if (docType === 'insuranceProof') {
        updatePatientField('insuranceVerified', true);
      } else if (docType === 'medicalReport') {
        updatePatientField('medicalHistoryUploaded', true);
      }
    }, 1000);
  };

  const isStepValid = () => {
    switch(step) {
      case 1: // Personal information
        return patientData.fullName && patientData.dob;
      case 2: // Medical information
        return patientData.organNeeded && patientData.bloodType;
      case 3: // Document uploads
        return Object.values(uploadedDocs).some(Boolean); // At least one document
      case 4: // Review and confirm
        return true; // Always valid
      default:
        return false;
    }
  };

  const [proceedToMatching, setProceedToMatching] = useState(false);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Submit the complete patient data
      onComplete(patientData as Patient, proceedToMatching);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input 
                id="patientId" 
                value={patientData.id} 
                disabled 
                className="bg-gray-50"
              />
              <p className="text-xs text-gray-500">Automatically generated</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={patientData.fullName} 
                onChange={(e) => updatePatientField('fullName', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input 
                id="dob" 
                type="date" 
                value={patientData.dob} 
                onChange={(e) => updatePatientField('dob', e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="organNeeded">Organ Needed</Label>
              <Select 
                value={patientData.organNeeded}
                onValueChange={(value) => updatePatientField('organNeeded', value)}
              >
                <SelectTrigger id="organNeeded">
                  <SelectValue placeholder="Select organ type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kidney">Kidney</SelectItem>
                  <SelectItem value="Liver">Liver</SelectItem>
                  <SelectItem value="Heart">Heart</SelectItem>
                  <SelectItem value="Lung">Lung</SelectItem>
                  <SelectItem value="Pancreas">Pancreas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select 
                value={patientData.bloodType}
                onValueChange={(value) => updatePatientField('bloodType', value)}
              >
                <SelectTrigger id="bloodType">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hlaTyping">HLA Typing</Label>
              <Input 
                id="hlaTyping" 
                value={patientData.hlaTyping} 
                onChange={(e) => updatePatientField('hlaTyping', e.target.value)}
                placeholder="e.g. HLA-A1, HLA-B8"
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="urgentStatus" 
                checked={patientData.transplantStatus?.includes('Active')}
                onCheckedChange={(checked) => 
                  updatePatientField('transplantStatus', checked ? 'Active - Pending Rank' : 'Inactive')
                }
              />
              <Label htmlFor="urgentStatus">Mark as urgent/active case</Label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">
              Upload the required documents for patient verification and medical assessment.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                {key: 'idProof', name: 'ID Proof', desc: 'Government-issued ID, passport'},
                {key: 'medicalReport', name: 'Medical Report', desc: 'Detailed condition assessment'},
                {key: 'bloodHlaReport', name: 'Blood & HLA Report', desc: 'Lab test results, typing report'},
                {key: 'insuranceProof', name: 'Insurance Verification', desc: 'Insurance card, policy details'},
                {key: 'signedConsent', name: 'Consent Form', desc: 'Signed patient consent form'}
              ].map((doc) => (
                <div key={doc.key} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-xs text-gray-500">{doc.desc}</p>
                      </div>
                    </div>
                    
                    {uploadedDocs[doc.key as keyof PatientDocuments] ? (
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span>Uploaded</span>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDocUpload(doc.key as keyof PatientDocuments)}
                      >
                        <Upload className="h-4 w-4 mr-1" /> Upload
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-700">
                Please review all information before finalizing the patient record. Once submitted, the patient will be added to the system.
              </p>
            </div>
            
            <div className="border rounded-lg p-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  {patientData.fullName}
                </h3>
                <p className="text-sm text-gray-500">ID: {patientData.id} • DOB: {patientData.dob}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 pt-2">
                <div className="space-y-0.5">
                  <p className="text-sm text-gray-500">Organ Needed:</p>
                  <p className="font-medium">{patientData.organNeeded}</p>
                </div>
                
                <div className="space-y-0.5">
                  <p className="text-sm text-gray-500">Blood Type:</p>
                  <p className="font-medium">{patientData.bloodType}</p>
                </div>
                
                <div className="space-y-0.5">
                  <p className="text-sm text-gray-500">HLA Typing:</p>
                  <p className="font-medium">{patientData.hlaTyping || 'Not specified'}</p>
                </div>
                
                <div className="space-y-0.5">
                  <p className="text-sm text-gray-500">Status:</p>
                  <p className="font-medium">{patientData.transplantStatus}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="font-medium mb-2">Documents</h4>
                <ul className="space-y-1">
                  {Object.entries(uploadedDocs).map(([docType, isUploaded]) => (
                    <li key={docType} className="flex items-center text-sm">
                      {isUploaded ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> : 
                        <span className="h-4 w-4 rounded-full bg-gray-200 mr-1" />
                      }
                      {docType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Added option to proceed to donor matching */}
              <div className="pt-4 border-t mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="proceedToMatching"
                    checked={proceedToMatching}
                    onCheckedChange={(checked) => setProceedToMatching(checked === true)}
                  />
                  <Label htmlFor="proceedToMatching" className="flex items-center">
                    <UserCheck className="h-4 w-4 mr-1 text-blue-500" />
                    Proceed to donor matching after registration
                  </Label>
                </div>
                {proceedToMatching && (
                  <p className="text-sm text-gray-500 mt-2 pl-6">
                    After saving this patient, you'll be redirected to the matching tool to find potential organ donors.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">New Patient Registration</h1>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <div className="text-sm font-medium">
              Step {step} of {totalSteps}: 
              {step === 1 && " Personal Information"}
              {step === 2 && " Medical Details"}
              {step === 3 && " Document Upload"}
              {step === 4 && " Review & Submit"}
            </div>
            <div className="text-sm text-gray-500">
              {progress}% Complete
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          {renderStepContent()}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={step === 1 ? onCancel : handlePrevious}
          >
            {step === 1 ? "Cancel" : (
              <>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!isStepValid()}
          >
            {step < totalSteps ? (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            ) : "Complete Registration"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientUploadFlow;
