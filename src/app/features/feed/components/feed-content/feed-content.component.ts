import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './components/comment/comment.component';
import { RouterLink } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Follower } from '../../follower.interface';

@Component({
  selector: 'app-feed-content',
  imports: [ReactiveFormsModule, CommentComponent, RouterLink, NgClass],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly authService = inject(AuthService);
  private readonly spinnerService = inject(NgxSpinnerService);

  postContent: FormControl = new FormControl('');
  postPrivacy: FormControl = new FormControl('public');

  postsList: Post[] = [];
  file: File | undefined;
  fileDataUrl: string | ArrayBuffer | null | undefined;

  userId: string = JSON.parse(localStorage.getItem('user') || '{}')._id || '';
  ngOnInit(): void {
    this.getAllPosts();
  }


  getAllPosts(): void {
    this.spinnerService.show();
    this.postsService.getAllPosts().subscribe({
      next: (response) => {

        this.postsList = response.data.posts;
        console.log(this.postsList);
        this.spinnerService.hide();
      },
      error: (error) => {
        console.error(error);
      }

    });
  }


  getFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      console.log("files:", this.file);
    }

    if (this.file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        this.fileDataUrl = e.target?.result;
      };
    }
  }

  submitForm(event: Event, form: HTMLFormElement): void {
    event.preventDefault();

    const formData = new FormData();
    formData.append('body', this.postContent.value);
    formData.append('privacy', this.postPrivacy.value);
    if (this.file) {
      formData.append('image', this.file);
    }

    this.postsService.createPost(formData).subscribe({
      next: (response) => {
        form.reset();
        this.fileDataUrl = null;
        this.getAllPosts();
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.file = undefined;
      }
    });
  }

  deletePost(postId: string): void {
    this.postsService.deletePost(postId).subscribe({
      next: (response) => {
        this.getAllPosts();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  toggleLike(postId: string): void {
    this.postsService.toggleLike(postId).subscribe({
      next: (response) => {
        this.getAllPosts();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  toggleBookmark(postId:string):void{
    this.postsService.toggleBookMark(postId).subscribe({
      next: (Response) =>{
        this.getAllPosts();
      }
    })
  }

 
}