import { Injectable,Inject } from '@angular/core';
import { RoomList } from '../rooms';
// import { environment } from '../../../environments/environments'; 
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { IAppConfig } from '../AppConfig/appconfig.interface';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {shareReplay} from "rxjs";
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList:RoomList[] = [
    {
      roomNumber:1,
      roomType:"deluxe room",
      amenities:"air",
      price:500,
      photos:'https://image',
      checkinTime:new Date('11-nov-2022'),
      checkoutTime:new Date('12-nov-2022'),
      rating:4.5,
    },
    {
      roomNumber:2,
      roomType:"deluxe room",
      amenities:"air",
      price:1000,
      photos:'https://image',
      checkinTime:new Date('11-nov-2022'),
      checkoutTime:new Date('12-nov-2022'),
      rating:3.4,
    },
    {
      roomNumber:3,
      roomType:"deluxe room",
      amenities:"air",
      price:1500,
      photos:'https://image',
      checkinTime:new Date('11-nov-2022'),
      checkoutTime:new Date('12-nov-2022'),
      rating:2.6,
    }
  ];

  // header = new HttpHeaders({'token':'1234567kf'})

  getRoom$ = this.http.get<RoomList[]>('/api/rooms',{
    // headers:this.header
  }).pipe(
    shareReplay(1),
  );

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config:IAppConfig,
    private http:HttpClient,
    private configService:ConfigService
  ) { 
    console.log(this.config.apiEndpoint);
    console.log('Room Service Initialized...');
  }

  createRoom<T>(room:T):T{
    const roomResult:any = {};
    let key:keyof T;

    for(key in room){
      roomResult[key] = room[key];
    }
    return roomResult;
  }

  getRooms(){
    return this.roomList;
  }

  getRoomsRequest(){
    return this.http.get<RoomList[]>('/api/rooms',{
      // headers:this.header
    });
  }

  addRoom(room:RoomList){
    return this.http.post<RoomList[]>('/api/rooms',room);
  }

  addRoomLocal(room:RoomList){
    const _room = this.createRoom(room);
    // const _room = room; //用此方法會傳址過去，之後會被影響，需用create新建實例
    _room.roomNumber = this.roomList.length + 1;
    return this.roomList.push(_room);
  }

  editRooms(room:RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
  }

  deleteRooms(id:string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }
}
