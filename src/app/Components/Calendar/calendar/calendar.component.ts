import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthComponent } from '../month/month.component';

@Component({
  selector: 'calendar-component',
  standalone: true,
  imports: [CommonModule, MonthComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

}
