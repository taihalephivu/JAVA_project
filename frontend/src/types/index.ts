// User types
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

export enum Role {
  ROLE_GUEST = 'ROLE_GUEST',
  ROLE_CUSTOMER = 'ROLE_CUSTOMER',
  ROLE_STAFF = 'ROLE_STAFF',
  ROLE_MANAGER = 'ROLE_MANAGER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}

// Test types
export interface Test {
  id: number;
  testType: TestType;
  user: User;
  sampleCode: string;
  sampleCollectionDate?: string;
  expectedCompletionDate?: string;
  actualCompletionDate?: string;
  status: TestStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TestType {
  id: number;
  name: string;
  description: string;
  price: number;
  processingTime: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum TestStatus {
  PENDING = 'PENDING',
  SAMPLE_COLLECTED = 'SAMPLE_COLLECTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

// Test Result types
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

// Appointment types
export interface Appointment {
  id: number;
  user: User;
  testType: TestType;
  appointmentDate: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

// Auth types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Dashboard DTO
export interface CustomerDashboardDTO {
  totalTests: number;
  pendingTests: number;
  completedTests: number;
  totalAppointments: number;
  todayAppointments: number;
  totalSpent: number;
  recentTests: Test[];
  upcomingAppointments: Appointment[];
} 