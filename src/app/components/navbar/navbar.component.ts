import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatBadgeModule, MatDividerModule, MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  auth = inject(AuthService);
  theme = inject(ThemeService);
  router = inject(Router);

  get user() { return this.auth.getUser(); }
  get isHR() { return this.auth.isHR(); }
  get isDark() { return this.theme.isDark(); }

  switchRole(role: 'admin' | 'hr' | 'employee') {
    this.auth.login(role);
    this.router.navigate(['/dashboard']);
  }

  toggleTheme() { this.theme.toggle(); }
}
