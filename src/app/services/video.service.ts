import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService extends RestService {
  endpoint(): string {
    return 'videos';
  }
}
