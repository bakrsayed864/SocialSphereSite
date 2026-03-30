import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const routerService = inject(Router);
  //get token from local storage
  const token = localStorage.getItem('token');

  //if token exists, allow access to the route
  if (token) {
    return true;
  }
  //if token does not exist, redirect to login page
  
  else{
    return routerService.parseUrl('/login');
  }
};
