import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/models';

@Pipe({ name: 'filterEmployees', standalone: true, pure: false })
export class FilterEmployeesPipe implements PipeTransform {
  transform(employees: Employee[], searchTerm: string, department: string, status: string): Employee[] {
    if (!employees) return [];

    return employees.filter(emp => {
      const matchSearch = !searchTerm ||
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchDept = !department || emp.department === department;
      const matchStatus = !status || emp.status === status;

      return matchSearch && matchDept && matchStatus;
    });
  }
}

@Pipe({ name: 'leaveTypeBadge', standalone: true })
export class LeaveTypeBadgePipe implements PipeTransform {
  transform(type: string): string {
    const map: Record<string, string> = {
      casual: 'Casual Leave',
      sick: 'Sick Leave',
      earned: 'Earned Leave',
      maternity: 'Maternity Leave',
      paternity: 'Paternity Leave',
      unpaid: 'Unpaid Leave'
    };
    return map[type] ?? type;
  }
}

@Pipe({ name: 'initials', standalone: true })
export class InitialsPipe implements PipeTransform {
  transform(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }
}
