import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonTextarea,
  IonIcon,
} from '@ionic/react';
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  calendarClearOutline,
} from 'ionicons/icons';
import type { TimeOffRequest } from '../types';
import { FormField, StatusBadge } from '../../../components/ui';
import { useTimeOffStore } from '../../../store/useTimeOffStore';

interface ReviewRequestModalProps {
  request: TimeOffRequest | null;
  isOpen: boolean;
  onDismiss: () => void;
  onSuccess?: (status: 'approved' | 'rejected') => void;
}

export const ReviewRequestModal: React.FC<ReviewRequestModalProps> = ({
  request,
  isOpen,
  onDismiss,
  onSuccess,
}) => {
  const { reviewRequest } = useTimeOffStore();
  const [note, setNote] = useState('');
  const isTablet = window.innerWidth >= 768;

  if (!request) return null;

  const handleAction = (status: 'approved' | 'rejected') => {
    reviewRequest(request.id, status, note);
    setNote('');
    if (onSuccess) onSuccess(status);
    onDismiss();
  };

  const handleClose = () => {
    setNote('');
    onDismiss();
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={handleClose}
      className="responsive-modal"
      breakpoints={isTablet ? undefined : [0, 0.75, 1.0]}
      initialBreakpoint={isTablet ? undefined : 0.75}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Review Request</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleClose} color="medium">
              Cancel
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
              {request.employeeName}
            </h2>
            <StatusBadge status={request.status} />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              margin: '10px 0 6px',
              color: 'var(--ion-color-step-600)',
              fontSize: '0.92rem',
              fontWeight: 500,
            }}
          >
            <IonIcon icon={calendarClearOutline} color="primary" />
            <span>
              {request.startDate} → {request.endDate}
            </span>
            <span style={{ margin: '0 4px' }}>•</span>
            <span style={{ textTransform: 'capitalize', fontWeight: 700 }}>
              {request.type} Leave
            </span>
          </div>

          {request.notes && (
            <div
              style={{
                marginTop: '12px',
                padding: '12px 14px',
                background: '#f8fafc',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
              }}
            >
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>
                EMPLOYEE NOTE
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '0.92rem', color: '#334155' }}>
                "{request.notes}"
              </p>
            </div>
          )}
        </div>

        <FormField label="Supervisor Feedback / Note (Optional)">
          <IonTextarea
            value={note}
            rows={3}
            autoGrow={false}
            placeholder="Add approval context or reasoning for the employee..."
            onIonInput={(e) => setNote(e.detail.value || '')}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '10px',
              padding: '10px 12px',
              background: '#fff',
              height: '80px',
            }}
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '24px' }}>
          <IonButton
            color="danger"
            fill="outline"
            expand="block"
            shape="round"
            onClick={() => handleAction('rejected')}
          >
            <IonIcon slot="start" icon={closeCircleOutline} />
            Reject
          </IonButton>

          <IonButton
            color="success"
            expand="block"
            shape="round"
            onClick={() => handleAction('approved')}
          >
            <IonIcon slot="start" icon={checkmarkCircleOutline} />
            Approve
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};