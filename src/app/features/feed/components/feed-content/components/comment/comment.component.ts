import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { Comment } from './comment.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent implements OnInit {

  private readonly commentService = inject(CommentService);

  content: FormControl = new FormControl('');
  file: File | undefined;
  fileDataUrl: string | ArrayBuffer | null | undefined;


  @Input() postId: string = '';

  commentList: Comment[] = [];

  userId: string = '';
  editedCommentId: string = '';
  ngOnInit(): void {
    this.getComments();
    this.userId = JSON.parse(localStorage.getItem('user')!)?._id;
  }


  getComments(): void {
    this.commentService.getComments(this.postId).subscribe({
      next: (response) => {
        console.log(response);
        this.commentList = response.data.comments;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getCommentFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      console.log('file: ', this.file);
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
    formData.append('content', this.content.value);
    if (this.file) {
      formData.append('image', this.file);
    }

    if (this.editedCommentId === '') {
      this.commentService.createComment(this.postId, formData).subscribe({
        next: (response) => {
          form.reset();
          this.fileDataUrl = null;
          this.getComments();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.file = undefined;
        }
      });
    }

    else{
      this.commentService.editeComment(this.postId, this.editedCommentId, formData).subscribe({
        next: (response) => {
          form.reset();
          this.editedCommentId = '';
          this.fileDataUrl=null;
          this.getComments();
        },
        complete: () => {
          this.file = undefined;
        }
      })
    }
  }

  toggleLike(commentId: string): void {
    this.commentService.toggleCommentLike(this.postId, commentId).subscribe({
      next: (response) => {
        this.getComments();
      }
    })
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(this.postId, commentId).subscribe({
      next: () => {
        this.getComments();
      }
    })
  }

  preparteEdite(commentId: string, content: string, image?: string) {
    this.content.setValue(content);
    if (image) {
      this.fileDataUrl = image;
    }
    this.editedCommentId = commentId;
  }
}
