import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AttendanceRecord, DashboardStats } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private mockAttendance: AttendanceRecord[] = [
    { id: 1, employeeId: 1, employeeName: 'Arjun Sharma', date: '2024-01-15', checkIn: '09:02', checkOut: '18:05', status: 'present', hoursWorked: 9.05, department: 'Engineering' },
    { id: 2, employeeId: 2, employeeName: 'Priya Patel', date: '2024-01-15', checkIn: '08:55', checkOut: '18:00', status: 'present', hoursWorked: 9.08, department: 'HR' },
    { id: 3, employeeId: 3, employeeName: 'Vikram Singh', date: '2024-01-15', checkIn: '10:15', checkOut: '19:10', status: 'late', hoursWorked: 8.92, department: 'Engineering' },
    { id: 4, employeeId: 4, employeeName: 'Ananya Krishnan', date: '2024-01-15', checkIn: '', checkOut: '', status: 'absent', hoursWorked: 0, department: 'Finance' },
    { id: 5, employeeId: 5, employeeName: 'Rohit Mehta', date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', status: 'present', hoursWorked: 9, department: 'Operations' },
    { id: 6, employeeId: 6, employeeName: 'Kavya Nair', date: '2024-01-15', checkIn: '09:10', checkOut: '14:00', status: 'half-day', hoursWorked: 4.83, department: 'Engineering' },
    { id: 7, employeeId: 7, employeeName: 'Deepak Reddy', date: '2024-01-15', checkIn: '09:05', checkOut: '18:10', status: 'present', hoursWorked: 9.08, department: 'Marketing' },
    { id: 8, employeeId: 8, employeeName: 'Sneha Joshi', date: '2024-01-15', checkIn: '08:50', checkOut: '18:00', status: 'present', hoursWorked: 9.17, department: 'Engineering' },
    { id: 9, employeeId: 9, employeeName: 'Aditya Verma', date: '2024-01-15', checkIn: '09:30', checkOut: '18:30', status: 'late', hoursWorked: 9, department: 'Finance' },
    { id: 10, employeeId: 10, employeeName: 'Pooja Gupta', date: '2024-01-15', checkIn: '', checkOut: '', status: 'absent', hoursWorked: 0, department: 'HR' },
    { id: 11, employeeId: 11, employeeName: 'Nikhil Pandey', date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', status: 'present', hoursWorked: 9, department: 'Operations' },
    { id: 12, employeeId: 12, employeeName: 'Ritu Agarwal', date: '2024-01-15', checkIn: '09:15', checkOut: '18:15', status: 'present', hoursWorked: 9, department: 'Marketing' },
    // Previous days
    { id: 13, employeeId: 1, employeeName: 'Arjun Sharma', date: '2024-01-14', checkIn: '09:00', checkOut: '18:00', status: 'present', hoursWorked: 9, department: 'Engineering' },
    { id: 14, employeeId: 2, employeeName: 'Priya Patel', date: '2024-01-14', checkIn: '09:00', checkOut: '18:00', status: 'present', hoursWorked: 9, department: 'HR' },
    { id: 15, employeeId: 3, employeeName: 'Vikram Singh', date: '2024-01-14', checkIn: '', checkOut: '', status: 'absent', hoursWorked: 0, department: 'Engineering' },
  ];

  private attendanceSubject = new BehaviorSubject<AttendanceRecord[]>(this.mockAttendance);
  attendance$ = this.attendanceSubject.asObservable();

  getAttendanceByDate(date: string): Observable<AttendanceRecord[]> {
    return of(this.mockAttendance.filter(a => a.date === date));
  }

  getAttendanceByEmployee(employeeId: number): Observable<AttendanceRecord[]> {
    return of(this.mockAttendance.filter(a => a.employeeId === employeeId));
  }

  markAttendance(record: Omit<AttendanceRecord, 'id'>): Observable<AttendanceRecord> {
    const newRecord: AttendanceRecord = { ...record, id: this.mockAttendance.length + 1 };
    this.mockAttendance.push(newRecord);
    this.attendanceSubject.next([...this.mockAttendance]);
    return of(newRecord);
  }

  updateAttendance(id: number, data: Partial<AttendanceRecord>): Observable<AttendanceRecord> {
    const idx = this.mockAttendance.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.mockAttendance[idx] = { ...this.mockAttendance[idx], ...data };
      this.attendanceSubject.next([...this.mockAttendance]);
      return of(this.mockAttendance[idx]);
    }
    return of({} as AttendanceRecord);
  }

  getDashboardStats(): Observable<DashboardStats> {
    const today = '2024-01-15';
    const todayRecords = this.mockAttendance.filter(a => a.date === today);
    const present = todayRecords.filter(a => a.status === 'present' || a.status === 'late').length;
    const absent = todayRecords.filter(a => a.status === 'absent').length;
    const late = todayRecords.filter(a => a.status === 'late').length;

    const stats: DashboardStats = {
      totalEmployees: 12,
      presentToday: present,
      absentToday: absent,
      onLeave: 2,
      pendingLeaves: 3,
      lateArrivals: late,
      attendanceRate: Math.round((present / 12) * 100),
      departments: [
        { name: 'Engineering', total: 4, present: 3, absent: 1 },
        { name: 'HR', total: 2, present: 1, absent: 1 },
        { name: 'Finance', total: 2, present: 1, absent: 1 },
        { name: 'Operations', total: 2, present: 2, absent: 0 },
        { name: 'Marketing', total: 2, present: 2, absent: 0 }
      ]
    };
    return of(stats);
  }
}
