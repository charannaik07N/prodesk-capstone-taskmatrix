# TaskMatrix

## Enterprise Agile Project Management Platform

TaskMatrix is a modern project management platform designed to help software development teams efficiently manage projects, tasks, sprints, deadlines, and team collaboration. Inspired by tools like Jira, Trello, and Asana, TaskMatrix provides a centralized workspace where teams can track progress and improve productivity.

---

## Designated Track

Frontend Engineering

---

## Problem Statement

Software teams often struggle with managing tasks across multiple projects, tracking progress, assigning responsibilities, and maintaining transparency among team members. Existing tools can be complex and overwhelming for small and medium-sized teams.

TaskMatrix aims to provide a simple, intuitive, and scalable solution that improves team collaboration and project visibility.

---

## Solution Overview

TaskMatrix offers a modern Kanban-based project management experience with task tracking, team collaboration, notifications, and analytics dashboards.

The platform focuses on:

- Task organization
- Sprint planning
- Team collaboration
- Productivity tracking
- Project monitoring

---

## Tech Stack

### Frontend

- Next.js
- React.js
- Tailwind CSS
- Shadcn UI
- Zustand
- React Query
- React Hook Form
- Zod
- Recharts
- Lucide React
- DnD Kit

### Design

- Figma

### Mock APIs

- JSON Server

### Deployment

- Vercel

---

## Core Features

### Authentication

- Login
- Register
- Forgot Password

### Dashboard

- Project Overview
- Team Summary
- Activity Feed
- Statistics Cards

### Project Management

- Create Project UI
- Project Listing
- Search Projects
- Filter Projects

### Task Management

- Create Tasks
- Assign Tasks
- Priority Labels
- Due Dates

### Kanban Board

- Backlog
- Todo
- In Progress
- Review
- Done

### Notifications

- Task Updates
- Assignment Alerts
- Deadline Reminders

### Analytics

- Team Productivity
- Task Completion Rate
- Project Progress

### Settings

- Profile Management
- Theme Preferences
- Workspace Settings

---

## User Personas

### Project Manager

Manages projects, assigns tasks, and tracks progress.

### Developer

Works on assigned tasks and updates status.

### Team Lead

Monitors team performance and sprint execution.

---

## User Flow

1. User Login
2. Dashboard Access
3. Open Project
4. View Kanban Board
5. Create or Update Task
6. Monitor Progress
7. Receive Notifications

---

## Mock API Endpoints

### Authentication

POST /login

POST /register

### Projects

GET /projects

GET /projects/:id

### Tasks

GET /tasks

GET /tasks/:id

### Users

GET /users

### Notifications

GET /notifications

---

## Component Architecture

### Layout Components

- Sidebar
- Navbar
- Footer

### Dashboard Components

- StatsCard
- ActivityFeed
- ProjectOverview

### Project Components

- ProjectCard
- ProjectFilter
- ProjectTable

### Task Components

- KanbanBoard
- TaskCard
- TaskDrawer

### User Components

- UserProfile
- TeamMemberCard

---

## State Management

### Auth Store

- User
- Authentication State

### Project Store

- Projects
- Selected Project

### Task Store

- Tasks
- Selected Task

### Notification Store

- Notifications
- Unread Count

### UI Store

- Sidebar State
- Theme State
- Modal State

---

## Figma Wireframes

Figma project: https://www.figma.com/make/0l1Plcf63yOMyf1RfG22ly/TaskMatrix-SaaS-Platform-Design?fullscreen=1&t=PGoM0nmBiOexN3Lx-1&code-node-id=0-9

Note: The Figma designs are samples and may change during the project lifecycle.

---

## Architecture Diagrams

### State Tree Diagram

The state tree diagram is located at:

docs/state-tree.png

### Component Architecture Diagram

Located in:

docs/component-architecture.png

---

## Responsive Design Strategy

- Mobile First
- Tablet Responsive
- Desktop Optimized

---

## Accessibility

- Keyboard Navigation
- Semantic HTML
- Accessible Color Contrast
- Screen Reader Support

---

## Future Enhancements

- Calendar View
- Gantt Charts
- AI Task Suggestions
- Team Productivity Reports
- Real-time Collaboration

---

## Author

Charan Nayak

Frontend Engineering Capstone Project

Last updated: 2026-06-06
