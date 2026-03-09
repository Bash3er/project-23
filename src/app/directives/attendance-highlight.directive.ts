import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAttendanceHighlight]',
  standalone: true
})
export class AttendanceHighlightDirective implements OnChanges {
  @Input() appAttendanceHighlight: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const statusClasses: Record<string, string> = {
      'present': 'status-present',
      'absent': 'status-absent',
      'late': 'status-late',
      'half-day': 'status-halfday',
      'holiday': 'status-holiday',
      'weekend': 'status-weekend'
    };
    // Remove all status classes first
    Object.values(statusClasses).forEach(cls =>
      this.renderer.removeClass(this.el.nativeElement, cls)
    );
    const cls = statusClasses[this.appAttendanceHighlight];
    if (cls) this.renderer.addClass(this.el.nativeElement, cls);
  }
}

@Directive({
  selector: '[appLeaveStatusHighlight]',
  standalone: true
})
export class LeaveStatusHighlightDirective implements OnChanges {
  @Input() appLeaveStatusHighlight: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    ['leave-pending', 'leave-approved', 'leave-rejected'].forEach(cls =>
      this.renderer.removeClass(this.el.nativeElement, cls)
    );
    const cls = `leave-${this.appLeaveStatusHighlight}`;
    this.renderer.addClass(this.el.nativeElement, cls);
  }
}
