import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsComponent } from './rooms.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from './header/header.module';
import { RouteConfigToken } from '../services/routeConfig.service';
import { FliterPipe } from './fliter.pipe';

const roomsComponents = [
  RoomsComponent,
  RoomsListComponent,
  RoomsBookingComponent,
  RoomsAddComponent,
]

const roomsPipe = [
  FliterPipe
]

@NgModule({
  declarations: [...roomsComponents, ...roomsPipe],
  imports: [CommonModule, RoomsRoutingModule,FormsModule,HeaderModule,ReactiveFormsModule],
  exports:[...roomsComponents],
  providers:[
    {
      provide:RouteConfigToken,
      useValue:{title:'Rooms'}
    }
  ]
})
export class RoomsModule {}
