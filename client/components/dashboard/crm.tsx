"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Upload, FileText, User, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import { Patient, PatientDocuments } from '@/types/patient';



const OrganDonationCRM = () => {
  // Sample data for demonstration
  const [patients, setPatients] = useState<Patient[]>([
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
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [organFilter, setOrganFilter] = useState('all');
  
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
    // In a real application, this would trigger an OCR process
    // For demonstration, we'll just update the document status
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

  return (
    <div className="flex flex-col space-y-4 w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader className="bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-800">Organ Donation Management System</CardTitle>
              <CardDescription>Streamlining the patient-donor matching process</CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1 text-blue-800 bg-blue-100 border-blue-200">
              {patients.length} Patients
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="dashboard">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="patients">Patient Records</TabsTrigger>
              <TabsTrigger value="upload">Document Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="pt-4">
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
                          <TableRow key={patient.id}>
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
            </TabsContent>
            
            <TabsContent value="patients" className="pt-4">
              <div className="space-y-6">
                {filteredPatients.map(patient => (
                  <Card key={patient.id} className="overflow-hidden">
                    <CardHeader className={`bg-gray-50 pb-2 ${
                      patient.transplantStatus.includes('Active') ? 'border-l-4 border-l-green-500' :
                      patient.transplantStatus.includes('On Hold') ? 'border-l-4 border-l-amber-500' :
                      'border-l-4 border-l-gray-300'
                    }`}>
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
                    <CardContent className="pt-4">
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="pt-4">
              <div className="space-y-6">
                {filteredPatients.map(patient => (
                  <Card key={patient.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{patient.fullName} - {patient.id}</CardTitle>
                      <CardDescription>Upload and manage required documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-md p-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-gray-500" />
                              <div>
                                <p className="font-medium">ID Proof</p>
                                <p className="text-xs text-gray-500">Name, DOB verification</p>
                              </div>
                            </div>
                            {patient.documents.idProof ? (
                              <Badge variant="default" className="ml-auto">Uploaded</Badge>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="ml-auto"
                                onClick={() => handleFileUpload(patient.id, 'idProof')}
                              >
                                <Upload className="h-4 w-4 mr-1" /> Upload
                              </Button>
                            )}
                          </div>
                          
                          <div className="border rounded-md p-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-gray-500" />
                              <div>
                                <p className="font-medium">Blood & HLA Report</p>
                                <p className="text-xs text-gray-500">Compatibility matching</p>
                              </div>
                            </div>
                            {patient.documents.bloodHlaReport ? (
                              <Badge variant="default" className="ml-auto">Uploaded</Badge>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="ml-auto"
                                onClick={() => handleFileUpload(patient.id, 'bloodHlaReport')}
                              >
                                <Upload className="h-4 w-4 mr-1" /> Upload
                              </Button>
                            )}
                          </div>
                          
                          <div className="border rounded-md p-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-gray-500" />
                              <div>
                                <p className="font-medium">Medical Report</p>
                                <p className="text-xs text-gray-500">Condition & urgency</p>
                              </div>
                            </div>
                            {patient.documents.medicalReport ? (
                              <Badge variant="default" className="ml-auto">Uploaded</Badge>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="ml-auto"
                                onClick={() => handleFileUpload(patient.id, 'medicalReport')}
                              >
                                <Upload className="h-4 w-4 mr-1" /> Upload
                              </Button>
                            )}
                          </div>
                          
                          <div className="border rounded-md p-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-gray-500" />
                              <div>
                                <p className="font-medium">Insurance Proof</p>
                                <p className="text-xs text-gray-500">Financial clearance</p>
                              </div>
                            </div>
                            {patient.documents.insuranceProof ? (
                              <Badge variant="default" className="ml-auto">Uploaded</Badge>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="ml-auto"
                                onClick={() => handleFileUpload(patient.id, 'insuranceProof')}
                              >
                                <Upload className="h-4 w-4 mr-1" /> Upload
                              </Button>
                            )}
                          </div>
                          
                          <div className="border rounded-md p-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-gray-500" />
                              <div>
                                <p className="font-medium">Signed Consent</p>
                                <p className="text-xs text-gray-500">Legal approval</p>
                              </div>
                            </div>
                            {patient.documents.signedConsent ? (
                              <Badge variant="default" className="ml-auto">Uploaded</Badge>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="ml-auto"
                                onClick={() => handleFileUpload(patient.id, 'signedConsent')}
                              >
                                <Upload className="h-4 w-4 mr-1" /> Upload
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-md">
                          <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            AI Document Processing
                          </h4>
                          <p className="text-sm text-blue-700">
                            Our AI automatically extracts key information from uploaded documents to auto-fill patient records.
                            Upload any missing documents to complete the patient profile.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <div className="space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganDonationCRM;