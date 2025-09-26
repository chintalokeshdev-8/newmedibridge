
import type { Doctor, Lab, Appointment, User, Patient } from './types';

export const doctors: Doctor[] = [
  { id: 'D001', name: 'Dr. Emily Carter', firstName: 'Emily', lastName: 'Carter', email: 'emily.carter@medibridge.app', medicalCouncilNumber: 'MCI12345', department: 'Cardiology', successfulSurgeries: 150, mainFocus: 'Interventional Cardiology', hospitalName: 'City General Hospital', status: 'Active', avatarUrl: 'https://picsum.photos/seed/doc1/200/200' },
  { id: 'D002', name: 'Dr. Ben Adams', firstName: 'Ben', lastName: 'Adams', email: 'ben.adams@medibridge.app', medicalCouncilNumber: 'MCI67890', department: 'Neurology', successfulSurgeries: 80, mainFocus: 'Epilepsy', hospitalName: 'City General Hospital', status: 'Active', avatarUrl: 'https://picsum.photos/seed/doc2/200/200' },
  { id: 'D003', name: 'Dr. Chloe Taylor', firstName: 'Chloe', lastName: 'Taylor', email: 'chloe.taylor@medibridge.app', medicalCouncilNumber: 'MCI13579', department: 'Pediatrics', successfulSurgeries: 200, mainFocus: 'Neonatology', hospitalName: 'Sunrise Children\'s Hospital', status: 'Inactive', avatarUrl: 'https://picsum.photos/seed/doc3/200/200' },
  { id: 'D004', name: 'Dr. Marcus Chen', firstName: 'Marcus', lastName: 'Chen', email: 'marcus.chen@medibridge.app', medicalCouncilNumber: 'MCI24680', department: 'Orthopedics', successfulSurgeries: 120, mainFocus: 'Spine Surgery', hospitalName: 'City General Hospital', status: 'Active', avatarUrl: 'https://picsum.photos/seed/doc4/200/200' },
  { id: 'D005', name: 'Dr. Sofia Garcia', firstName: 'Sofia', lastName: 'Garcia', email: 'sofia.garcia@medibridge.app', medicalCouncilNumber: 'MCI98765', department: 'Cardiology', successfulSurgeries: 95, mainFocus: 'Heart Failure', hospitalName: 'City General Hospital', status: 'Active', avatarUrl: 'https://picsum.photos/seed/doc5/200/200' },
];

export const labs: Lab[] = [
  { id: 'L001', name: 'Central Pathology Lab', service: 'Blood Tests', location: 'Wing A, Floor 2', status: 'Open' },
  { id: 'L002', name: 'Radiology Associates', service: 'X-Rays, MRI', location: 'Wing B, Floor 1', status: 'Open' },
  { id: 'L003', name: 'Genetic Diagnostics', service: 'DNA Sequencing', location: 'Wing C, Floor 3', status: 'Closed' },
  { id: 'L004', name: 'Microbiology Lab', service: 'Culture & Sensitivity', location: 'Wing A, Floor 2', status: 'Open' },
];

export const appointments: Appointment[] = [
  { id: 'A001', patientName: 'John Smith', doctor: { name: 'Dr. Emily Carter', department: 'Cardiology' }, date: '2024-08-15', time: '10:00 AM', status: 'Scheduled' },
  { id: 'A002', patientName: 'Jane Doe', doctor: { name: 'Dr. Ben Adams', department: 'Neurology' }, date: '2024-08-15', time: '11:30 AM', status: 'Scheduled' },
  { id: 'A003', patientName: 'Peter Jones', doctor: { name: 'Dr. Marcus Chen', department: 'Orthopedics' }, date: '2024-08-16', time: '09:00 AM', status: 'Completed' },
  { id: 'A004', patientName: 'Mary Williams', doctor: { name: 'Dr. Emily Carter', department: 'Cardiology' }, date: '2024-08-16', time: '02:00 PM', status: 'Canceled' },
  { id: 'A005', patientName: 'David Brown', doctor: { name: 'Dr. Chloe Taylor', department: 'Pediatrics' }, date: '2024-08-17', time: '03:00 PM', status: 'Scheduled' },
  { id: 'A006', patientName: 'Lokesh Babu', doctor: { name: 'Dr. Sofia Garcia', department: 'Cardiology' }, date: '2024-08-18', time: '10:00 AM', status: 'Scheduled' },
  { id: 'A007', patientName: 'Ashok Kumar', doctor: { name: 'Dr. Ben Adams', department: 'Neurology' }, date: '2024-08-18', time: '11:00 AM', status: 'Scheduled' },
  // Adding past completed appointments for more realistic "Last Visit" data
  { id: 'A008', patientName: 'John Smith', doctor: { name: 'Dr. Emily Carter', department: 'Cardiology' }, date: '2024-07-10', time: '10:00 AM', status: 'Completed' },
  { id: 'A009', patientName: 'Jane Doe', doctor: { name: 'Dr. Ben Adams', department: 'Neurology' }, date: '2024-07-12', time: '11:30 AM', status: 'Completed' },
  { id: 'A010', patientName: 'Lokesh Babu', doctor: { name: 'Dr. Sofia Garcia', department: 'Cardiology' }, date: '2024-07-18', time: '10:00 AM', status: 'Completed' },
];


