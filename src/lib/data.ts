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
        name: 'John Smith',
        age: 45,
        gender: 'Male',
        bloodGroup: 'O+',
        lastVisit: '2024-08-15',
        primaryDoctorId: 'D001',
        activeConditions: ['Hypertension', 'Type 2 Diabetes'],
        currentMedications: ['Lisinopril', 'Metformin'],
        appointments: [
            { id: 'A001', patientName: 'John Smith', doctor: { name: 'Dr. Emily Carter', department: 'Cardiology' }, date: '2024-08-15', time: '10:00 AM', status: 'Scheduled' },
        ],
        prescriptions: [
            { date: '2024-07-10', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', notes: 'Monitor blood pressure.' }
        ]
    },
    {
        id: 'P002',
        name: 'Jane Doe',
        age: 34,
        gender: 'Female',
        bloodGroup: 'A-',
        lastVisit: '2024-08-15',
        primaryDoctorId: 'D002',
        activeConditions: ['Migraine'],
        currentMedications: ['Sumatriptan'],
        appointments: [
            { id: 'A002', patientName: 'Jane Doe', doctor: { name: 'Dr. Ben Adams', department: 'Neurology' }, date: '2024-08-15', time: '11:30 AM', status: 'Scheduled' },
        ],
        prescriptions: [
            { date: '2024-08-01', medication: 'Sumatriptan 50mg', dosage: 'As needed for migraine', notes: 'Do not exceed 2 doses in 24 hours.' }
        ]
    }
];
