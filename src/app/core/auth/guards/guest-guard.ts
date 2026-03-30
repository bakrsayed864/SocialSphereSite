import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
   const routerService = inject(Router);
  //get token from local storage
  const token = localStorage.getItem('token');

  //if token exists, allow access to the route
  if (token) {
    return routerService.parseUrl('/feed');
  }
  //if token does not exist, redirect to login page
  else{
    return true;
  }
};
