"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, SearchX } from 'lucide-react';
import { Patient } from '@/types/patient';
import { Donor, donorMockData } from '@/data/donorMock';

interface PatientDonorMatchingProps {
  patients: Patient[];
  selectedPatient?: Patient | null;
}

interface DonorWithScore extends Donor {
  compatibilityScore: number;
}

const PatientDonorMatching = ({ patients, selectedPatient }: PatientDonorMatchingProps) => {
  const [patientId, setPatientId] = useState<string>(selectedPatient?.id || '');
  const [matchResults, setMatchResults] = useState<DonorWithScore[]>([]);
  const [hasRunSearch, setHasRunSearch] = useState(false);

  // When selectedPatient changes, update the patientId state
  useEffect(() => {
    if (selectedPatient) {
      setPatientId(selectedPatient.id);
      // If a patient is selected, automatically run the matching process
      runMatching(selectedPatient.id);
      setHasRunSearch(true);
    }
  }, [selectedPatient]);

  const selectedPatientData = patients.find(p => p.id === patientId) || null;
  
  const runMatching = (id: string) => {
    // Simulated matching algorithm
    const patient = patients.find(p => p.id === id);
    if (!patient) return;
    
    setHasRunSearch(true);
    
    const matches = donorMockData
      .filter(donor => {
        // Basic compatibility criteria - match using snake_case properties from the Donor interface
        if (donor.blood_type !== patient.bloodType) return false;
        if (donor.organ_available !== patient.organNeeded) return false;
        
        // Calculate compatibility score
        let score = 100;
        
        // Age difference impacts score - use age directly from Donor interface
        const donorAge = donor.age;
        const patientAge = new Date().getFullYear() - new Date(patient.dob).getFullYear();
        const ageDiff = Math.abs(donorAge - patientAge);
        if (ageDiff > 20) score -= 20;
        else if (ageDiff > 10) score -= 10;
        
        // HLA matching impacts score - compare tissue_type with hlaTyping
        if (donor.tissue_type !== patient.hlaTyping) score -= 30;
        
        // Geographic distance impacts score (simulated)
        score -= Math.floor(Math.random() * 15);
        
        // Donor organ condition impacts score
        if (donor.organ_condition !== 'Excellent') score -= 20;
        
        // Assign compatibility score to donor
        const donorWithScore = donor as DonorWithScore;
        donorWithScore.compatibilityScore = score;
        
        return score > 50; // Only return matches with score > 50
      })
      // Cast to DonorWithScore[] to ensure TypeScript knows compatibilityScore is defined
      .sort((a, b) => (b as DonorWithScore).compatibilityScore - (a as DonorWithScore).compatibilityScore) as DonorWithScore[];
    
    setMatchResults(matches);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Patient-Donor Matching</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientSelect">Select Patient</Label>
                <Select value={patientId} onValueChange={(value) => {
                  setPatientId(value);
                  setMatchResults([]);
                  setHasRunSearch(false);
                }}>
                  <SelectTrigger id="patientSelect">
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.fullName} - {patient.organNeeded}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPatientData && (
                <>
                  <div>
                    <Label className="text-sm text-gray-500">Blood Type</Label>
                    <div className="font-medium mt-1">{selectedPatientData.bloodType}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Organ Needed</Label>
                    <div className="font-medium mt-1">{selectedPatientData.organNeeded}</div>
                  </div>
                </>
              )}
            </div>
            
            {selectedPatientData && (
              <div className="flex justify-end">
                <Button onClick={() => runMatching(patientId)}>
                  Find Matching Donors
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {hasRunSearch && matchResults.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Matching Results</span>
              <Badge variant="outline">{matchResults.length} potential donors</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Organ</TableHead>
                    <TableHead>Compatibility</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchResults.map((donor) => (
                    <TableRow key={donor.donor_id}>
                      <TableCell className="font-medium">{donor.donor_id}</TableCell>
                      <TableCell>{donor.location}</TableCell>
                      <TableCell>{donor.hospital}</TableCell>
                      <TableCell>{donor.blood_type}</TableCell>
                      <TableCell>{donor.organ_available}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`font-medium ${getScoreColor(donor.compatibilityScore)}`}>
                            {donor.compatibilityScore}%
                          </div>
                          <Progress 
                            value={donor.compatibilityScore} 
                            className={`h-2 w-16 [&>div]:${getScoreBg(donor.compatibilityScore)}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Request Match</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {hasRunSearch && matchResults.length === 0 && (
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-amber-50 p-3 mb-4">
                <SearchX className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">No matching donors found</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                We couldn't find any compatible donors matching {selectedPatientData?.fullName}'s blood type 
                and {selectedPatientData?.organNeeded.toLowerCase()} requirements in our database.
              </p>
              <div className="text-sm bg-blue-50 p-4 rounded-md border border-blue-100 max-w-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <p className="font-medium text-blue-800">Donor search will continue</p>
                    <p className="text-blue-700 mt-1">
                      The patient has been added to the waiting list. You will be notified when potential donors become available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientDonorMatching;
