"use client"

import React, { useState } from 'react';
import { calculateMatchScore, getOrganViabilityStatus, OrganDonor, organMockData } from '@/data/organMock';
import { Patient } from '@/types/patient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Clock, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface DonorManagementProps {
  patients: Patient[];
}

const DonorManagement = ({ patients }: DonorManagementProps) => {
  const [donors] = useState<OrganDonor[]>(organMockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [organFilter, setOrganFilter] = useState('all');
  const [selectedDonor, setSelectedDonor] = useState<OrganDonor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter donors based on search query and filters
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.donor_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          donor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesOrgan = organFilter === 'all' || 
                         donor.organ_available.toLowerCase() === organFilter.toLowerCase();
    
    return matchesSearch && matchesOrgan;
  });

  // Get current page donors
  const indexOfLastDonor = currentPage * itemsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - itemsPerPage;
  const currentDonors = filteredDonors.slice(indexOfFirstDonor, indexOfLastDonor);
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);

  const getMatchingPatients = (donor: OrganDonor) => {
    return patients.filter(patient => 
      patient.organNeeded.toLowerCase() === donor.organ_available.toLowerCase()
    ).map(patient => ({
      ...patient,
      matchScore: calculateMatchScore(donor, patient),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .filter(patient => patient.matchScore > 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search donors by ID or hospital..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
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
            <SelectItem value="pancreas">Pancreas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Available Donors</CardTitle>
                  <CardDescription>Click on a donor to view potential matches</CardDescription>
                </div>
                <div className="text-sm text-gray-500">
                  Showing {filteredDonors.length} donors
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor ID</TableHead>
                    <TableHead>Organ</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Viability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDonors.map(donor => {
                    const viability = getOrganViabilityStatus(donor);
                    return (
                      <TableRow 
                        key={donor.donor_id}
                        className="cursor-pointer hover:bg-blue-50"
                        onClick={() => setSelectedDonor(donor)}
                      >
                        <TableCell className="font-medium">{donor.donor_id}</TableCell>
                        <TableCell>{donor.organ_available}</TableCell>
                        <TableCell>{donor.blood_type}</TableCell>
                        <TableCell>{donor.location}</TableCell>
                        <TableCell>
                          <Badge variant={
                            donor.organ_condition === 'Excellent' ? 'default' :
                            donor.organ_condition === 'Good' ? 'outline' :
                            donor.organ_condition === 'Fair' ? 'secondary' : 'destructive'
                          }>
                            {donor.organ_condition}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className={
                              viability.urgencyLevel === 'High' ? 'text-red-500 font-medium' :
                              viability.urgencyLevel === 'Medium' ? 'text-amber-500 font-medium' :
                              'text-green-500 font-medium'
                            }>
                              {viability.daysRemaining} days
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              {filteredDonors.length > itemsPerPage && (
                <div className="flex justify-between items-center p-4 border-t">
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedDonor ? (
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">Donor {selectedDonor.donor_id}</CardTitle>
                <CardDescription>Potential patient matches</CardDescription>
              </CardHeader>
              <CardContent className="py-4">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Organ:</span>
                    <span className="font-medium">{selectedDonor.organ_available}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Blood Type:</span>
                    <span className="font-medium">{selectedDonor.blood_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Tissue Type:</span>
                    <span className="font-medium">{selectedDonor.tissue_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Donor Age:</span>
                    <span className="font-medium">{selectedDonor.age} years</span>
                  </div>
                </div>

                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Matching Patients
                </h4>
                
                {getMatchingPatients(selectedDonor).length > 0 ? (
                  <div className="space-y-3">
                    {getMatchingPatients(selectedDonor).map(patient => (
                      <div key={patient.id} className="border rounded-md p-3">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{patient.fullName}</span>
                          <Badge variant="outline">{patient.bloodType}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500">Match:</span>
                          <Progress value={patient.matchScore} className="h-2" />
                          <span className="text-sm font-medium">{patient.matchScore}%</span>
                        </div>
                        <div className="text-xs text-gray-500">{patient.id}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No compatible patients found
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-10 text-center text-gray-500">
                <p>Select a donor from the list to view potential matches</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorManagement;
