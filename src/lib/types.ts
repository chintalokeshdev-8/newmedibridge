export type Doctor = {
  id: string;
  name: string;
  specialty: string;
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
  doctor: Pick<Doctor, 'name' | 'specialty'>;
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
