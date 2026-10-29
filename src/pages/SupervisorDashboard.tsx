import React, { useState, useMemo, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonTextarea,
  IonBadge,
  IonToast,
} from '@ionic/react';
import {
  shieldCheckmarkOutline,
  calendarClearOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  personCircleOutline,
  chatbubbleEllipsesOutline,
  fileTrayOutline,
} from 'ionicons/icons';
import { useTimeOffStore } from '../store/useTimeOffStore';
import { RequestCard } from '../features/time-off/components/RequestCard';
import { ReviewRequestModal } from '../features/time-off/components/ReviewRequestModal';
import { RoleSwitcher } from '../features/auth/RoleSwitcher';
import { EmptyState, SegmentFilter, StatusBadge, FormField, type FilterOption } from '../components/ui';
import type { TimeOffRequest } from '../features/time-off/types';

type SupervisorFilter = 'pending' | 'reviewed' | 'all';

const supervisorFilterOptions: FilterOption<SupervisorFilter>[] = [
  { value: 'pending', label: 'To Review' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'all', label: 'All Requests' },
];

export const SupervisorDashboard: React.FC = () => {
  const { requests, reviewRequest, resetToDefault } = useTimeOffStore();

  const [filter, setFilter] = useState<SupervisorFilter>('pending');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [mobileModalRequest, setMobileModalRequest] = useState<TimeOffRequest | null>(null);
  const [supervisorNote, setSupervisorNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (filter === 'pending') return r.status === 'pending';
      if (filter === 'reviewed') return r.status === 'approved' || r.status === 'rejected';
      return true;
    });
  }, [requests, filter]);

  const counts = useMemo(() => {
    return {
      pending: requests.filter((r) => r.status === 'pending').length,
      reviewed: requests.filter((r) => r.status !== 'pending').length,
      all: requests.length,
    };
  }, [requests]);

  // Active request for the Detail Pane: Defaults to first item if none or invalid
  const activeDetailRequest = useMemo(() => {
    if (filteredRequests.length === 0) return null;
    const found = filteredRequests.find((r) => r.id === selectedRequestId);
    return found || filteredRequests[0];
  }, [filteredRequests, selectedRequestId]);

  // Keep selected ID synchronized with the first item on filter change
  useEffect(() => {
    if (filteredRequests.length > 0) {
      if (!selectedRequestId || !filteredRequests.some((r) => r.id === selectedRequestId)) {
        setSelectedRequestId(filteredRequests[0].id);
      }
    } else {
      setSelectedRequestId(null);
    }
  }, [filter, filteredRequests, selectedRequestId]);

  // Action handler for the tablet Detail Pane
  const handleReviewAction = (status: 'approved' | 'rejected') => {
    if (!activeDetailRequest) return;
    reviewRequest(activeDetailRequest.id, status, supervisorNote);
    setSupervisorNote('');
    setToastMessage(`Request ${status === 'approved' ? 'approved' : 'rejected'} successfully.`);
  };

  return (
    <IonPage>
      <IonHeader translucent className="mobile-only">
        <IonToolbar>
          <IonTitle>Supervisor Hub</IonTitle>
          <IonButtons slot="end">
            <RoleSwitcher />
          </IonButtons>
        </IonToolbar>
        <SegmentFilter
          value={filter}
          options={supervisorFilterOptions}
          onChange={(value) => setFilter(value)}
        />
      </IonHeader>

      <IonContent fullscreen>
        <div className="responsive-app-shell">
          <aside className="tablet-sidebar-nav tablet-only">
            <div className="tablet-sidebar-brand">
              <IonIcon icon={shieldCheckmarkOutline} style={{ fontSize: '24px' }} />
              <span>Supervisor Hub</span>
            </div>

            <ul className="tablet-nav-list">
              {supervisorFilterOptions.map((opt) => (
                <li
                  key={opt.value}
                  className={`tablet-nav-item ${filter === opt.value ? 'active' : ''}`}
                  onClick={() => setFilter(opt.value)}
                >
                  <span className="nav-label">{opt.label}</span>
                  <IonBadge
                    color={filter === opt.value ? 'primary' : 'light'}
                    style={{ fontSize: '0.75rem', borderRadius: '8px', padding: '4px 8px' }}
                  >
                    {counts[opt.value]}
                  </IonBadge>
                </li>
              ))}
            </ul>

            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <RoleSwitcher />
                {/* Added Reset Data button to reset the store to default values just for tablet view */}
                <IonButton
                    onClick={() => {
                        resetToDefault();
                        setToastMessage('Data reset to default.');
                    }}
                    color="danger"
                    fill="outline"
                    size="small"
                    style={{ marginRight: '8px' }} 
                >
                    Reset data
                </IonButton>
            </div>
          </aside>

          <main className="tablet-main-viewport">
            <div className="tablet-top-bar tablet-only">
              <div>
                <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800 }}>
                  Review Requests
                </h1>
                <p style={{ margin: '4px 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
                  Manage and approve team leave requests
                </p>
              </div>
            </div>

            {filteredRequests.length === 0 ? (
              <div style={{ padding: '36px' }}>
                <EmptyState
                  icon={fileTrayOutline}
                  title="Queue Clear!"
                  description={
                    filter === 'pending'
                      ? 'No pending time off requests requiring review.'
                      : `No requests found under "${filter}".`
                  }
                />
              </div>
            ) : (
              <div className="supervisor-split-container">
                <div className="supervisor-master-col">
                {filteredRequests.map((req) => (
                    <div
                    key={req.id}
                    className={`master-item-wrapper ${
                        activeDetailRequest?.id === req.id ? 'selected' : ''
                    }`}
                    onClick={() => {
                        // Under 1024px: the detail pane is hidden, so tapping opens the review modal
                        if (window.innerWidth < 1024) {
                        if (req.status === 'pending') {
                            setMobileModalRequest(req);
                        }
                        } else {
                        // On >= 1024px: select request for the right-hand detail pane
                        setSelectedRequestId(req.id);
                        }
                    }}
                    >
                    <RequestCard
                        request={req}
                        isSupervisorView
                        onReview={(r) => setMobileModalRequest(r)}
                    />
                    </div>
                ))}
                </div>
                <aside className="supervisor-detail-col tablet-only">
                  {activeDetailRequest && (
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingBottom: '20px',
                          borderBottom: '1px solid #edf2f7',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <IonIcon
                            icon={personCircleOutline}
                            style={{ fontSize: '48px', color: 'var(--ion-color-step-600)' }}
                          />
                          <div>
                            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>
                              {activeDetailRequest.employeeName}
                            </h2>
                            <p style={{ margin: '2px 0 0', color: '#718096', fontSize: '0.88rem' }}>
                              Employee ID: {activeDetailRequest.employeeId}
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={activeDetailRequest.status} />
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '16px',
                          margin: '24px 0',
                        }}
                      >
                        <div
                          style={{
                            padding: '14px 16px',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                            LEAVE TYPE
                          </span>
                          <p
                            style={{
                              margin: '4px 0 0',
                              fontSize: '1.05rem',
                              fontWeight: 700,
                              textTransform: 'capitalize',
                            }}
                          >
                            {activeDetailRequest.type} Leave
                          </p>
                        </div>

                        <div
                          style={{
                            padding: '14px 16px',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                            REQUESTED DATES
                          </span>
                          <p
                            style={{
                              margin: '4px 0 0',
                              fontSize: '1rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <IonIcon icon={calendarClearOutline} color="primary" />
                            {activeDetailRequest.startDate} → {activeDetailRequest.endDate}
                          </p>
                        </div>
                      </div>

                      {activeDetailRequest.notes && (
                        <div
                          style={{
                            padding: '16px',
                            background: '#f8fafc',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            marginBottom: '24px',
                          }}
                        >
                          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                            EMPLOYEE NOTES
                          </span>
                          <p style={{ margin: '6px 0 0', fontSize: '0.95rem', color: '#334155' }}>
                            "{activeDetailRequest.notes}"
                          </p>
                        </div>
                      )}

                      {activeDetailRequest.status === 'pending' ? (
                        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #edf2f7' }}>
                          <FormField label="Supervisor Feedback / Note (Optional)">
                            <IonTextarea
                              value={supervisorNote}
                              rows={3}
                              autoGrow={false}
                              placeholder="Provide justification or instructions for this decision..."
                              onIonInput={(e) => setSupervisorNote(e.detail.value || '')}
                              style={{
                                border: '1px solid #cbd5e1',
                                borderRadius: '10px',
                                padding: '10px 12px',
                                background: '#fff',
                                height: '80px',
                              }}
                            />
                          </FormField>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                            <IonButton
                              color="danger"
                              fill="outline"
                              expand="block"
                              shape="round"
                              onClick={() => handleReviewAction('rejected')}
                            >
                              <IonIcon slot="start" icon={closeCircleOutline} />
                              Reject
                            </IonButton>

                            <IonButton
                              color="success"
                              expand="block"
                              shape="round"
                              onClick={() => handleReviewAction('approved')}
                            >
                              <IonIcon slot="start" icon={checkmarkCircleOutline} />
                              Approve
                            </IonButton>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: '24px',
                            padding: '16px',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '12px',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <IonIcon icon={chatbubbleEllipsesOutline} color="medium" style={{ fontSize: '20px', marginTop: '2px' }} />
                          <div>
                            <strong style={{ fontSize: '0.85rem', color: '#475569' }}>
                              Decision Recorded
                            </strong>
                            <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                              {activeDetailRequest.supervisorNote
                                ? `Note: "${activeDetailRequest.supervisorNote}"`
                                : 'No notes were provided with this decision.'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </aside>
              </div>
            )}
          </main>
        </div>

        <ReviewRequestModal
          request={mobileModalRequest}
          isOpen={!!mobileModalRequest}
          onDismiss={() => setMobileModalRequest(null)}
        />

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage || ''}
          duration={2500}
          color="success"
          onDidDismiss={() => setToastMessage(null)}
        />
      </IonContent>
    </IonPage>
  );
};