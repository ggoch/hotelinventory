import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css']
})
export class RoomsAddComponent {
  room:RoomList = {
    roomType:'',
    amenities:'',
    price:0,
    checkinTime:new Date(),
    checkoutTime:new Date(),
    photos:'',
    rating:0
  };

  constructor(private roomService:RoomsService){}

  addRoom(roomsForm:NgForm){
    // this.roomService.addRoom(this.room).subscribe((date) => {console.log(date)})
    this.roomService.addRoomLocal(this.room);
    roomsForm.resetForm({
      roomType:'',
      amenities:'',
      price:0,
      checkinTime:new Date(),
      checkoutTime:new Date(),
      photos:'',
      rating:0
    });
  }
}
