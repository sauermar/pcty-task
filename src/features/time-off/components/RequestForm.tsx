import React from 'react';
import { IonSelect, IonSelectOption, IonTextarea, IonButton } from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, DatePickerField } from '../../../components/ui';
import { requestFormSchema, type RequestFormValues } from '../validation';
import { useTimeOffStore } from '../../../store/useTimeOffStore';

interface RequestFormProps {
  onSuccess?: () => void;
}

export const RequestForm: React.FC<RequestFormProps> = ({ onSuccess }) => {
  const { createRequest } = useTimeOffStore();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      type: 'vacation',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      notes: '',
    },
  });

  const startDateValue = watch('startDate');

  const onSubmit = (values: RequestFormValues) => {
    createRequest({
      type: values.type,
      startDate: values.startDate,
      endDate: values.endDate,
      notes: values.notes?.trim() || undefined,
    });
    reset();
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <FormField label="Leave Type" required error={errors.type?.message}>
            <IonSelect
              value={field.value}
              interface="action-sheet"
              onIonChange={(e) => field.onChange(e.detail.value)}
              style={{
                width: '100%',
                background: '#fff',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #ddd',
              }}
            >
              <IonSelectOption value="vacation">Vacation</IonSelectOption>
              <IonSelectOption value="sick">Sick Leave</IonSelectOption>
              <IonSelectOption value="personal">Personal Leave</IonSelectOption>
            </IonSelect>
          </FormField>
        )}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <FormField label="Start Date" required error={errors.startDate?.message}>
              <DatePickerField
                id="start-date-trigger"
                value={field.value}
                onChange={field.onChange}
              />
            </FormField>
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <FormField label="End Date" required error={errors.endDate?.message}>
              <DatePickerField
                id="end-date-trigger"
                value={field.value}
                onChange={field.onChange}
                min={startDateValue}
              />
            </FormField>
          )}
        />
      </div>

      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <FormField label="Notes (Optional)" error={errors.notes?.message}>
            <IonTextarea
              value={field.value}
              placeholder="Provide details or coverage context..."
              rows={3}
              maxlength={250}
              autoGrow={false}
              onIonInput={(e) => field.onChange(e.detail.value)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '10px 12px',
                background: '#fff',
                height: '80px',
              }}
            />
          </FormField>
        )}
      />

      <div style={{ marginTop: '20px' }}>
        <IonButton expand="block" type="submit" disabled={isSubmitting} shape="round">
          Submit Request
        </IonButton>
      </div>
    </form>
  );
};