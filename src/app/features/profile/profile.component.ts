import { NgClass } from '@angular/common';
import { AuthService } from '../../core/auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Post, User } from '../../core/models/post.interface';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [NgClass, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly postService = inject(PostsService);

  userProfile : User = {} as User;
  bookMarks : Post[] =[];
  posts : Post[]= [];
  userId : string ='';
  activeTab: 'posts' | 'saved' = 'posts';

  setTab(tab: 'posts' | 'saved') {
    this.activeTab = tab;
  }

  ngOnInit(): void {
     this.userId  = JSON.parse(localStorage.getItem('user')!)?._id;
    
    this.getUserProfile(this.userId);
    this.getBookMarks();
    this.getPosts(this.userId);
  }

  getUserProfile(userId:string): void{
    this.authService.getUserProfile(userId).subscribe({
      next: (response) => {
        this.userProfile = response.data.user;
        console.log("profile", response);
        
      },
      error: (error) => {
        console.error(error);
      }

    });
  }

  getBookMarks():void{
    this.authService.getBookMarks().subscribe({
      next: (response) =>{
        console.log("book marks", response);
        this.bookMarks = response.data.bookmarks;
      }
    })
  }

  getPosts(userId: string):void{
    this.authService.getUserPosts(userId).subscribe({
      next: (response) => {
        this.posts = response.data.posts;
      }
    })
  }

   deletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: (response) => {
        this.getPosts(this.userId);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  togglePostBookMark(postId:string): void{
    this.postService.toggleBookMark(postId).subscribe({
      next : (response) =>{
        this.getBookMarks();
      }
    })
  }
}
