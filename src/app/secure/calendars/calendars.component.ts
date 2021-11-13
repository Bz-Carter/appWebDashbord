import { Component, OnInit } from '@angular/core';
import { Calendar } from "src/app/interfaces/calendar";
import { Response } from "src/app/interfaces/response";
import { CalendarService } from "src/app/services/calendar.service";

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent implements OnInit {

  annonces: Calendar[] = [];
  constructor(private calendarServices: CalendarService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {

    this.calendarServices.all().subscribe((res: Response) => {
      this.annonces = res.data;
    });
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûre de vouloir supprimer cet enregistrement?')) {
      this.calendarServices.delete(id).subscribe((res) => {
        this.annonces = this.annonces.filter((el) => el.id !== id);
      });
    }
  }

}
