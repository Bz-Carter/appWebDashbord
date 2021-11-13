import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService extends RestService {
  endpoint(): string {
    return 'calendar';
  }
}
