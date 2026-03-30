import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../core/auth/services/auth.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);

  userName: string = '';
  prophileImage: string = '/assets/default-profile.png';
  ngOnInit(): void {
   initFlowbite(); 
   const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.username || 'John Doe';
    this.prophileImage = user.photo || '/assets/default-profile.png';
  }

  logOut() {
    this.authService.signOut();
  }
}
