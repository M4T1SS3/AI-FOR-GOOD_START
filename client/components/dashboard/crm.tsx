"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types/patient';
import { patientMockData } from '@/data/patienMock';
import { PlusCircle } from 'lucide-react';
import PatientDashboard from './patient-dashboard';
import DonorManagement from './donor-management';
import PatientUploadFlow from './patient-upload-flow';
import PatientDonorMatching from './patient-donor-matching';

const OrganDonationCRM = () => {
  const [patients, setPatients] = useState<Patient[]>(patientMockData);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRegistrationFlow, setShowRegistrationFlow] = useState(false);
  const [selectedMatchingPatient, setSelectedMatchingPatient] = useState<Patient | null>(null);

  const handleNewPatientComplete = (newPatient: Patient, proceedToMatching = false) => {
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    setShowRegistrationFlow(false);
    
    if (proceedToMatching) {
      // Set the selected patient for matching and switch to matching tab
      setSelectedMatchingPatient(newPatient);
      setActiveTab('matching');
    } else {
      // Just switch to dashboard to see the new patient
      setActiveTab('dashboard');
    }
  };

  const handleCancelRegistration = () => {
    setShowRegistrationFlow(false);
  };

  if (showRegistrationFlow) {
    return <PatientUploadFlow 
      onComplete={handleNewPatientComplete}
      onCancel={handleCancelRegistration}
    />;
  }

  return (
    <div className="flex flex-col space-y-4 w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader className="bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-800">Organ Donation Management System</CardTitle>
              <CardDescription>Streamlining the patient-donor matching process</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowRegistrationFlow(true)}
                className="bg-white"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                New Patient
              </Button>
              <Badge variant="outline" className="px-3 py-1 text-blue-800 bg-blue-100 border-blue-200">
                {patients.length} Patients
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Patients</TabsTrigger>
              <TabsTrigger value="matching">Matching</TabsTrigger>
              <TabsTrigger value="donors">Donor Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="pt-4">
              <PatientDashboard patients={patients} />
            </TabsContent>
            
            <TabsContent value="matching" className="pt-4">
              <PatientDonorMatching patients={patients} selectedPatient={selectedMatchingPatient} />
            </TabsContent>
            
            <TabsContent value="donors" className="pt-4">
              <DonorManagement patients={patients} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganDonationCRM;