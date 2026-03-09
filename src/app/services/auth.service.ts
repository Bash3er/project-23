import { Injectable, signal } from '@angular/core';

export type UserRole = 'admin' | 'hr' | 'employee';

export interface AuthUser {
  id: number;
  name: string;
  role: UserRole;
  employeeId: number;
  department: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<AuthUser | null>({
    id: 1,
    name: 'Admin User',
    role: 'admin',
    employeeId: 2,
    department: 'HR'
  });

  getUser() { return this.currentUser(); }
  isLoggedIn() { return this.currentUser() !== null; }
  isHR() { return ['admin', 'hr'].includes(this.currentUser()?.role ?? ''); }
  isAdmin() { return this.currentUser()?.role === 'admin'; }

  login(role: UserRole) {
    const users: Record<UserRole, AuthUser> = {
      admin: { id: 1, name: 'Admin User', role: 'admin', employeeId: 2, department: 'HR' },
      hr: { id: 2, name: 'Priya Patel', role: 'hr', employeeId: 2, department: 'HR' },
      employee: { id: 3, name: 'Arjun Sharma', role: 'employee', employeeId: 1, department: 'Engineering' }
    };
    this.currentUser.set(users[role]);
  }

  logout() { this.currentUser.set(null); }
}
