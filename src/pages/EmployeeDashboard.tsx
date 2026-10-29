import React, { useState, useMemo } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButtons,
  IonButton,
  IonToast,
  IonBadge,
} from '@ionic/react';
import { add, calendarOutline, briefcaseOutline } from 'ionicons/icons';
import { useTimeOffStore, CURRENT_EMPLOYEE_ID } from '../store/useTimeOffStore';
import { RequestCard } from '../features/time-off/components/RequestCard';
import { NewRequestModal } from '../features/time-off/components/NewRequestModal';
import { RoleSwitcher } from '../features/auth/RoleSwitcher';
import { EmptyState, SegmentFilter, type FilterOption, type RequestStatus } from '../components/ui';

type StatusFilter = 'all' | RequestStatus;

const filterOptions: FilterOption<StatusFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export const EmployeeDashboard: React.FC = () => {
  const { requests } = useTimeOffStore();
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const employeeRequests = useMemo(() => {
    return requests
      .filter((r) => r.employeeId === CURRENT_EMPLOYEE_ID)
      .filter((r) => (filter === 'all' ? true : r.status === filter));
  }, [requests, filter]);

  const counts = useMemo(() => {
    const userReqs = requests.filter((r) => r.employeeId === CURRENT_EMPLOYEE_ID);
    return {
      all: userReqs.length,
      pending: userReqs.filter((r) => r.status === 'pending').length,
      approved: userReqs.filter((r) => r.status === 'approved').length,
      rejected: userReqs.filter((r) => r.status === 'rejected').length,
    };
  }, [requests]);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setToastMessage('Time off request submitted successfully!');
  };

  return (
    <IonPage>
      <IonHeader translucent className="mobile-only">
        <IonToolbar>
          <IonTitle>TimeOff Portal</IonTitle>
          <IonButtons slot="end">
            <RoleSwitcher />
          </IonButtons>
        </IonToolbar>
        <SegmentFilter
          value={filter}
          options={filterOptions}
          onChange={(value) => setFilter(value)}
        />
      </IonHeader>

      <IonContent fullscreen>
        <div className="responsive-app-shell">
          <aside className="tablet-sidebar-nav tablet-only">
            <div className="tablet-sidebar-brand">
              <IonIcon icon={briefcaseOutline} style={{ fontSize: '24px' }} />
              <span>TimeOff Portal</span>
            </div>

            <ul className="tablet-nav-list">
              {filterOptions.map((opt) => (
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
            </div>
          </aside>

          <main className="tablet-main-viewport">
            <div className="tablet-top-bar tablet-only">
              <div>
                <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800 }}>
                  My Time Off
                </h1>
                <p style={{ margin: '4px 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
                  Manage and track your leave submissions
                </p>
              </div>

              <div className="action-button">
                <IonButton
                  color="primary"
                  shape="round"
                  onClick={() => setIsModalOpen(true)}
                  style={{ fontWeight: 600 }}
                >
                  <IonIcon slot="start" icon={add} />
                  Request Time Off
                </IonButton>
              </div>
            </div>

            <div className="tablet-content-body">
              {employeeRequests.length === 0 ? (
                <EmptyState
                  icon={calendarOutline}
                  title="No Requests Found"
                  description={
                    filter === 'all'
                      ? "You haven't requested any time off yet. Click 'Request Time Off' to begin."
                      : `No requests found under "${filter}".`
                  }
                  actionLabel={filter === 'all' ? 'Request Time Off' : undefined}
                  onAction={() => setIsModalOpen(true)}
                />
              ) : (
                <div className="card-grid">
                  {employeeRequests.map((req) => (
                    <RequestCard key={req.id} request={req} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>

        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          className="mobile-only"
          style={{ marginBottom: '16px' }}
        >
          <IonFabButton onClick={() => setIsModalOpen(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <NewRequestModal
          isOpen={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
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