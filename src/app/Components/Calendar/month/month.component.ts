import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'month-view',
  standalone: true,
  imports: [CommonModule, DayComponent],
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  public today = new Date();
  public days: Date[] = [];
  
  constructor(){}

  ngOnInit(): void {
    this.generateMonth();
  }

  public generateMonth() {
    const year = this.today.getFullYear();
    const monthIndex = this.today.getMonth();
    const numberOfDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();    
    
    for (let dayNumber = 1; dayNumber <= numberOfDaysInMonth; dayNumber++) {      
      this.days.push(new Date(year, monthIndex, dayNumber)); // Pushing Date objects
    }
    
    this.adjustForWeekStart();
    this.adjustForWeekEnd();
  }



  private adjustForWeekStart() {
    const firstDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    let dayOfWeek = firstDayOfMonth.getDay();
    let daysToAdd = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Imposto Lunedi' come primo giorno
  
    for (let i = 0; i < daysToAdd; i++) {
      this.days.unshift(new Date(this.today.getFullYear(), this.today.getMonth(), -i)); // Corrected to -i
    }
  }
  
  private adjustForWeekEnd() {
    const lastDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    let dayOfWeek = lastDayOfMonth.getDay();
    let daysToAdd = dayOfWeek === 0 ? 0 : 7 - dayOfWeek; // Imposto Domenica come ultimo giorno
  
    for (let i = 1; i <= daysToAdd; i++) {
      this.days.push(new Date(this.today.getFullYear(), this.today.getMonth() + 1, i));
    }
  }
}
