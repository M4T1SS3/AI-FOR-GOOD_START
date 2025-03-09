// Define the interface for the donor data
export interface Donor {
    donor_id: string;
    blood_type: string;
    organ_available: string;
    location: string;
    hospital: string;
    tissue_type: string;
    age: number;
    donation_date: string;
    organ_condition: string;
}

// Create an array of donor data
export const donorMockData: Donor[] = [
    {
        donor_id: 'D0000',
        blood_type: 'O+',
        organ_available: 'Heart',
        location: 'Frankfurt',
        hospital: 'Frankfurt University Hospital',
        tissue_type: 'HLA-A1',
        age: 31,
        donation_date: '2025-02-21',
        organ_condition: 'Fair'
    },
    {
        donor_id: 'D0001',
        blood_type: 'AB-',
        organ_available: 'Lung',
        location: 'Munich',
        hospital: 'Hamburg-Eppendorf University Hospital',
        tissue_type: 'HLA-A1',
        age: 37,
        donation_date: '2025-02-08',
        organ_condition: 'Fair'
    },
    {
        donor_id: 'D0002',
        blood_type: 'A+',
        organ_available: 'Heart',
        location: 'Dortmund',
        hospital: 'Charité Hospital',
        tissue_type: 'HLA-DR2',
        age: 41,
        donation_date: '2025-02-27',
        organ_condition: 'Excellent'
    },
    {
        donor_id: 'D0003',
        blood_type: 'AB+',
        organ_available: 'Kidney',
        location: 'Stuttgart',
        hospital: 'Frankfurt University Hospital',
        tissue_type: 'HLA-A2',
        age: 59,
        donation_date: '2025-02-13',
        organ_condition: 'Excellent'
    },
    {
        donor_id: 'D0004',
        blood_type: 'B+',
        organ_available: 'Lung',
        location: 'Dortmund',
        hospital: 'Hamburg-Eppendorf University Hospital',
        tissue_type: 'HLA-DR1',
        age: 32,
        donation_date: '2025-02-25',
        organ_condition: 'Fair'
    },
    {
        donor_id: 'D0005',
        blood_type: 'B-',
        organ_available: 'Pancreas',
        location: 'Stuttgart',
        hospital: 'University Hospital Munich',
        tissue_type: 'HLA-A2',
        age: 53,
        donation_date: '2025-02-20',
        organ_condition: 'Fair'
    },
    {
        donor_id: 'D0006',
        blood_type: 'B+',
        organ_available: 'Lung',
        location: 'Berlin',
        hospital: 'Frankfurt University Hospital',
        tissue_type: 'HLA-DR2',
        age: 39,
        donation_date: '2025-02-23',
        organ_condition: 'Good'
    },
    {
        donor_id: 'D0007',
        blood_type: 'O+',
        organ_available: 'Liver',
        location: 'Leipzig',
        hospital: 'Frankfurt University Hospital',
        tissue_type: 'HLA-DR2',
        age: 34,
        donation_date: '2025-02-12',
        organ_condition: 'Excellent'
    },
    {
        donor_id: 'D0008',
        blood_type: 'B+',
        organ_available: 'Kidney',
        location: 'Leipzig',
        hospital: 'University Hospital Munich',
        tissue_type: 'HLA-DR2',
        age: 61,
        donation_date: '2025-02-22',
        organ_condition: 'Fair'
    },
    {
        donor_id: 'D0009',
        blood_type: 'A+',
        organ_available: 'Kidney',
        location: 'Leipzig',
        hospital: 'Charité Hospital',
        tissue_type: 'HLA-DR1',
        age: 18,
        donation_date: '2025-02-21',
        organ_condition: 'Good'
    },
    {
        donor_id: 'D0010',
        blood_type: 'AB+',
        organ_available: 'Heart',
        location: 'Essen',
        hospital: 'Charité Hospital',
        tissue_type: 'HLA-B7',
        age: 33,
        donation_date: '2025-02-27',
        organ_condition: 'Good'
    },
    {
        donor_id: 'D0011',
        blood_type: 'B-',
        organ_available: 'Heart',
        location: 'Düsseldorf',
        hospital: 'University Hospital Cologne',
        tissue_type: 'HLA-B7',
        age: 32,
        donation_date: '2025-03-05',
        organ_condition: 'Excellent'
    },
    {
        donor_id: 'D0012',
        blood_type: 'O-',
        organ_available: 'Liver',
        location: 'Dortmund',
        hospital: 'University Hospital Cologne',
        tissue_type: 'HLA-B7',
        age: 42,
        donation_date: '2025-02-28',
        organ_condition: 'Excellent'
    },
    {
        donor_id: 'D0013',
        blood_type: 'O+',
        organ_available: 'Lung',
        location: 'Leipzig',
        hospital: 'Frankfurt University Hospital',
        tissue_type: 'HLA-B8',
        age: 43,
        donation_date: '2025-02-10',
        organ_condition: 'Fair'
    },
    {
        donor_id: 'D0014',
        blood_type: 'AB-',
        organ_available: 'Lung',
        location: 'Berlin',
        hospital: 'Hamburg-Eppendorf University Hospital',
        tissue_type: 'HLA-B7',
        age: 58,
        donation_date: '2025-02-17',
        organ_condition: 'Good'
    },
    {
        donor_id: 'D0015',
        blood_type: 'O-',
        organ_available: 'Liver',
        location: 'Munich',
        hospital: 'Frankfurt University Hospital',
        tissue_type: 'HLA-DR1',
        age: 58,
        donation_date: '2025-03-07',
        organ_condition: 'Good'
    },
    {
        donor_id: 'D0016',
        blood_type: 'AB-',
        organ_available: 'Kidney',
        location: 'Frankfurt',
        hospital: 'University Hospital Cologne',
        tissue_type: 'HLA-DR1',
        age: 28,
        donation_date: '2025-03-02',
        organ_condition: 'Excellent'
    },
    {
        donor_id: 'D0017',
        blood_type: 'B-',
        organ_available: 'Heart',
        location: 'Stuttgart',
        hospital: 'Charité Hospital',
        tissue_type: 'HLA-B8',
        age: 31,
        donation_date: '2025-03-02',
        organ_condition: 'Fair'
    }
];
