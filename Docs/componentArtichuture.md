Component Architecture — TaskMatrix

High-level component and store mapping for the frontend application. Use this as a reference when adding or refactoring UI components.

TaskMatrix
├─ State Management
│ ├─ Auth Store
│ │ ├─ User
│ │ ├─ Token
│ │ └─ Authentication State
│ │
│ ├─ Project Store
│ │ ├─ Projects
│ │ ├─ Selected Project
│ │ └─ Filters
│ │
│ ├─ Task Store
│ │ ├─ Tasks
│ │ ├─ Selected Task
│ │ ├─ Kanban Columns
│ │ └─ Drag State
│ │
│ ├─ Notification Store
│ └─ UI Store
│
└─ Frontend Application
├─ Dashboard
├─ Projects
├─ Kanban
├─ Analytics
└─ Settings

Last updated: 2026-06-06
