import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  private readonly httpClient = inject(HttpClient);



  getComments(postId: string): Observable<any> {
    return this.httpClient.get(environment.baseurl + `/posts/${postId}/comments`);
  }

  createComment(postId: string, commentData: any): Observable<any> {
    return this.httpClient.post(environment.baseurl + `/posts/${postId}/comments`, commentData);
  }

  editeComment(postId: string, commentId: string, data: any): Observable<any> {
    return this.httpClient.put(environment.baseurl + `/posts/${postId}/comments/${commentId}`, data);
  }

   toggleCommentLike(postId: string, commentId: string): Observable<any> {
    return this.httpClient.put(environment.baseurl + `/posts/${postId}/comments/${commentId}/like`, {});
  }

  deleteComment(postId:string, commentId:string):Observable<any>{
    return this .httpClient.delete(environment.baseurl + `/posts/${postId}/comments/${commentId}`)
  }
}
