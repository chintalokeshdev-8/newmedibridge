import type { Doctor, Lab, Appointment, User } from './types';

export const doctors: Doctor[] = [
  { id: 'D001', name: 'Dr. Emily Carter', specialty: 'Cardiology', status: 'Active', avatarUrl: 'https://picsum.photos/seed/doc1/200/200' },
  { id: 'D002', name: 'Dr. Ben Adams', specialty: 'Neurology', status: 'Active', avatarUrl: 'https://picsum.photos/seed/doc2/200/200' },
  { id: 'D003', name: 'Dr. Chloe Taylor', specialty: 'Pediatrics', status: 'Inactive', avatarUrl: 'https://picsum.photos/seed/doc3/200/200' },
  { id: 'D004', name: 'Dr. Marcus Chen', specialty: 'Orthopedics', status: 'Active', avatarUrl: 'https://picsum.photos/seed/doc4/200/200' },
];

export const labs: Lab[] = [
  { id: 'L001', name: 'Central Pathology Lab', service: 'Blood Tests', location: 'Wing A, Floor 2', status: 'Open' },
  { id: 'L002', name: 'Radiology Associates', service: 'X-Rays, MRI', location: 'Wing B, Floor 1', status: 'Open' },
  { id: 'L003', name: 'Genetic Diagnostics', service: 'DNA Sequencing', location: 'Wing C, Floor 3', status: 'Closed' },
  { id: 'L004', name: 'Microbiology Lab', service: 'Culture & Sensitivity', location: 'Wing A, Floor 2', status: 'Open' },
];

export const appointments: Appointment[] = [
  { id: 'A001', patientName: 'John Smith', doctor: { name: 'Dr. Emily Carter', specialty: 'Cardiology' }, date: '2024-08-15', time: '10:00 AM', status: 'Scheduled' },
  { id: 'A002', patientName: 'Jane Doe', doctor: { name: 'Dr. Ben Adams', specialty: 'Neurology' }, date: '2024-08-15', time: '11:30 AM', status: 'Scheduled' },
  { id: 'A003', patientName: 'Peter Jones', doctor: { name: 'Dr. Marcus Chen', specialty: 'Orthopedics' }, date: '2024-08-16', time: '09:00 AM', status: 'Completed' },
  { id: 'A004', patientName: 'Mary Williams', doctor: { name: 'Dr. Emily Carter', specialty: 'Cardiology' }, date: '2024-08-16', time: '02:00 PM', status: 'Canceled' },
  { id: 'A005', patientName: 'David Brown', doctor: { name: 'Dr. Chloe Taylor', specialty: 'Pediatrics' }, date: '2024-08-17', time: '03:00 PM', status: 'Scheduled' },
];

export const users: User[] = [
  { id: 'U001', name: 'Admin User', role: 'Admin', email: 'admin@meditrack.pro', status: 'Active' },
  { id: 'U002', name: 'Dr. Emily Carter', role: 'Doctor', email: 'emily.carter@meditrack.pro', status: 'Active' },
  { id: 'U003', name: 'Lab Tech', role: 'Lab Staff', email: 'lab.tech@meditrack.pro', status: 'Active' },
  { id: 'U004', name: 'Dr. Ben Adams', role: 'Doctor', email: 'ben.adams@meditrack.pro', status: 'Inactive' },
];
