import React from 'react';
import { IonButton, IonIcon, IonText } from '@ionic/react';
import { swapHorizontalOutline } from 'ionicons/icons';
import { useTimeOffStore } from '../../store/useTimeOffStore';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setRole } = useTimeOffStore();

  const toggleRole = () => {
    setRole(currentRole === 'employee' ? 'supervisor' : 'employee');
  };

  return (
    <IonButton
      fill="clear"
      size="small"
      onClick={toggleRole}
      style={{
        '--color': 'var(--ion-color-primary)',
        fontSize: '0.85rem',
        textTransform: 'capitalize',
      }}
    >
      <IonIcon slot="start" icon={swapHorizontalOutline} />
      <IonText>Role: <strong>{currentRole}</strong></IonText>
    </IonButton>
  );
};
