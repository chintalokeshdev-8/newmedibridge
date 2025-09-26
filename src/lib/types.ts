export type Doctor = {
  id: string;
  name: string;
  firstName: string;
  lastName:string;
  email: string;
  phoneNumber?: string;
  medicalCouncilNumber: string;
  department: string;
  successfulSurgeries: number;
  mainFocus: string;
  hospitalName: string;
  status: 'Active' | 'Inactive';
  avatarUrl: string;
};

export type Lab = {
  id: string;
  name: string;
  service: string;
  location: string;
  status: 'Open' | 'Closed';
};

export type Appointment = {
  id: string;
  patientName: string;
  doctor: Pick<Doctor, 'name' | 'department'>;
  time: string;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Canceled';
};

export type User = {
  id: string;
  name: string;
  role: 'Admin' | 'Doctor' | 'Lab Staff';
  email: string;
  status: 'Active' | 'Inactive';
};

export type Prescription = {
    date: string;
    medication: string;
    dosage: string;
    notes: string;
};

export type LabReport = {
    id: string;
    testName: string;
    date: string;
    status: 'Pending' | 'Completed' | 'Canceled';
    fileUrl?: string;
    amount?: number;
    amountPaid?: number;
    paymentStatus?: 'Paid' | 'Pending' | 'Partial';
}

export type Patient = {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    bloodGroup: string;
    phoneNumber?: string;
    lastVisit: string;
    primaryDoctorId: string;
    pin: string;
    activeConditions: string[];
    currentMedications: string[];
    appointments: Appointment[];
    prescriptions: Prescription[];
    labReports: LabReport[];
};
