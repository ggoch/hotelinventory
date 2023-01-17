import { InjectionToken } from '@angular/core';

export const LocalStorageToken = new InjectionToken<any>('localStoryageToken', {
  providedIn: 'root',
  factory() {
    return localStorage;
  },
});
