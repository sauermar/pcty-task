import React from 'react';
import { IonNote } from '@ionic/react';

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, required, children }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '0.88rem',
          fontWeight: 600,
          color: 'var(--ion-color-step-700, #444)',
          marginBottom: '6px',
        }}
      >
        {label} {required && <span style={{ color: 'var(--ion-color-danger)' }}>*</span>}
      </label>
      {children}
      {error && (
        <IonNote
          color="danger"
          style={{
            display: 'block',
            fontSize: '0.78rem',
            marginTop: '4px',
            marginLeft: '4px',
          }}
        >
          {error}
        </IonNote>
      )}
    </div>
  );
};