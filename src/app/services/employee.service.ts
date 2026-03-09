import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Employee } from '../models/models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:3000';
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.http.get<Employee[]>(`${this.apiUrl}/employees`).subscribe(
      data => this.employeesSubject.next(data),
      () => this.employeesSubject.next(this.getMockEmployees())
    );
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  addEmployee(employee: Omit<Employee, 'id' | 'employeeId'>): Observable<Employee> {
    const current = this.employeesSubject.getValue();
    const newEmp = {
      ...employee,
      id: current.length + 1,
      employeeId: `EMP${String(current.length + 1).padStart(3, '0')}`
    };
    return this.http.post<Employee>(`${this.apiUrl}/employees`, newEmp).pipe(
      tap(() => this.loadEmployees())
    );
  }

  updateEmployee(id: number, data: Partial<Employee>): Observable<Employee> {
    return this.http.patch<Employee>(`${this.apiUrl}/employees/${id}`, data).pipe(
      tap(() => this.loadEmployees())
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/${id}`).pipe(
      tap(() => this.loadEmployees())
    );
  }

  // Fallback mock data if JSON server is not running
  getMockEmployees(): Employee[] {
    return [
      { id: 1, employeeId: 'EMP001', name: 'Arjun Sharma', email: 'arjun.sharma@lnt.com', department: 'Engineering', designation: 'Senior Engineer', phone: '9876543210', joinDate: '2020-01-15', status: 'active', manager: 'Rajesh Kumar' },
      { id: 2, employeeId: 'EMP002', name: 'Priya Patel', email: 'priya.patel@lnt.com', department: 'HR', designation: 'HR Manager', phone: '9876543211', joinDate: '2019-03-10', status: 'active', manager: 'CEO' },
      { id: 3, employeeId: 'EMP003', name: 'Vikram Singh', email: 'vikram.singh@lnt.com', department: 'Engineering', designation: 'Tech Lead', phone: '9876543212', joinDate: '2018-07-01', status: 'active', manager: 'Rajesh Kumar' },
      { id: 4, employeeId: 'EMP004', name: 'Ananya Krishnan', email: 'ananya.k@lnt.com', department: 'Finance', designation: 'Financial Analyst', phone: '9876543213', joinDate: '2021-02-20', status: 'active', manager: 'Suresh Iyer' },
      { id: 5, employeeId: 'EMP005', name: 'Rohit Mehta', email: 'rohit.mehta@lnt.com', department: 'Operations', designation: 'Operations Manager', phone: '9876543214', joinDate: '2017-11-05', status: 'active', manager: 'CEO' },
      { id: 6, employeeId: 'EMP006', name: 'Kavya Nair', email: 'kavya.nair@lnt.com', department: 'Engineering', designation: 'Frontend Developer', phone: '9876543215', joinDate: '2022-06-15', status: 'active', manager: 'Vikram Singh' },
      { id: 7, employeeId: 'EMP007', name: 'Deepak Reddy', email: 'deepak.reddy@lnt.com', department: 'Marketing', designation: 'Marketing Lead', phone: '9876543216', joinDate: '2020-09-01', status: 'active', manager: 'CEO' },
      { id: 8, employeeId: 'EMP008', name: 'Sneha Joshi', email: 'sneha.joshi@lnt.com', department: 'Engineering', designation: 'Backend Developer', phone: '9876543217', joinDate: '2021-08-10', status: 'active', manager: 'Vikram Singh' },
      { id: 9, employeeId: 'EMP009', name: 'Aditya Verma', email: 'aditya.verma@lnt.com', department: 'Finance', designation: 'Accountant', phone: '9876543218', joinDate: '2023-01-05', status: 'active', manager: 'Suresh Iyer' },
      { id: 10, employeeId: 'EMP010', name: 'Pooja Gupta', email: 'pooja.gupta@lnt.com', department: 'HR', designation: 'HR Executive', phone: '9876543219', joinDate: '2022-04-12', status: 'inactive', manager: 'Priya Patel' },
      { id: 11, employeeId: 'EMP011', name: 'Nikhil Pandey', email: 'nikhil.pandey@lnt.com', department: 'Operations', designation: 'Site Supervisor', phone: '9876543220', joinDate: '2019-12-01', status: 'active', manager: 'Rohit Mehta' },
      { id: 12, employeeId: 'EMP012', name: 'Ritu Agarwal', email: 'ritu.agarwal@lnt.com', department: 'Marketing', designation: 'Content Strategist', phone: '9876543221', joinDate: '2021-05-17', status: 'active', manager: 'Deepak Reddy' }
    ];
  }
}
