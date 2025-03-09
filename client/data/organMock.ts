export interface OrganDonor {
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

export const organMockData: OrganDonor[] = [
    { donor_id: "D0000", blood_type: "O+", organ_available: "Heart", location: "Frankfurt", hospital: "Frankfurt University Hospital", tissue_type: "HLA-A1", age: 31, donation_date: "2025-02-21", organ_condition: "Fair" },
    { donor_id: "D0001", blood_type: "AB-", organ_available: "Lung", location: "Munich", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-A1", age: 37, donation_date: "2025-02-08", organ_condition: "Fair" },
    { donor_id: "D0002", blood_type: "A+", organ_available: "Heart", location: "Dortmund", hospital: "Charité Hospital", tissue_type: "HLA-DR2", age: 41, donation_date: "2025-02-27", organ_condition: "Excellent" },
    { donor_id: "D0003", blood_type: "AB+", organ_available: "Kidney", location: "Stuttgart", hospital: "Frankfurt University Hospital", tissue_type: "HLA-A2", age: 59, donation_date: "2025-02-13", organ_condition: "Excellent" },
    { donor_id: "D0004", blood_type: "B+", organ_available: "Lung", location: "Dortmund", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-DR1", age: 32, donation_date: "2025-02-25", organ_condition: "Fair" },
    { donor_id: "D0005", blood_type: "B-", organ_available: "Pancreas", location: "Stuttgart", hospital: "University Hospital Munich", tissue_type: "HLA-A2", age: 53, donation_date: "2025-02-20", organ_condition: "Fair" },
    { donor_id: "D0006", blood_type: "B+", organ_available: "Lung", location: "Berlin", hospital: "Frankfurt University Hospital", tissue_type: "HLA-DR2", age: 39, donation_date: "2025-02-23", organ_condition: "Good" },
    { donor_id: "D0007", blood_type: "O+", organ_available: "Liver", location: "Leipzig", hospital: "Frankfurt University Hospital", tissue_type: "HLA-DR2", age: 34, donation_date: "2025-02-12", organ_condition: "Excellent" },
    { donor_id: "D0008", blood_type: "B+", organ_available: "Kidney", location: "Leipzig", hospital: "University Hospital Munich", tissue_type: "HLA-DR2", age: 61, donation_date: "2025-02-22", organ_condition: "Fair" },
    { donor_id: "D0009", blood_type: "A+", organ_available: "Kidney", location: "Leipzig", hospital: "Charité Hospital", tissue_type: "HLA-DR1", age: 18, donation_date: "2025-02-21", organ_condition: "Good" },
    { donor_id: "D0010", blood_type: "AB+", organ_available: "Heart", location: "Essen", hospital: "Charité Hospital", tissue_type: "HLA-B7", age: 33, donation_date: "2025-02-27", organ_condition: "Good" },
    { donor_id: "D0011", blood_type: "B-", organ_available: "Heart", location: "Düsseldorf", hospital: "University Hospital Cologne", tissue_type: "HLA-B7", age: 32, donation_date: "2025-03-05", organ_condition: "Excellent" },
    { donor_id: "D0012", blood_type: "O-", organ_available: "Liver", location: "Dortmund", hospital: "University Hospital Cologne", tissue_type: "HLA-B7", age: 42, donation_date: "2025-02-28", organ_condition: "Excellent" },
    { donor_id: "D0013", blood_type: "O+", organ_available: "Lung", location: "Leipzig", hospital: "Frankfurt University Hospital", tissue_type: "HLA-B8", age: 43, donation_date: "2025-02-10", organ_condition: "Fair" },
    { donor_id: "D0014", blood_type: "AB-", organ_available: "Lung", location: "Berlin", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-B7", age: 58, donation_date: "2025-02-17", organ_condition: "Good" },
    { donor_id: "D0015", blood_type: "O-", organ_available: "Liver", location: "Munich", hospital: "Frankfurt University Hospital", tissue_type: "HLA-DR1", age: 58, donation_date: "2025-03-07", organ_condition: "Good" },
    { donor_id: "D0016", blood_type: "AB-", organ_available: "Kidney", location: "Frankfurt", hospital: "University Hospital Cologne", tissue_type: "HLA-DR1", age: 28, donation_date: "2025-03-02", organ_condition: "Excellent" },
    { donor_id: "D0017", blood_type: "B-", organ_available: "Heart", location: "Stuttgart", hospital: "Charité Hospital", tissue_type: "HLA-B8", age: 31, donation_date: "2025-03-02", organ_condition: "Fair" },
    { donor_id: "D0018", blood_type: "B-", organ_available: "Pancreas", location: "Leipzig", hospital: "University Hospital Cologne", tissue_type: "HLA-B7", age: 46, donation_date: "2025-02-20", organ_condition: "Excellent" },
    { donor_id: "D0019", blood_type: "AB-", organ_available: "Kidney", location: "Leipzig", hospital: "Frankfurt University Hospital", tissue_type: "HLA-DR2", age: 24, donation_date: "2025-02-25", organ_condition: "Fair" },
    { donor_id: "D0020", blood_type: "A+", organ_available: "Pancreas", location: "Essen", hospital: "University Hospital Munich", tissue_type: "HLA-B8", age: 56, donation_date: "2025-02-07", organ_condition: "Excellent" },
    { donor_id: "D0021", blood_type: "O+", organ_available: "Pancreas", location: "Essen", hospital: "University Hospital Cologne", tissue_type: "HLA-A2", age: 53, donation_date: "2025-02-11", organ_condition: "Excellent" },
    { donor_id: "D0022", blood_type: "O-", organ_available: "Liver", location: "Dortmund", hospital: "University Hospital Cologne", tissue_type: "HLA-B8", age: 62, donation_date: "2025-03-01", organ_condition: "Good" },
    { donor_id: "D0023", blood_type: "A-", organ_available: "Liver", location: "Hamburg", hospital: "University Hospital Munich", tissue_type: "HLA-DR2", age: 64, donation_date: "2025-02-17", organ_condition: "Excellent" },
    { donor_id: "D0024", blood_type: "A+", organ_available: "Pancreas", location: "Dortmund", hospital: "University Hospital Munich", tissue_type: "HLA-B8", age: 38, donation_date: "2025-02-10", organ_condition: "Fair" },
    { donor_id: "D0025", blood_type: "B-", organ_available: "Pancreas", location: "Düsseldorf", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-DR1", age: 49, donation_date: "2025-02-08", organ_condition: "Fair" },
    { donor_id: "D0026", blood_type: "B-", organ_available: "Pancreas", location: "Stuttgart", hospital: "Frankfurt University Hospital", tissue_type: "HLA-A2", age: 20, donation_date: "2025-02-14", organ_condition: "Good" },
    { donor_id: "D0027", blood_type: "O-", organ_available: "Kidney", location: "Cologne", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-A2", age: 60, donation_date: "2025-03-06", organ_condition: "Fair" },
    { donor_id: "D0028", blood_type: "AB-", organ_available: "Pancreas", location: "Frankfurt", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-DR1", age: 22, donation_date: "2025-02-14", organ_condition: "Excellent" },
    { donor_id: "D0029", blood_type: "AB-", organ_available: "Liver", location: "Cologne", hospital: "University Hospital Munich", tissue_type: "HLA-B7", age: 39, donation_date: "2025-02-14", organ_condition: "Fair" },
    { donor_id: "D0030", blood_type: "AB-", organ_available: "Pancreas", location: "Hamburg", hospital: "University Hospital Cologne", tissue_type: "HLA-A1", age: 46, donation_date: "2025-02-26", organ_condition: "Excellent" },
    { donor_id: "D0031", blood_type: "B+", organ_available: "Kidney", location: "Frankfurt", hospital: "University Hospital Cologne", tissue_type: "HLA-DR2", age: 54, donation_date: "2025-03-02", organ_condition: "Excellent" },
    { donor_id: "D0032", blood_type: "A-", organ_available: "Liver", location: "Berlin", hospital: "University Hospital Cologne", tissue_type: "HLA-B7", age: 48, donation_date: "2025-03-09", organ_condition: "Fair" },
    { donor_id: "D0033", blood_type: "O+", organ_available: "Kidney", location: "Stuttgart", hospital: "Frankfurt University Hospital", tissue_type: "HLA-A2", age: 39, donation_date: "2025-02-15", organ_condition: "Excellent" },
    { donor_id: "D0034", blood_type: "A+", organ_available: "Lung", location: "Leipzig", hospital: "University Hospital Cologne", tissue_type: "HLA-A1", age: 59, donation_date: "2025-02-21", organ_condition: "Excellent" },
    { donor_id: "D0035", blood_type: "A+", organ_available: "Pancreas", location: "Berlin", hospital: "Charité Hospital", tissue_type: "HLA-A1", age: 40, donation_date: "2025-02-21", organ_condition: "Good" },
    { donor_id: "D0036", blood_type: "B-", organ_available: "Liver", location: "Berlin", hospital: "University Hospital Cologne", tissue_type: "HLA-B8", age: 33, donation_date: "2025-03-04", organ_condition: "Excellent" },
    { donor_id: "D0037", blood_type: "O-", organ_available: "Kidney", location: "Dortmund", hospital: "Charité Hospital", tissue_type: "HLA-DR1", age: 19, donation_date: "2025-02-10", organ_condition: "Fair" },
    { donor_id: "D0038", blood_type: "B-", organ_available: "Kidney", location: "Cologne", hospital: "Frankfurt University Hospital", tissue_type: "HLA-A1", age: 21, donation_date: "2025-02-19", organ_condition: "Fair" },
    { donor_id: "D0039", blood_type: "B+", organ_available: "Liver", location: "Leipzig", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-B7", age: 46, donation_date: "2025-02-19", organ_condition: "Fair" },
    { donor_id: "D0040", blood_type: "O-", organ_available: "Pancreas", location: "Stuttgart", hospital: "University Hospital Cologne", tissue_type: "HLA-A1", age: 22, donation_date: "2025-03-09", organ_condition: "Excellent" },
    { donor_id: "D0041", blood_type: "B+", organ_available: "Liver", location: "Berlin", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-DR2", age: 58, donation_date: "2025-03-07", organ_condition: "Good" },
    { donor_id: "D0042", blood_type: "A-", organ_available: "Pancreas", location: "Hamburg", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-B7", age: 60, donation_date: "2025-02-15", organ_condition: "Fair" },
    { donor_id: "D0043", blood_type: "A-", organ_available: "Kidney", location: "Hamburg", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-B8", age: 39, donation_date: "2025-02-16", organ_condition: "Excellent" },
    { donor_id: "D0044", blood_type: "O-", organ_available: "Pancreas", location: "Leipzig", hospital: "Frankfurt University Hospital", tissue_type: "HLA-B7", age: 52, donation_date: "2025-02-10", organ_condition: "Fair" },
    { donor_id: "D0045", blood_type: "O+", organ_available: "Heart", location: "Cologne", hospital: "University Hospital Cologne", tissue_type: "HLA-DR2", age: 34, donation_date: "2025-02-10", organ_condition: "Fair" },
    { donor_id: "D0046", blood_type: "AB+", organ_available: "Pancreas", location: "Munich", hospital: "Hamburg-Eppendorf University Hospital", tissue_type: "HLA-B7", age: 41, donation_date: "2025-03-08", organ_condition: "Fair" },
    { donor_id: "D0047", blood_type: "AB-", organ_available: "Pancreas", location: "Cologne", hospital: "University Hospital Munich", tissue_type: "HLA-DR1", age: 47, donation_date: "2025-02-24", organ_condition: "Good" },
    { donor_id: "D0048", blood_type: "O-", organ_available: "Liver", location: "Hamburg", hospital: "University Hospital Cologne", tissue_type: "HLA-B7", age: 38, donation_date: "2025-02-07", organ_condition: "Good" },
    { donor_id: "D0049", blood_type: "A+", organ_available: "Heart", location: "Düsseldorf", hospital: "University Hospital Munich", tissue_type: "HLA-B7", age: 25, donation_date: "2025-02-12", organ_condition: "Good" }
];

// Function to calculate days since donation
export const getDaysSinceDonation = (donationDate: string): number => {
    const donation = new Date(donationDate);
    const today = new Date();
    const differenceInTime = today.getTime() - donation.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
};

// Calculate organ viability status based on organ type and condition
export const getOrganViabilityStatus = (donor: OrganDonor): { 
    hoursRemaining: number; 
    percentRemaining: number; 
    isUrgent: boolean;
    urgencyLevel: string;
    daysRemaining: number;
} => {
    const daysSinceDonation = getDaysSinceDonation(donor.donation_date);
    
    // Define max days of viability based on organ type and condition
    const maxViabilityDays: Record<string, Record<string, number>> = {
        Heart: {
            Excellent: 4,
            Good: 3,
            Fair: 2,
            Poor: 1
        },
        Lung: {
            Excellent: 5,
            Good: 3,
            Fair: 2,
            Poor: 1
        },
        Liver: {
            Excellent: 12,
            Good: 8,
            Fair: 6,
            Poor: 3
        },
        Kidney: {
            Excellent: 30,
            Good: 20,
            Fair: 15,
            Poor: 7
        },
        Pancreas: {
            Excellent: 12,
            Good: 8,
            Fair: 5,
            Poor: 2
        }
    };
    
    const organType = donor.organ_available;
    const condition = donor.organ_condition;
    
    // Get max days for this organ and condition (default to 5 days if not found)
    const maxDays = maxViabilityDays[organType]?.[condition] || 5;
    
    // Calculate days remaining
    const daysRemaining = Math.max(0, maxDays - daysSinceDonation);
    
    // Calculate hours remaining
    const hoursRemaining = daysRemaining * 24;
    
    // Calculate percentage remaining
    const percentRemaining = Math.floor((daysRemaining / maxDays) * 100);
    
    // Determine urgency level
    let urgencyLevel = 'Low';
    if (percentRemaining < 25) {
        urgencyLevel = 'High';
    } else if (percentRemaining < 50) {
        urgencyLevel = 'Medium';
    } else {
        urgencyLevel = 'Low';
    }
    
    // Determine if urgent (less than 25% time remaining)
    const isUrgent = percentRemaining < 25;
    
    return {
        hoursRemaining,
        percentRemaining,
        isUrgent,
        urgencyLevel,
        daysRemaining
    };
};

// Find potential patient matches for a donor
export const getPotentialMatches = (donor: OrganDonor, patients: any[]): any[] => {
    return patients.filter(patient => 
        patient.organNeeded.toLowerCase() === donor.organ_available.toLowerCase() &&
        isBloodTypeCompatible(donor.blood_type, patient.bloodType)
    );
};

// Simple blood type compatibility check
export const isBloodTypeCompatible = (donorBloodType: string, recipientBloodType: string): boolean => {
    // This is a simplified version - real compatibility is more complex
    const compatibility: Record<string, string[]> = {
        'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Universal donor
        'O+': ['O+', 'A+', 'B+', 'AB+'],
        'A-': ['A-', 'A+', 'AB-', 'AB+'],
        'A+': ['A+', 'AB+'],
        'B-': ['B-', 'B+', 'AB-', 'AB+'],
        'B+': ['B+', 'AB+'],
        'AB-': ['AB-', 'AB+'],
        'AB+': ['AB+'] // Universal recipient
    };
    
    return compatibility[donorBloodType]?.includes(recipientBloodType) || false;
};

// Calculate match score between donor and patient
export const calculateMatchScore = (donor: OrganDonor, patient: any): number => {
    if (!isBloodTypeCompatible(donor.blood_type, patient.bloodType)) {
        return 0; // Not compatible
    }
    
    let score = 50; // Base score for blood type compatibility
    
    // Add points for tissue type matching (simplified HLA matching)
    if (patient.hlaTyping && patient.hlaTyping.includes(donor.tissue_type)) {
        score += 20;
    }
    
    // Add points for organ condition
    if (donor.organ_condition === 'Excellent') {
        score += 15;
    } else if (donor.organ_condition === 'Good') {
        score += 10;
    } else if (donor.organ_condition === 'Fair') {
        score += 5;
    }
    
    return Math.min(100, score); // Cap at 100
};
