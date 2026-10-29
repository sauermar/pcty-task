import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { initialMockRequests } from './mockData';

import type { TimeOffRequest, UserRole } from '../features/time-off/types';

export const CURRENT_EMPLOYEE_ID = 'emp-001';
export const CURRENT_EMPLOYEE_NAME = 'Marketa Sauerova';

interface TimeOffStore {
  requests: TimeOffRequest[];
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  createRequest: (
    data: Omit<TimeOffRequest, 'id' | 'createdAt' | 'status' | 'employeeId' | 'employeeName'>
  ) => void;
  reviewRequest: (id: string, status: 'approved' | 'rejected', supervisorNote?: string) => void;
  resetToDefault: () => void;
}

export const useTimeOffStore = create<TimeOffStore>()(
  persist(
    (set) => ({
      requests: initialMockRequests,
      currentRole: 'employee',
      setRole: (role) => set({ currentRole: role }),
      createRequest: (data) =>
        set((state) => ({
          requests: [
            {
              ...data,
              id: `req-${Date.now()}`,
              employeeId: CURRENT_EMPLOYEE_ID,
              employeeName: CURRENT_EMPLOYEE_NAME,
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
            ...state.requests,
          ],
        })),
      reviewRequest: (id, status, supervisorNote) =>
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status,
                  supervisorNote: supervisorNote?.trim() || undefined,
                  reviewedAt: new Date().toISOString(),
                }
              : r
          ),
        })),
      resetToDefault: () => set({ requests: initialMockRequests, currentRole: 'employee' }),
    }),
    {
      name: 'time-off-app-store-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
