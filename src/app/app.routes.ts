import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ManinLayoutComponent } from './layout/manin-layout/manin-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { guestGuard } from './core/auth/guards/guest-guard';
import { DetailsComponent } from './features/details/details.component';
import { EditePostComponent } from './features/edite-post/edite-post.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path:'', component: AuthLayoutComponent,
        canActivate:[guestGuard],
         children:[
        {path: 'login', component:LoginComponent, title: 'Login'},
        {path: 'register', component:RegisterComponent, title: 'Register'},
        {path:'forgetpassword', component: ForgetPasswordComponent, title: 'Forget Password'},
    ]},
    {path:'', component: ManinLayoutComponent,
        canActivate:[authGuard],
         children: [
        {path: 'feed', component: FeedComponent, title: 'Feed'},
        {path: 'profile', component: ProfileComponent, title: 'Profile'},
        {path: 'notifications', component: NotificationsComponent, title: 'Notifications'},
        {path: 'details/:id', component: DetailsComponent, title: 'Details Page'},
        {path: 'editepost/:id', component: EditePostComponent, title: 'Edit Post'},
        {path: 'changepassword', component: ChangePasswordComponent, title: 'Change Password'}
    ]},
    {path: '**', component: NotfoundComponent, title: 'Not Found'},
];
