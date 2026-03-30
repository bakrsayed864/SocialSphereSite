import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { Post } from '../../core/models/post.interface';
import { CommentComponent } from "../feed/components/feed-content/components/comment/comment.component";

@Component({
  selector: 'app-details',
  imports: [CommentComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {

  private readonly activeRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postService = inject(PostsService);

  postId: string = '';
  userId: string = JSON.parse(localStorage.getItem('user') || '{}')._id || '';
  postDetails: Post = {} as Post;
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param) => {
      this.postId = param.get('id')!;

      this.getPostDetails();
    });
  }


  getPostDetails(): void {
    this.postService.getSinglePost(this.postId).subscribe({
      next: (response) => {
        this.postDetails = response.data.post;
        console.log(this.postDetails);
        
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deletepost(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: (response) => {
        console.log(response);
        alert('post deleted successfully');
        this.router.navigate(['/feed']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
