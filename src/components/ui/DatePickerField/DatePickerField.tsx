import React, { useRef } from 'react';
import { IonIcon, IonDatetime, IonPopover } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';

interface DatePickerFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  id,
  value,
  onChange,
  min,
}) => {
  const popoverRef = useRef<HTMLIonPopoverElement>(null);

  const formattedDate = value
    ? new Date(value + 'T00:00:00').toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Select date';

  return (
    <>
      <div
        id={id}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          background: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '0.95rem',
          userSelect: 'none',
          marginTop: '6px',
          minHeight: '48px',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s ease',
        }}
      >
        <span style={{ color: value ? '#1f2937' : '#9ca3af', fontWeight: 500 }}>
          {formattedDate}
        </span>
        <IonIcon icon={calendarOutline} color="primary" style={{ fontSize: '20px' }} />
      </div>

      <IonPopover
        trigger={id}
        ref={popoverRef}
        alignment="center"
        keepContentsMounted
        style={{ '--width': '340px' }}
      >
        <div style={{ padding: '8px' }}>
          <IonDatetime
            presentation="date"
            value={value}
            min={min}
            showDefaultButtons={true}
            doneText="Confirm"
            cancelText="Cancel"
            onIonChange={(e) => {
              if (e.detail.value) {
                const selected = String(e.detail.value).split('T')[0];
                onChange(selected);
                popoverRef.current?.dismiss();
              }
            }}
            onIonCancel={() => {
              popoverRef.current?.dismiss();
            }}
          />
        </div>
      </IonPopover>
    </>
  );
};