export const users: User[] = [
  { id: 'U001', name: 'Admin User', role: 'Admin', email: 'admin@medibridge.app', status: 'Active' },
  { id: 'U002', name: 'Dr. Emily Carter', role: 'Doctor', email: 'emily.carter@medibridge.app', status: 'Active' },
  { id: 'U003', name: 'Lab Tech', role: 'Lab Staff', email: 'lab.tech@medibridge.app', status: 'Active' },
  { id: 'U004', name: 'Dr. Ben Adams', role: 'Doctor', email: 'ben.adams@medibridge.app', status: 'Inactive' },
];

export const patients: Patient[] = [
    {
        id: 'P001',
        token: 'T001',
        name: 'John Smith',
        age: 45,
        gender: 'Male',
        bloodGroup: 'O+',
        lastVisit: '2024-07-10', // Corrected last visit
        primaryDoctorId: 'D001',
        pin: '1234',
        activeConditions: ['Hypertension', 'Type 2 Diabetes'],
        currentMedications: ['Lisinopril', 'Metformin'],
        appointments: [
            { id: 'A001', patientName: 'John Smith', doctor: { name: 'Dr. Emily Carter', department: 'Cardiology' }, date: '2024-08-15', time: '10:00 AM', status: 'Scheduled' },
             { id: 'AP001', patientName: 'John Smith', doctor: { name: 'Dr. Emily Carter', department: 'Cardiology' }, date: '2024-07-10', time: '09:30 AM', status: 'Completed' },
        ],
        prescriptions: [
            { date: '2024-07-10', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', notes: 'Monitor blood pressure.' }
        ],
        labReports: [
            { id: 'R001', testName: 'Complete Blood Count', date: '2024-08-10', status: 'Completed', fileUrl: 'https://picsum.photos/seed/report1/800/1100', amount: 50, amountPaid: 50, paymentStatus: 'Paid', bookingSource: 'Internal' },
            { id: 'R002', testName: 'Lipid Panel', date: '2024-08-10', status: 'Completed', fileUrl: 'https://picsum.photos/seed/report2/800/1100', amount: 75, amountPaid: 75, paymentStatus: 'Paid', bookingSource: 'Internal' },
            { id: 'R003', testName: 'HbA1c', date: '2024-08-12', status: 'Pending', amount: 60, amountPaid: 0, paymentStatus: 'Pending', bookingSource: 'Internal' },
        ]
    },
    {
        id: 'P002',
        token: 'T002',
        name: 'Jane Doe',
        age: 34,
        gender: 'Female',
        bloodGroup: 'A-',
        lastVisit: '2024-07-12', // Corrected last visit
        primaryDoctorId: 'D002',
        pin: '1234',
        activeConditions: ['Migraine'],
        currentMedications: ['Sumatriptan'],
        appointments: [
            { id: 'A002', patientName: 'Jane Doe', doctor: { name: 'Dr. Ben Adams', department: 'Neurology' }, date: '2024-08-15', time: '11:30 AM', status: 'Scheduled' },
        ],
        prescriptions: [
            { date: '2024-08-01', medication: 'Sumatriptan 50mg', dosage: 'As needed for migraine', notes: 'Do not exceed 2 doses in 24 hours.' }
        ],
        labReports: [
            { id: 'R004', testName: 'Brain MRI', date: '2024-07-20', status: 'Completed', fileUrl: 'https://picsum.photos/seed/report3/800/1100', amount: 500, amountPaid: 500, paymentStatus: 'Paid', bookingSource: 'Internal' },
            { id: 'R005', testName: 'TSH', date: '2024-08-05', status: 'Completed', fileUrl: 'https://picsum.photos/seed/report4/800/1100', amount: 40, amountPaid: 20, paymentStatus: 'Partial', bookingSource: 'Online' },
            { id: 'R006', testName: 'Vitamin D Level', date: '2024-08-14', status: 'Pending', amount: 45, amountPaid: 0, paymentStatus: 'Pending', bookingSource: 'Online' },
        ]
    },
    {
        id: 'P003',
        token: 'T003',
        name: 'Lokesh Babu',
        age: 62,
        gender: 'Male',
        bloodGroup: 'B+',
        lastVisit: '2024-07-18', // Corrected last visit
        primaryDoctorId: 'D005',
        pin: '1234',
        activeConditions: ['Coronary Artery Disease'],
        currentMedications: ['Aspirin', 'Atorvastatin'],
        appointments: [
            { id: 'A006', patientName: 'Lokesh Babu', doctor: { name: 'Dr. Sofia Garcia', department: 'Cardiology' }, date: '2024-08-18', time: '10:00 AM', status: 'Scheduled' },
        ],
        prescriptions: [],
        labReports: [
            { id: 'R007', testName: 'Echocardiogram', date: '2024-08-10', status: 'Completed', fileUrl: 'https://picsum.photos/seed/report5/800/1100', amount: 250, amountPaid: 250, paymentStatus: 'Paid', bookingSource: 'Internal' },
            { id: 'R008', testName: 'Troponin-I', date: '2024-08-18', status: 'Pending', amount: 80, amountPaid: 80, paymentStatus: 'Paid', bookingSource: 'Internal' },
        ]
    },
    {
        id: 'P004',
        token: 'T004',
        name: 'Ashok Kumar',
        age: 55,
        gender: 'Male',
        bloodGroup: 'AB+',
        lastVisit: '2024-08-01', // Example last visit
        primaryDoctorId: 'D002',
        pin: '1234',
        activeConditions: ['Parkinson\'s Disease'],
        currentMedications: ['Levodopa'],
        appointments: [
             { id: 'A007', patientName: 'Ashok Kumar', doctor: { name: 'Dr. Ben Adams', department: 'Neurology' }, date: '2024-08-18', time: '11:00 AM', status: 'Scheduled' },
        ],
        prescriptions: [],
        labReports: [
             { id: 'R009', testName: 'DaTscan', date: '2024-08-11', status: 'Completed', fileUrl: 'https://picsum.photos/seed/report6/800/1100', amount: 1200, amountPaid: 1200, paymentStatus: 'Paid', bookingSource: 'Internal' }
        ]
    },
    {
        id: 'P005',
        token: 'T005',
        name: 'Sathyam',
        age: 48,
        gender: 'Male',
        bloodGroup: 'A+',
        lastVisit: '2024-07-25', // Example last visit
        primaryDoctorId: 'D004',
        pin: '1234',
        activeConditions: ['Osteoarthritis'],
        currentMedications: ['NSAIDs'],
        appointments: [],
        prescriptions: [],
        labReports: [
            { id: 'R010', testName: 'Knee X-Ray', date: '2024-08-14', status: 'Pending', amount: 120, amountPaid: 0, paymentStatus: 'Pending', bookingSource: 'Online' },
        ]
    },
     {
        id: 'P006',
        token: 'T006',
        name: 'Nageswarao',
        age: 71,
        gender: 'Male',
        bloodGroup: 'O-',
        lastVisit: '2024-08-05',
        primaryDoctorId: 'D001',
        pin: '1234',
        activeConditions: ['Atrial Fibrillation'],
        currentMedications: ['Warfarin'],
        appointments: [],
        prescriptions: [],
        labReports: [
            { id: 'R011', testName: 'INR', date: new Date().toISOString().split('T')[0], status: 'Completed', fileUrl: 'https://picsum.photos/seed/report7/800/1100', amount: 30, amountPaid: 30, paymentStatus: 'Paid', bookingSource: 'Internal' },
            { id: 'R012', testName: 'ECG', date: '2024-08-19', status: 'Pending', amount: 150, amountPaid: 150, paymentStatus: 'Paid', bookingSource: 'Online' },
        ]
    },
    {
        id: 'P007',
        token: 'T007',
        name: 'Mahesh',
        age: 30,
        gender: 'Male',
        bloodGroup: 'B-',
        lastVisit: '2024-08-02',
        primaryDoctorId: 'D004',
        pin: '1234',
        activeConditions: ['ACL Tear'],
        currentMedications: [],
        appointments: [],
        prescriptions: [],
        labReports: [
            { id: 'R013', testName: 'Knee MRI', date: new Date().toISOString().split('T')[0], status: 'Completed', fileUrl: 'https://picsum.photos/seed/report8/800/1100', amount: 600, amountPaid: 600, paymentStatus: 'Paid', bookingSource: 'Online' }
        ]
    }
];
