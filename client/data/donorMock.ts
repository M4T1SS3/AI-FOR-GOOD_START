// Mock data for organ donors
export interface Donor {
  id: string;
  name: string;
  dob: string;
  bloodType: string;
  hlaTyping: string;
  organAvailable: string;
  location: string;
  status: string;
  compatibilityScore?: number;
}

export const donorMockData: Donor[] = [
  {
    id: 'D-20230101-001',
    name: 'James Wilson',
    dob: '1985-04-12',
    bloodType: 'O+',
    hlaTyping: 'HLA-A2, HLA-B7',
    organAvailable: 'Kidney',
    location: 'Boston, MA',
    status: 'Active'
  },
  {
    id: 'D-20230102-002',
    name: 'Sophia Chen',
    dob: '1990-07-23',
    bloodType: 'A+',
    hlaTyping: 'HLA-A1, HLA-B8',
    organAvailable: 'Liver',
    location: 'San Francisco, CA',
    status: 'Active'
  },
  {
    id: 'D-20230103-003',
    name: 'Miguel Rodriguez',
    dob: '1978-11-05',
    bloodType: 'B+',
    hlaTyping: 'HLA-A3, HLA-B7',
    organAvailable: 'Kidney',
    location: 'Chicago, IL',
    status: 'Active'
  },
  {
    id: 'D-20230104-004',
    name: 'Emma Johnson',
    dob: '1993-02-18',
    bloodType: 'O-',
    hlaTyping: 'HLA-A2, HLA-B44',
    organAvailable: 'Heart',
    location: 'Seattle, WA',
    status: 'Pending'
  },
  {
    id: 'D-20230105-005',
    name: 'David Kim',
    dob: '1982-09-30',
    bloodType: 'AB+',
    hlaTyping: 'HLA-A24, HLA-B27',
    organAvailable: 'Lung',
    location: 'Atlanta, GA',
    status: 'Active'
  },
  {
    id: 'D-20230106-006',
    name: 'Sarah Thompson',
    dob: '1988-06-14',
    bloodType: 'A-',
    hlaTyping: 'HLA-A1, HLA-B8',
    organAvailable: 'Kidney',
    location: 'Denver, CO',
    status: 'Active'
  },
  {
    id: 'D-20230107-007',
    name: 'Robert Martinez',
    dob: '1975-12-03',
    bloodType: 'O+',
    hlaTyping: 'HLA-A2, HLA-B7',
    organAvailable: 'Liver',
    location: 'Miami, FL',
    status: 'Active'
  },
  {
    id: 'D-20230108-008',
    name: 'Lisa Wang',
    dob: '1991-03-27',
    bloodType: 'B-',
    hlaTyping: 'HLA-A3, HLA-B44',
    organAvailable: 'Kidney',
    location: 'Portland, OR',
    status: 'Pending'
  },
  {
    id: 'D-20230109-009',
    name: 'John Davis',
    dob: '1980-08-09',
    bloodType: 'A+',
    hlaTyping: 'HLA-A1, HLA-B27',
    organAvailable: 'Heart',
    location: 'Austin, TX',
    status: 'Active'
  },
  {
    id: 'D-20230110-010',
    name: 'Aisha Williams',
    dob: '1987-05-21',
    bloodType: 'AB-',
    hlaTyping: 'HLA-A24, HLA-B8',
    organAvailable: 'Lung',
    location: 'Philadelphia, PA',
    status: 'Active'
  }
];
