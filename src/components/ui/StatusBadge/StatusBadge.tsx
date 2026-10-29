import React from 'react';
import { IonBadge } from '@ionic/react';
import type { RequestStatus, StatusBadgeProps } from './StatusBadge.types';

const statusConfig: Record<RequestStatus, { color: string; label: string }> = {
  pending: { color: 'warning', label: 'Pending' },
  approved: { color: 'success', label: 'Approved' },
  rejected: { color: 'danger', label: 'Rejected' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'default' }) => {
  const config = statusConfig[status] || statusConfig.pending;
  const isSmall = size === 'small';

  return (
    <IonBadge
      color={config.color}
      data-testid={`badge-${status}`}
      style={{
        padding: isSmall ? '3px 8px' : '5px 10px',
        borderRadius: '12px',
        fontSize: isSmall ? '0.72rem' : '0.82rem',
        fontWeight: '600',
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        display: 'inline-block',
      }}
    >
      {config.label}
    </IonBadge>
  );
};