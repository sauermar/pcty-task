export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface StatusBadgeProps {
  status: RequestStatus;
  size?: 'small' | 'default';
}
