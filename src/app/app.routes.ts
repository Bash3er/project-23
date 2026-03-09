import { Routes } from '@angular/router';
import { hrGuard, authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees',
    loadComponent: () => import('./components/employee-list/employee-list.component').then(m => m.EmployeeListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/:id',
    loadComponent: () => import('./components/employee-detail/employee-detail.component').then(m => m.EmployeeDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'attendance',
    loadComponent: () => import('./components/attendance-tracker/attendance-tracker.component').then(m => m.AttendanceTrackerComponent),
    canActivate: [authGuard]
  },
  {
    path: 'leave-request',
    loadComponent: () => import('./components/leave-request/leave-request.component').then(m => m.LeaveRequestComponent),
    canActivate: [authGuard]
  },
  {
    path: 'leave-approval',
    loadComponent: () => import('./components/leave-approval/leave-approval.component').then(m => m.LeaveApprovalComponent),
    canActivate: [authGuard, hrGuard]
  },
  { path: '**', redirectTo: 'dashboard' }
];
