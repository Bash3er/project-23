# AttendIQ — Employee Attendance & Leave Management System
### L&T Construction | Project 23 | CIA-2 & CIA-3

---

## 🏗 Tech Stack
| Layer | Technology |
|---|---|
| Framework | Angular 17 (Standalone Components) |
| Language | TypeScript 5.2 |
| UI Library | Angular Material 17 |
| State | RxJS BehaviorSubject + Angular Signals |
| Mock Backend | JSON Server (REST API) |
| Styling | SCSS + CSS Variables |
| Fonts | Sora (headings) + DM Sans (body) |

---

## ✅ Features Implemented

### CIA-2 (Tasks 1–2)
1. **TypeScript Essentials**
   - `Employee`, `AttendanceRecord`, `LeaveRequest`, `LeaveBalance`, `DashboardStats` interfaces
   - Constants: `DEPARTMENTS`, `LEAVE_TYPES`
   
2. **Component Development**
   - `DashboardComponent` — KPIs, attendance rate, dept breakdown, recent activity
   - `EmployeeListComponent` — Grid + Table view with search/filter
   - `AttendanceTrackerComponent` — Bulk/individual daily attendance marking
   - `LeaveRequestComponent` — Employee leave application
   - `LeaveApprovalComponent` — HR panel for reviewing requests
   - `EmployeeDetailComponent` — Full employee profile
   - `NavbarComponent` — Role-aware navigation

### CIA-3 (Tasks 3–7)
3. **Routing & Navigation**
   - Lazy-loaded routes for all modules
   - Route parameter (`/employees/:id`) for individual profiles
   - Route guards: `authGuard` (authentication), `hrGuard` (HR/Admin only)

4. **Dependency Injection & Services**
   - `EmployeeService` — Employee CRUD via HttpClient + mock fallback
   - `LeaveService` — Leave management & balance
   - `AttendanceService` — Daily attendance + dashboard stats
   - `AuthService` — Role-based user session (Admin/HR/Employee)

5. **Forms & Validation**
   - **Reactive Forms**: Leave application (with date range validator), Leave approval
   - **Template-driven Form**: Employee registration dialog
   - Client-side validators: required, minLength, maxLength, pattern, email, custom

6. **Pipes & Custom Directives**
   - `FilterEmployeesPipe` — Multi-field search + department/status filter
   - `LeaveTypeBadgePipe` — Display-friendly leave type labels
   - `InitialsPipe` — Avatar initials from name
   - `AttendanceHighlightDirective` — Row background by attendance status
   - `LeaveStatusHighlightDirective` — Leave card border by status

7. **HTTP & Data Handling**
   - `HttpClient` integrated in all services
   - JSON Server mock REST API (`db.json`)
   - Graceful fallback to in-memory mock data if server is offline

---

## 🚀 Setup Instructions

### Prerequisites
```bash
node -v   # v18+
npm -v    # v9+
```

### Install Dependencies
```bash
npm install
```

### Start Mock API Server (Terminal 1)
```bash
npm run json-server
# Runs at: http://localhost:3000
```

### Start Angular Dev Server (Terminal 2)
```bash
npm start
# App at: http://localhost:4200
```

---

## 🗂 Project Structure
```
src/app/
├── models/
│   └── models.ts                   # TypeScript interfaces & constants
├── services/
│   ├── employee.service.ts         # Employee CRUD
│   ├── leave.service.ts            # Leave management
│   ├── attendance.service.ts       # Attendance tracking
│   └── auth.service.ts             # Authentication
├── guards/
│   └── auth.guard.ts               # Route guards
├── pipes/
│   └── filter-employees.pipe.ts    # Custom pipes
├── directives/
│   └── attendance-highlight.directive.ts  # Custom directives
├── components/
│   ├── navbar/                     # Top navigation bar
│   ├── dashboard/                  # Main dashboard
│   ├── employee-list/              # Employee listing (grid + table)
│   ├── employee-detail/            # Employee profile page
│   ├── employee-form/              # Add/Edit employee dialog
│   ├── attendance-tracker/         # Daily attendance marking
│   ├── leave-request/              # Leave application form
│   └── leave-approval/             # HR leave management
├── app.routes.ts                   # Route definitions
├── app.config.ts                   # App configuration
└── app.component.ts                # Root component with sidenav
```

---

## 👥 Role Switching (Demo)
The app includes a **Demo Role Switcher** in the navbar:
- **Admin** — Full access to all modules
- **HR Manager** — Access to HR Panel + Leave Approvals
- **Employee** — Dashboard, Attendance, Leave Request only

---

## 📸 Screenshots
_(Add screenshots of each page to PDF for LMS submission)_

---

## 🔗 API Endpoints (JSON Server)
| Method | Endpoint | Description |
|---|---|---|
| GET | /employees | List all employees |
| GET | /employees/:id | Get single employee |
| POST | /employees | Add employee |
| PATCH | /employees/:id | Update employee |
| DELETE | /employees/:id | Delete employee |
| GET | /attendance | All attendance records |
| GET | /leaveRequests | All leave requests |
| GET | /leaveBalances | Leave balance data |

---

*Built for L&T Construction Internal Use | Angular 17 + TypeScript*
