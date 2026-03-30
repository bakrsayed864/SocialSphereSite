import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly httpClient = inject(HttpClient);

  getAllNotifications(): Observable<any>{
    return this.httpClient.get(environment.baseurl + `/notifications?page=1&limit=10`)
  }

  getNotifications(unread:boolean): Observable<any>{
    return this.httpClient.get(environment.baseurl + `/notifications?unread=${unread}&page=1&limit=10`);
  }

  MarkAllAsRead():Observable<any>{
    return this.httpClient.patch(environment.baseurl + `/notifications/read-all`, {});
  }

  markNotificationAsRead(notificationId:string): Observable<any>{
    return this.httpClient.patch(environment.baseurl + `/notifications/${notificationId}/read`, {});
  }
}
