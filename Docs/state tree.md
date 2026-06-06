# TaskMatrix — State Tree

This diagram shows the top-level shape of the client-side state management stores. Use this as a reference when adding or modifying stores in the frontend.

Root Store
│
├── authStore
│ ├── user
│ ├── token
│ ├── isAuthenticated
│ └── loading
│
├── projectStore
│ ├── projects
│ ├── selectedProject
│ ├── filters
│ └── loading
│
├── taskStore
│ ├── tasks
│ ├── selectedTask
│ ├── kanbanColumns
│ ├── dragState
│ └── filters
│
├── notificationStore
│ ├── notifications
│ └── unreadCount
│
├── analyticsStore
│ ├── taskStats
│ ├── projectStats
│ └── productivityMetrics
│
└── uiStore
├── theme
├── sidebarOpen
├── modalState
└── drawerState

Last updated: 2026-06-06
