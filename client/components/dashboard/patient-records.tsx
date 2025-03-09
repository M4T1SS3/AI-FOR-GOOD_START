"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Patient, PatientDocuments } from '@/types/patient';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DocumentUploadSection from './document-upload-section';

interface PatientRecordsProps {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientRecords = ({ patients, setPatients }: PatientRecordsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [organFilter, setOrganFilter] = useState('all');
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
  
  // Filter patients based on search query and filters
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          patient.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && patient.transplantStatus.includes('Active')) ||
                          (statusFilter === 'onhold' && patient.transplantStatus.includes('On Hold')) ||
                          (statusFilter === 'inactive' && patient.transplantStatus.includes('Inactive'));
    
    const matchesOrgan = organFilter === 'all' || patient.organNeeded.toLowerCase() === organFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesOrgan;
  });

  // Simulating AI extraction process with proper type annotations
  const handleFileUpload = (patientId: string, documentType: keyof PatientDocuments): void => {
    setPatients(patients.map(patient => {
      if (patient.id === patientId) {
        const updatedDocuments = {
          ...patient.documents,
          [documentType]: true
        };
        
        // Auto-update related fields based on document type
        let updatedPatient = {
          ...patient,
          documents: updatedDocuments
        };
        
        if (documentType === 'signedConsent') {
          updatedPatient.consentSigned = true;
        } else if (documentType === 'insuranceProof') {
          updatedPatient.insuranceVerified = true;
        } else if (documentType === 'medicalReport') {
          updatedPatient.medicalHistoryUploaded = true;
        }
        
        return updatedPatient;
      }
      return patient;
    }));
  };

  const toggleExpandPatient = (patientId: string) => {
    if (expandedPatient === patientId) {
      setExpandedPatient(null);
    } else {
      setExpandedPatient(patientId);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search patients by name or ID..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="onhold">On Hold</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={organFilter} onValueChange={setOrganFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Organ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organs</SelectItem>
              <SelectItem value="kidney">Kidney</SelectItem>
              <SelectItem value="liver">Liver</SelectItem>
              <SelectItem value="heart">Heart</SelectItem>
              <SelectItem value="lung">Lung</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredPatients.map(patient => (
          <Card key={patient.id} className="overflow-hidden">
            <CardHeader 
              className={`
                bg-gray-50 pb-2 cursor-pointer
                ${patient.transplantStatus.includes('Active') ? 'border-l-4 border-l-green-500' :
                  patient.transplantStatus.includes('On Hold') ? 'border-l-4 border-l-amber-500' :
                  'border-l-4 border-l-gray-300'}
              `}
              onClick={() => toggleExpandPatient(patient.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-gray-500" />
                    {patient.fullName}
                  </CardTitle>
                  <CardDescription>{patient.id} • DOB: {patient.dob}</CardDescription>
                </div>
                <Badge 
                  variant={
                    patient.transplantStatus.includes('Active') ? 'default' :
                    patient.transplantStatus.includes('On Hold') ? 'outline' : 'secondary'
                  }
                >
                  {patient.transplantStatus}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className={`pt-4 ${expandedPatient === patient.id ? 'block' : 'hidden'}`}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Medical Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Organ Needed:</span>
                        <span className="font-medium">{patient.organNeeded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Blood Type:</span>
                        <span className="font-medium">{patient.bloodType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">HLA Typing:</span>
                        <span className="font-medium">{patient.hlaTyping}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Review:</span>
                        <span className="font-medium">{patient.lastReviewDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Administrative Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Medical History:</span>
                        <Badge variant={patient.medicalHistoryUploaded ? "default" : "destructive"}>
                          {patient.medicalHistoryUploaded ? "Uploaded" : "Missing"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Insurance:</span>
                        <Badge variant={patient.insuranceVerified ? "default" : "destructive"}>
                          {patient.insuranceVerified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Consent:</span>
                        <Badge variant={patient.consentSigned ? "default" : "destructive"}>
                          {patient.consentSigned ? "Signed" : "Not Signed"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DocumentUploadSection 
                  patient={patient}
                  onFileUpload={handleFileUpload}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientRecords;
