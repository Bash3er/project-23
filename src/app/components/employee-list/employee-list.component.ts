import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { EmployeeService } from '../../services/employee.service';
import { Employee, DEPARTMENTS } from '../../models/models';
import { FilterEmployeesPipe, InitialsPipe } from '../../pipes/filter-employees.pipe';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule,
    MatCardModule, MatIconModule, MatButtonModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatChipsModule, MatTooltipModule, MatDialogModule,
    MatSnackBarModule, MatMenuModule,
    FilterEmployeesPipe, InitialsPipe
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  private empSvc = inject(EmployeeService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  employees: Employee[] = [];
  searchTerm = '';
  selectedDept = '';
  selectedStatus = '';
  viewMode: 'grid' | 'table' = 'grid';
  departments = DEPARTMENTS;
  loading = true;

  displayedColumns = ['employeeId', 'name', 'department', 'designation', 'phone', 'joinDate', 'status', 'actions'];

  ngOnInit(): void {
    this.empSvc.getEmployees().subscribe({
      next: data => { this.employees = data; this.loading = false; },
      error: () => { this.employees = this.empSvc.getMockEmployees(); this.loading = false; }
    });
  }

  openAddDialog(): void {
    const ref = this.dialog.open(EmployeeFormComponent, { width: '560px', panelClass: 'custom-dialog' });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.empSvc.addEmployee(result).subscribe(() => {
          this.snackBar.open('Employee added successfully!', 'Close', { duration: 3000, panelClass: 'success-snack' });
          this.ngOnInit();
        });
      }
    });
  }

  openEditDialog(emp: Employee): void {
    const ref = this.dialog.open(EmployeeFormComponent, {
      width: '560px', panelClass: 'custom-dialog', data: emp
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.empSvc.updateEmployee(emp.id, result).subscribe(() => {
          this.snackBar.open('Employee updated!', 'Close', { duration: 3000 });
          this.ngOnInit();
        });
      }
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empSvc.deleteEmployee(id).subscribe(() => {
        this.snackBar.open('Employee deleted.', 'Close', { duration: 3000 });
        this.employees = this.employees.filter(e => e.id !== id);
      });
    }
  }

  get filteredCount(): number {
    return this.employees.filter(e => {
      const ms = !this.searchTerm || e.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || e.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const md = !this.selectedDept || e.department === this.selectedDept;
      const mst = !this.selectedStatus || e.status === this.selectedStatus;
      return ms && md && mst;
    }).length;
  }
}
