import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class RequestTrackerService {
  lastRequestUrl: any | null = null;
}
