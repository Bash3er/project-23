// ─── Core Data Models ───────────────────────────────────────────────────────

export interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  manager?: string;
}

export interface AttendanceRecord {
  id?: number;
  employeeId: number;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'holiday' | 'weekend';
  hoursWorked: number;
  remarks?: string;
  department: string;
}

export interface LeaveRequest {
  id?: number;
  employeeId: number;
  employeeName: string;
  department: string;
  leaveType: 'casual' | 'sick' | 'earned' | 'maternity' | 'paternity' | 'unpaid';
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvalDate?: string;
  remarks?: string;
}

export interface LeaveBalance {
  id?: number;
  employeeId: number;
  casual: number;
  sick: number;
  earned: number;
  maternity: number;
  paternity: number;
  unpaid: number;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  onLeave: number;
  pendingLeaves: number;
  lateArrivals: number;
  attendanceRate: number;
  departments: DepartmentStat[];
}

export interface DepartmentStat {
  name: string;
  total: number;
  present: number;
  absent: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  'Engineering', 'HR', 'Finance', 'Operations', 'Marketing', 'Sales', 'Legal', 'IT'
];

export const LEAVE_TYPES = [
  { value: 'casual', label: 'Casual Leave' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'earned', label: 'Earned Leave' },
  { value: 'maternity', label: 'Maternity Leave' },
  { value: 'paternity', label: 'Paternity Leave' },
  { value: 'unpaid', label: 'Unpaid Leave' }
];
