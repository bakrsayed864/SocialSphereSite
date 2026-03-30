import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Follower } from '../../follower.interface';

@Component({
  selector: 'app-right-side',
  imports: [],
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.css',
})
export class RightSideComponent implements OnInit{

  
  private readonly authService= inject(AuthService);
  
  followSugestions : Follower[] = [];
  
   ngOnInit(): void {
    this.getFollowSuggestion();
  }

   getFollowSuggestion():void{
    this.authService.getFollowSuggestion().subscribe({
      next: (response) => {
        console.log("follow suggestion", response);
        this.followSugestions = response.data.suggestions;
      }
    })
  }


  toggleUserFollow(userId:string):void{
    this.authService.toggleUserFollow(userId).subscribe({
      next: (response)=>{
        console.log(response);
        this.getFollowSuggestion()
      }
    })
  }
}
