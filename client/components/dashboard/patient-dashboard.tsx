"use client"

import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, Filter, ArrowLeft, Clock, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Patient } from '@/types/patient';
import DocumentUploadSection from './document-upload-section';

interface PatientDashboardProps {
  patients: Patient[];
}

const PatientDashboard = ({ patients }: PatientDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [organFilter, setOrganFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
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

  // Handle file upload for patient documents
  const handleFileUpload = (patientId: string, documentType: keyof Patient['documents']) => {
    // Simulating document upload - in a real app, this would handle actual file uploads
    const updatedPatients = patients.map(patient => {
      if (patient.id === patientId) {
        const updatedDocuments = {
          ...patient.documents,
          [documentType]: true
        };
        
        // Update related fields based on document type
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
        
        // If we have selected this patient, update the selection too
        if (selectedPatient && selectedPatient.id === patientId) {
          setSelectedPatient(updatedPatient);
        }
        
        return updatedPatient;
      }
      return patient;
    });
    
    // This function is just for demonstration - in a real app you'd update the state
    // using a proper state management approach
  };

  // When viewing a single patient
  if (selectedPatient) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setSelectedPatient(null)} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patient List
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Summary Card */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">{selectedPatient.fullName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Patient ID</p>
                    <p className="font-medium">{selectedPatient.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{selectedPatient.dob}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge 
                      variant={
                        selectedPatient.transplantStatus.includes('Active') ? 'default' :
                        selectedPatient.transplantStatus.includes('On Hold') ? 'outline' : 'secondary'
                      }
                    >
                      {selectedPatient.transplantStatus}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Last Review Date</p>
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {selectedPatient.lastReviewDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Organ Needed</p>
                    <p className="font-medium">{selectedPatient.organNeeded}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Blood Type</p>
                    <p className="font-medium">{selectedPatient.bloodType}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">HLA Typing</p>
                    <p className="font-medium">{selectedPatient.hlaTyping}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Documents and Upload Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  Documents & Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentUploadSection 
                  patient={selectedPatient} 
                  onFileUpload={handleFileUpload}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Default view - Patient list
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4 mb-4">
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
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Organ Needed</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <TableRow 
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.fullName}</TableCell>
                  <TableCell>{patient.organNeeded}</TableCell>
                  <TableCell>{patient.bloodType}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        patient.transplantStatus.includes('Active') ? 'default' :
                        patient.transplantStatus.includes('On Hold') ? 'outline' : 'secondary'
                      }
                    >
                      {patient.transplantStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {Object.values(patient.documents).filter(Boolean).length}/5
                      {Object.values(patient.documents).every(Boolean) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  No patients found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientDashboard;
