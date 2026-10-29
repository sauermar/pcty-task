import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonNote,
} from '@ionic/react';
import {
  calendarClearOutline,
  briefcaseOutline,
  medkitOutline,
  personOutline,
  chatbubbleOutline,
} from 'ionicons/icons';
import type { TimeOffRequest, TimeOffType } from '../../../features/time-off/types';
import { StatusBadge } from '../../../components/ui';

interface RequestCardProps {
  request: TimeOffRequest;
  isSupervisorView?: boolean;
  onReview?: (request: TimeOffRequest) => void;
}

const typeIconMap: Record<TimeOffType, string> = {
  vacation: briefcaseOutline,
  sick: medkitOutline,
  personal: personOutline,
};

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  isSupervisorView = false,
  onReview,
}) => {
  const formattedDates = `${request.startDate} → ${request.endDate}`;
  const icon = typeIconMap[request.type] || briefcaseOutline;

  return (
    <IonCard style={{ margin: '12px 0', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <IonItem lines="none" style={{ '--padding-start': '16px', '--padding-end': '16px', paddingTop: '8px' }}>
        <IonIcon icon={icon} slot="start" color="primary" style={{ fontSize: '24px' }} />
        <IonLabel>
          <h2 style={{ fontWeight: 700, textTransform: 'capitalize', fontSize: '1.05rem', margin: 0 }}>
            {request.type} Leave
          </h2>
          {isSupervisorView && (
            <p style={{ fontSize: '0.85rem', color: 'var(--ion-color-step-600)' }}>
              Requested by: <strong>{request.employeeName}</strong>
            </p>
          )}
        </IonLabel>
        <StatusBadge status={request.status} size="small" />
      </IonItem>

      <IonCardContent style={{ paddingTop: '4px', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <IonIcon icon={calendarClearOutline} color="medium" style={{ fontSize: '16px' }} />
          <IonNote style={{ fontSize: '0.9rem', fontWeight: 500 }}>{formattedDates}</IonNote>
        </div>

        {request.notes && (
          <p style={{ margin: '6px 0', fontSize: '0.9rem', color: '#333' }}>
            "{request.notes}"
          </p>
        )}

        {request.supervisorNote && (
          <div
            style={{
              marginTop: '10px',
              padding: '8px 12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              borderLeft: '3px solid var(--ion-color-step-400)',
              display: 'flex',
              gap: '6px',
            }}
          >
            <IonIcon icon={chatbubbleOutline} style={{ fontSize: '14px', marginTop: '3px' }} color="medium" />
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#555' }}>
              <strong>Supervisor:</strong> {request.supervisorNote}
            </p>
          </div>
        )}

        {/* Visible on Mobile (< 768px) AND Intermediate (768px-1023px). 
            Hidden on Large (>= 1024px) where the detail panel is visible */}
        {isSupervisorView && request.status === 'pending' && onReview && (
          <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
            <IonButton
              size="small"
              shape="round"
              fill="solid"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                onReview(request);
              }}
            >
              Review Request
            </IonButton>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};