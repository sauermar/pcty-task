import type { RequestStatus } from '../../components/ui';

export type TimeOffType = 'vacation' | 'sick' | 'personal';
export type UserRole = 'employee' | 'supervisor';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface TimeOffRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: TimeOffType;
  startDate: string; // ISO string: 'YYYY-MM-DD'
  endDate: string;   // ISO string: 'YYYY-MM-DD'
  notes?: string;
  status: RequestStatus;
  supervisorNote?: string;
  reviewedBy?: string;
  createdAt: string;
  reviewedAt?: string;
}