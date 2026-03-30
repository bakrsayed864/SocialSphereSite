import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  register(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseurl}/users/signup`, data);
  }

  getUserProfile(userId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseurl}/users/${userId}/profile`);
  }

  getBookMarks(): Observable<any> {
    return this.httpClient.get(`${environment.baseurl}/users/bookmarks`);
  }

  getUserPosts(userId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseurl}/users/${userId}/posts`);
  }


  signIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseurl}/users/signin`, data);
  }

  signOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  changePassword(data: object): Observable<any> {
    console.log("from atu servie", data);

    return this.httpClient.patch(`${environment.baseurl}/users/change-password`, data);
  }

  getFollowSuggestion(): Observable<any> {
    return this.httpClient.get(`${environment.baseurl}/users/suggestions?limit=10`);
  }

  toggleUserFollow(userId:string):Observable<any>{
    return this.httpClient.put(environment.baseurl + `/users/${userId}/follow`, {})
  }
}
