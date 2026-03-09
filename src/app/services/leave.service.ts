import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, of } from 'rxjs';
import { LeaveRequest, LeaveBalance } from '../models/models';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private apiUrl = 'http://localhost:3000';
  private leavesSubject = new BehaviorSubject<LeaveRequest[]>([]);
  leaves$ = this.leavesSubject.asObservable();

  // Mock data fallback
  private mockLeaves: LeaveRequest[] = [
    { id: 1, employeeId: 1, employeeName: 'Arjun Sharma', department: 'Engineering', leaveType: 'casual', fromDate: '2024-01-20', toDate: '2024-01-22', days: 3, reason: 'Family function', status: 'approved', appliedDate: '2024-01-10', approvedBy: 'Priya Patel' },
    { id: 2, employeeId: 6, employeeName: 'Kavya Nair', department: 'Engineering', leaveType: 'sick', fromDate: '2024-01-18', toDate: '2024-01-19', days: 2, reason: 'Fever and cold', status: 'pending', appliedDate: '2024-01-17' },
    { id: 3, employeeId: 4, employeeName: 'Ananya Krishnan', department: 'Finance', leaveType: 'earned', fromDate: '2024-02-01', toDate: '2024-02-05', days: 5, reason: 'Planned vacation', status: 'pending', appliedDate: '2024-01-15' },
    { id: 4, employeeId: 9, employeeName: 'Aditya Verma', department: 'Finance', leaveType: 'casual', fromDate: '2024-01-25', toDate: '2024-01-25', days: 1, reason: 'Personal work', status: 'rejected', appliedDate: '2024-01-20', approvedBy: 'Priya Patel', remarks: 'High workload period' },
    { id: 5, employeeId: 3, employeeName: 'Vikram Singh', department: 'Engineering', leaveType: 'sick', fromDate: '2024-01-22', toDate: '2024-01-23', days: 2, reason: 'Medical checkup', status: 'pending', appliedDate: '2024-01-21' },
    { id: 6, employeeId: 7, employeeName: 'Deepak Reddy', department: 'Marketing', leaveType: 'earned', fromDate: '2024-02-10', toDate: '2024-02-14', days: 5, reason: 'Annual leave', status: 'approved', appliedDate: '2024-01-25', approvedBy: 'Priya Patel' }
  ];

  private mockBalances: LeaveBalance[] = [
    { id: 1, employeeId: 1, casual: 9, sick: 10, earned: 20, maternity: 0, paternity: 5, unpaid: 0 },
    { id: 2, employeeId: 2, casual: 12, sick: 10, earned: 18, maternity: 0, paternity: 0, unpaid: 0 },
    { id: 3, employeeId: 3, casual: 10, sick: 8, earned: 15, maternity: 0, paternity: 5, unpaid: 0 },
    { id: 4, employeeId: 4, casual: 12, sick: 10, earned: 22, maternity: 90, paternity: 0, unpaid: 0 },
    { id: 5, employeeId: 5, casual: 12, sick: 10, earned: 25, maternity: 0, paternity: 5, unpaid: 0 },
    { id: 6, employeeId: 6, casual: 11, sick: 8, earned: 12, maternity: 90, paternity: 0, unpaid: 0 }
  ];

  constructor(private http: HttpClient) {
    this.leavesSubject.next(this.mockLeaves);
  }

  getLeaveRequests(): Observable<LeaveRequest[]> {
    return of(this.mockLeaves);
  }

  getLeaveById(id: number): Observable<LeaveRequest | undefined> {
    return of(this.mockLeaves.find(l => l.id === id));
  }

  getLeavesByEmployee(employeeId: number): Observable<LeaveRequest[]> {
    return of(this.mockLeaves.filter(l => l.employeeId === employeeId));
  }

  getPendingLeaves(): Observable<LeaveRequest[]> {
    return of(this.mockLeaves.filter(l => l.status === 'pending'));
  }

  applyLeave(leave: Omit<LeaveRequest, 'id'>): Observable<LeaveRequest> {
    const newLeave: LeaveRequest = { ...leave, id: this.mockLeaves.length + 1 };
    this.mockLeaves.push(newLeave);
    this.leavesSubject.next(this.mockLeaves);
    return of(newLeave);
  }

  updateLeaveStatus(id: number, status: 'approved' | 'rejected', approvedBy: string, remarks?: string): Observable<LeaveRequest> {
    const leave = this.mockLeaves.find(l => l.id === id);
    if (leave) {
      leave.status = status;
      leave.approvedBy = approvedBy;
      leave.approvalDate = new Date().toISOString().split('T')[0];
      if (remarks) leave.remarks = remarks;
      this.leavesSubject.next([...this.mockLeaves]);
    }
    return of(leave!);
  }

  getLeaveBalance(employeeId: number): Observable<LeaveBalance | undefined> {
    return of(this.mockBalances.find(b => b.employeeId === employeeId));
  }
}
