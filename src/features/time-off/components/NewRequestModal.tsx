import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from '@ionic/react';
import { RequestForm } from './RequestForm';

interface NewRequestModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSuccess: () => void;
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({
  isOpen,
  onDismiss,
  onSuccess,
}) => {
  const isTablet = window.innerWidth >= 768;

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      className="responsive-modal"
      // Breakpoints only active on mobile; tablet renders as a centered dialog
      breakpoints={isTablet ? undefined : [0, 0.9, 1.0]}
      initialBreakpoint={isTablet ? undefined : 0.9}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Request Time Off</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss} color="medium">
              Cancel
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <RequestForm onSuccess={onSuccess} />
      </IonContent>
    </IonModal>
  );
};