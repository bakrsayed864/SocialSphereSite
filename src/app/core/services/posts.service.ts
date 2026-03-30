import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);


  getAllPosts(): Observable<any> {
    return this.httpClient.get(environment.baseurl + `/posts`);
  }

  createPost(postData: any): Observable<any> {
    return this.httpClient.post(environment.baseurl + `/posts`, postData);
  }

  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(environment.baseurl + `/posts/${postId}`);
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(environment.baseurl + `/posts/${postId}`);
  }

  updatePost(postId: string, postData: any): Observable<any> {
    return this.httpClient.put(environment.baseurl + `/posts/${postId}`, postData);
  }

  toggleLike(postId: string): Observable<any> {
    return this.httpClient.put(environment.baseurl + `/posts/${postId}/like`, {});
  }

  toggleBookMark(postId: string): Observable<any> {
    return this.httpClient.put(environment.baseurl + `/posts/${postId}/bookmark`, {});
  }

 
}
