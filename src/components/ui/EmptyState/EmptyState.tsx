import React from 'react';
import { IonIcon, IonText, IonButton } from '@ionic/react';

export interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
      }}
      data-testid="empty-state-container"
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'rgba(var(--ion-color-primary-rgb), 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <IonIcon icon={icon} style={{ fontSize: '36px', color: 'var(--ion-color-primary)' }} />
      </div>
      <IonText>
        <h3 style={{ margin: '0 0 8px', fontWeight: 600 }}>{title}</h3>
      </IonText>
      <IonText color="medium">
        <p style={{ margin: '0 0 20px', fontSize: '0.95rem', maxWidth: '280px' }}>
          {description}
        </p>
      </IonText>
      {actionLabel && onAction && (
        <IonButton fill="outline" size="small" shape="round" onClick={onAction}>
          {actionLabel}
        </IonButton>
      )}
    </div>
  );
};
