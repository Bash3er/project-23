import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { EmployeeService } from '../../services/employee.service';
import { AttendanceService } from '../../services/attendance.service';
import { Employee, AttendanceRecord } from '../../models/models';
import { AttendanceHighlightDirective } from '../../directives/attendance-highlight.directive';
import { InitialsPipe } from '../../pipes/filter-employees.pipe';

interface AttendanceRow {
  employee: Employee;
  record?: AttendanceRecord;
  status: AttendanceRecord['status'];
  checkIn: string;
  checkOut: string;
  remarks: string;
  modified: boolean;
}

@Component({
  selector: 'app-attendance-tracker',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule,
    MatSnackBarModule, MatTooltipModule, MatChipsModule,
    AttendanceHighlightDirective, InitialsPipe
  ],
  templateUrl: './attendance-tracker.component.html',
  styleUrls: ['./attendance-tracker.component.scss']
})
export class AttendanceTrackerComponent implements OnInit {
  private empSvc = inject(EmployeeService);
  private attendanceSvc = inject(AttendanceService);
  private snackBar = inject(MatSnackBar);

  selectedDate = new Date().toISOString().split('T')[0];
  rows: AttendanceRow[] = [];
  loading = false;
  saving = false;
  filterDept = '';
  departments: string[] = [];

  displayedColumns = ['employee', 'checkIn', 'checkOut', 'status', 'hours', 'remarks', 'actions'];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.empSvc.getEmployees().subscribe({
      next: employees => {
        const activeEmps = employees.filter(e => e.status === 'active');
        this.departments = [...new Set(activeEmps.map(e => e.department))];
        this.attendanceSvc.getAttendanceByDate(this.selectedDate).subscribe(records => {
          this.rows = activeEmps.map(emp => {
            const record = records.find(r => r.employeeId === emp.id);
            return {
              employee: emp,
              record,
              status: record?.status ?? 'absent',
              checkIn: record?.checkIn ?? '',
              checkOut: record?.checkOut ?? '',
              remarks: record?.remarks ?? '',
              modified: false
            };
          });
          this.loading = false;
        });
      },
      error: () => {
        const employees = this.empSvc.getMockEmployees().filter(e => e.status === 'active');
        this.rows = employees.map(emp => ({
          employee: emp, status: 'present' as const,
          checkIn: '09:00', checkOut: '18:00', remarks: '', modified: false
        }));
        this.departments = [...new Set(employees.map(e => e.department))];
        this.loading = false;
      }
    });
  }

  onDateChange(): void {
    this.loadData();
  }

  markAll(status: AttendanceRecord['status']): void {
    this.rows.forEach(row => { row.status = status; row.modified = true; });
  }

  onRowChange(row: AttendanceRow): void {
    row.modified = true;
    if (row.status === 'absent' || row.status === 'holiday') {
      row.checkIn = '';
      row.checkOut = '';
    } else if (!row.checkIn) {
      row.checkIn = '09:00';
      row.checkOut = '18:00';
    }
  }

  calculateHours(checkIn: string, checkOut: string): number {
    if (!checkIn || !checkOut) return 0;
    const [ih, im] = checkIn.split(':').map(Number);
    const [oh, om] = checkOut.split(':').map(Number);
    return Math.round(((oh * 60 + om) - (ih * 60 + im)) / 60 * 10) / 10;
  }

  saveAll(): void {
    this.saving = true;
    const modifiedRows = this.rows.filter(r => r.modified);
    let saved = 0;
    if (modifiedRows.length === 0) {
      this.snackBar.open('No changes to save.', 'Close', { duration: 2000 });
      this.saving = false;
      return;
    }
    modifiedRows.forEach(row => {
      const record: Omit<AttendanceRecord, 'id'> = {
        employeeId: row.employee.id,
        employeeName: row.employee.name,
        department: row.employee.department,
        date: this.selectedDate,
        checkIn: row.checkIn,
        checkOut: row.checkOut,
        status: row.status,
        hoursWorked: this.calculateHours(row.checkIn, row.checkOut),
        remarks: row.remarks
      };
      this.attendanceSvc.markAttendance(record).subscribe(() => {
        saved++;
        row.modified = false;
        if (saved === modifiedRows.length) {
          this.saving = false;
          this.snackBar.open(`✓ Attendance saved for ${saved} employee(s)!`, 'Close', { duration: 3000, panelClass: 'success-snack' });
        }
      });
    });
  }

  get filteredRows(): AttendanceRow[] {
    if (!this.filterDept) return this.rows;
    return this.rows.filter(r => r.employee.department === this.filterDept);
  }

  get presentCount(): number { return this.rows.filter(r => r.status === 'present' || r.status === 'late').length; }
  get absentCount(): number { return this.rows.filter(r => r.status === 'absent').length; }
  get modifiedCount(): number { return this.rows.filter(r => r.modified).length; }
}
