# TimeOff Portal

A mobile-first time-off request app built with Ionic React, Vite, and TypeScript. It includes a lightweight employee dashboard and a supervisor review flow, with responsive layouts for phone and tablet-sized screens.

This project is a front-end prototype: requests are stored in browser local storage and seeded with demo data, so it works without a backend service.

---

## Overview

The app simulates a simple workplace leave workflow:

- Employees can submit vacation, sick, or personal leave requests.
- Requests are validated with Zod and React Hook Form.
- Employees can filter their own requests by status.
- Supervisors can review pending requests, approve or reject them, and optionally leave feedback notes.
- The UI switches instantly between employee and supervisor modes using a role toggle.
- The app is optimized for mobile interaction, while the supervisor view also uses a tablet desktop split-pane layout.

---

## Current Features

### Employee experience
- Request creation via a bottom-sheet modal on mobile.
- Leave types: Vacation, Sick Leave, and Personal Leave.
- Start/end date validation with a cross-field check so end date cannot be earlier than start date.
- Notes field with a 250-character limit.
- Status filters: All, Pending, Approved, Rejected.
- Request cards showing leave type, date range, notes, and supervisor feedback.
- Role switcher to move between employee and supervisor views.

### Supervisor experience
- Review queue for all pending requests.
- Filter groups: To Review, Reviewed, and All Requests.
- Request detail pane on wider screens.
- Mobile-friendly review modal for quick approval or rejection.
- Optional supervisor note for each decision.
- Reset data action in the supervisor sidebar for demo resets.

### App behavior
- State is managed with Zustand.
- Requests persist in localStorage through Zustand persistence middleware.
- Mock data is seeded to show the dashboard immediately on first load.
- The app is intentionally a UI demo and does not integrate with a real authentication or backend API.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| UI | `@ionic/react` |
| Frontend | `React 19` + `TypeScript` |
| Build tool | `Vite` |
| State | `Zustand` |
| Form validation | `React Hook Form` + `Zod` |
| Component docs | `Storybook 8` |
| Testing | `Vitest` + `@testing-library/react` |

---

## Getting Started

### Prerequisites
- Node.js `>= 18`
- npm `>= 9`

### Install dependencies

```bash
git clone <repository-url>
cd time-off-app
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local Vite URL in your browser, usually:

```text
http://localhost:5173
```

### View component library

```bash
npm run storybook
```

Storybook is typically available at:

```text
http://localhost:6006
```

---

## Validation and Testing

The project includes unit tests for form validation and UI rendering. The current test setup uses Vitest and React Testing Library.

```bash
npm run test
```

---

## Notes

- The responsive layout supports mobile sheets and a split-pane supervisor dashboard for tablet/desktop widths.
- The app is designed around thumb-friendly interactions: primary actions such as request submission and review decisions are placed within easy reach on small screens.
- Mobile-first touch patterns are used throughout, including bottom-sheet modals, round action buttons, compact cards, and simplified stacked layouts before expanding to larger breakpoints.
- Form controls prioritize readability and tap accuracy with generous spacing, clear labels, and large interactive targets that follow mobile usability guidelines.
- The UI adapts responsively using breakpoint-driven layouts, switching from a full-width mobile flow to a more desktop-appropriate detail-and-list split view on larger screens.
- Safe-area awareness and viewport-friendly spacing are considered for modern mobile devices, helping content sit comfortably within device notches and navigation bars.
- Accessible interaction patterns are included in the form system, including programmatic labels, visible validation messaging, and high-contrast feedback states for errors and status changes.
- The component library and screen patterns are intentionally reusable and modular, which helps keep the mobile experience consistent across employee and supervisor flows.

## Improvement Opportunities

This project is intentionally a front-end prototype and there are several areas that could be improved before treating it as a production-ready product:

- Inline styling is used in several components instead of a shared design system or CSS modules. Centralizing styling would improve consistency, themeability, and maintainability.
- Error handling is currently lightweight and mostly UI-driven. A more complete solution would include API/network failure states, retry flows, and clearer handling for invalid or unexpected data.
- State validations could be expanded beyond the current form-level checks, for example by validating date ranges and business rules in a centralized domain layer.
- Persistence is browser-local only, so it does not currently support multi-device synchronization, role-based access control, or server-side audit trails.
- The app would benefit from a stronger component abstraction layer for repeated patterns such as cards, panels, and action bars to reduce duplication.
- Testing coverage could be extended beyond validation and rendering to include edge cases, accessibility checks, and more thorough user-flow scenarios.
- Performance and accessibility could be further improved with focus management, keyboard support, reduced motion considerations, and more structured semantic markup.
