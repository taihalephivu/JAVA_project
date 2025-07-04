export type Role = 'ROLE_ADMIN' | 'ROLE_CUSTOMER' | 'ROLE_GUEST';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: number;
  user: User;
  testTypeName: string;
  appointmentDate: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Test {
  id: number;
  user: User;
  sampleCode: string;
  testTypeName: string;
  status: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestResult {
  id: number;
  test: Test;
  resultData: string;
  interpretation: string;
  recommendations: string;
  performedBy: User;
  performedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: number;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface TestPackage {
  id?: number;
  name: string;
  description: string;
  price: number;
  features: string[];
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
} 