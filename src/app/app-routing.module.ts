import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContainerComponent } from './rooms/container/container.component';
import { EmployeeComponent } from './rooms/employee/employee.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  // {path:'container',component:ContainerComponent}
  {
    path: 'rooms',
    loadChildren: () =>
      import('./rooms/rooms.module').then((m) => m.RoomsModule),
    canActivate: [LoginGuard],
    canLoad:[LoginGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    // path: 'booking',
    path: 'booking/:roomId',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingModule),
    // canActivate: [LoginGuard],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
