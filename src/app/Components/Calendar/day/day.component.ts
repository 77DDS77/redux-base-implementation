import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'day-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements AfterViewInit {

  public WEEK = ['domenica', 'lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato'];

  @Input() day!: Date;
  @ViewChild('dayRef') dayRef!: ElementRef;

  constructor(){}

  ngAfterViewInit(): void {
    this.checkIfToday();
  }

  private checkIfToday() {
    let today = new Date();
    let isToday: boolean = this.day.getDate() === today.getDate() &&
                           this.day.getMonth() === today.getMonth() &&
                           this.day.getFullYear() === today.getFullYear();

    if (isToday) this.dayRef.nativeElement.classList.add('today')
    if (this.day < today) this.dayRef.nativeElement.classList.add('invalid')
  }
}
