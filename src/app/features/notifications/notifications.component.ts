import { Component, inject, OnInit } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { NgClass } from '@angular/common';
import { Notification } from './notification.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [NgClass, RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit{
  private readonly notificationsService = inject(NotificationsService);

  activeTab : 'All' | 'Unread' = 'All'


  setTab(tab: 'All' | 'Unread') {
    this.activeTab = tab;
  }

  allNotifications : Notification[] = [];
  unReadNotifications : Notification[] = [];

  ngOnInit(): void {

    this.notificationsService.getAllNotifications().subscribe({
      next: (response)=>{
        console.log(response);
        this.allNotifications = response.data.notifications;
      }
    })

    this.notificationsService.getNotifications(false).subscribe({
      next: (response)=>{
        console.log("unread", response);
        this.unReadNotifications = response.data.notifications;
      }
    })
  }

  markAllAsRead(): void{
    this.notificationsService.MarkAllAsRead().subscribe({
      next: (response) =>{
        console.log(response);
        
      }
    })
  }

  markNotificationAsRead(notificationId:string): void{
    this.notificationsService.markNotificationAsRead(notificationId).subscribe({
      next: (response)=>{
        console.log(response);
        
      }
    })
  }

}
