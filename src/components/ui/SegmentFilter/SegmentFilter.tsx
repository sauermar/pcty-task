import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentFilterProps<T extends string> {
  value: T;
  options: FilterOption<T>[];
  onChange: (value: T) => void;
}

export function SegmentFilter<T extends string>({
  value,
  options,
  onChange,
}: SegmentFilterProps<T>) {
  return (
    <div style={{ padding: '8px 16px', background: '#fff' }}>
      <IonSegment
        value={value}
        onIonChange={(e) => {
          if (e.detail.value) {
            onChange(e.detail.value as T);
          }
        }}
      >
        {options.map((opt) => (
          <IonSegmentButton key={opt.value} value={opt.value} style={{ color: '#000' }}>
            <IonLabel>{opt.label}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>
    </div>
  );
}
