
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edite-post',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edite-post.component.html',
  styleUrl: './edite-post.component.css',
})
export class EditePostComponent implements OnInit {

  private readonly postsService = inject(PostsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly routerService = inject(Router);

  body: FormControl = new FormControl('');
  privacy: FormControl = new FormControl('public');

  file: File | undefined;
  fileDataUrl: string | ArrayBuffer | null | undefined;

  postId: string = '';
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.postId = params.get('id')!;
      this.showPostDetails();
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
    formData.append('body', this.body.value);
    formData.append('privacy', this.privacy.value);
    if (this.file) {
      formData.append('image', this.file);
    }

    console.log("post", formData);
    
    this.postsService.updatePost(this.postId, formData).subscribe({
      next: (response) => {
        form.reset();
        this.fileDataUrl = null;
        this.routerService.navigate(['/feed']);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.file = undefined;
      }
    });
  }

  showPostDetails(): void {
    this.postsService.getSinglePost(this.postId).subscribe({
      next: (response) => {
        this.body.setValue(response.data.post.body);
        this.privacy.setValue(response.data.post.privacy);
        this.fileDataUrl = response.data.post.image;
        console.log(response);
        
      }
    });
  }
  }
