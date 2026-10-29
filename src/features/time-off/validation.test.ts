import { describe, it, expect } from 'vitest';
import { requestFormSchema } from './validation';

describe('requestFormSchema Validation', () => {
  it('passes on valid payload', () => {
    const validData = {
      type: 'vacation',
      startDate: '2026-11-01',
      endDate: '2026-11-05',
      notes: 'Going on vacation',
    };

    const result = requestFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails if endDate is before startDate', () => {
    const invalidData = {
      type: 'sick',
      startDate: '2026-11-05',
      endDate: '2026-11-01',
    };

    const result = requestFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('End date cannot be prior to start date');
      expect(result.error.issues[0].path).toContain('endDate');
    }
  });

  it('fails when notes exceed 250 characters', () => {
    const dataWithLongNotes = {
      type: 'personal',
      startDate: '2026-11-01',
      endDate: '2026-11-01',
      notes: 'a'.repeat(251),
    };

    const result = requestFormSchema.safeParse(dataWithLongNotes);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('cannot exceed 250 characters');
    }
  });
});
