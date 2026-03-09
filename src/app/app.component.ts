import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MatSidenavModule, MatIconModule, MatButtonModule, MatListModule, NavbarComponent],
  template: `
    <div class="app-shell">
      <app-navbar (menuToggle)="sidenavOpen.set(!sidenavOpen())"></app-navbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav [opened]="sidenavOpen()" mode="over" class="sidenav" (closedStart)="sidenavOpen.set(false)">
          <div class="sidenav-header">
            <span>Navigation</span>
            <button mat-icon-button (click)="sidenavOpen.set(false)"><mat-icon>close</mat-icon></button>
          </div>
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" (click)="sidenavOpen.set(false)">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Dashboard</span>
            </a>
            <a mat-list-item routerLink="/employees" (click)="sidenavOpen.set(false)">
              <mat-icon matListItemIcon>people</mat-icon>
              <span matListItemTitle>Employees</span>
            </a>
            <a mat-list-item routerLink="/attendance" (click)="sidenavOpen.set(false)">
              <mat-icon matListItemIcon>schedule</mat-icon>
              <span matListItemTitle>Attendance</span>
            </a>
            <a mat-list-item routerLink="/leave-request" (click)="sidenavOpen.set(false)">
              <mat-icon matListItemIcon>event_note</mat-icon>
              <span matListItemTitle>Leave Request</span>
            </a>
            <a mat-list-item routerLink="/leave-approval" (click)="sidenavOpen.set(false)">
              <mat-icon matListItemIcon>approval</mat-icon>
              <span matListItemTitle>HR Panel</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="main-content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-shell { height: 100vh; display: flex; flex-direction: column; }
    .sidenav-container { flex: 1; margin-top: 64px; }
    .main-content { min-height: calc(100vh - 64px); }
    .sidenav { width: 260px; padding-top: 8px; }
    .sidenav-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; font-weight: 700; }
  `]
})
export class AppComponent {
  sidenavOpen = signal(false);
}
