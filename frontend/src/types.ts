export type Role = 'ROLE_CUSTOMER' | 'ROLE_ADMIN';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: Role;
}

export type TestStatus = 'PENDING' | 'SAMPLE_COLLECTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'FAILED';
export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface Test {
  id: number;
  testTypeName: string;
  user: User;
  sampleCode: string;
  status: TestStatus;
  createdAt: string;
  resultData?: string;
}

export interface Appointment {
  id: number;
  user: User;
  testTypeName: string;
  appointmentDate: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
} 