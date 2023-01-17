import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  AfterViewChecked,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  OnDestroy,
  SkipSelf,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import {
  catchError,
  filter,
  map,
  Observable,
  observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { ConfigService } from '../services/config.service';
import { HeaderComponent } from './header/header.component';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotelName: string = 'Hilton Hotel';
  numberOfRooms: number = 10;
  hideRooms: boolean = false;
  rooms: Room = {
    availableRooms: 10,
    bookdedRooms: 5,
    totalRooms: 20,
  };
  title: string = 'Room List';

  selectedRoom!: RoomList;

  roomList: RoomList[] = [];

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  subscription!: Subscription;

  error$: Subject<string> = new Subject<string>();

  getError$: Observable<string> = this.error$.asObservable();

  rooms$: Observable<RoomList[]> = this.roomsService.getRoom$.pipe(
    catchError((err) => {
      // console.log(JSON.stringify(err) + '測試catch');
      this.error$.next(err.message);
      console.log('catchError');
      return of([]);
    })
  );

  priceFliter = new FormControl(0);

  roomsCount$: Observable<number> = this.roomsService.getRoom$.pipe(
    map((rooms) => {
      return rooms.length;
    })
  );

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  // roomService = new RoomsService();  //this is a service

  constructor(
    @SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // })

    this.router.events
      .pipe(
        filter((event) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event) => {
        console.log('NavigationStart', event);
      });

    this.router.events
      .pipe(
        filter((event) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event) => {
        console.log('NavigationStart', event);
      });
    // console.log(this.headerComponent);
    this.stream.subscribe((date) => {
      console.log(date);
    });
    this.stream.subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        console.log('complete');
      },
      error: (err) => {
        console.log(err);
      },
    });

    // this.subscription = this.roomsService.getRoom$.subscribe((rooms) => {
    //   this.roomList = rooms
    // })
    this.roomList = this.roomsService.getRooms();
  }

  ngDoCheck(): void {
    console.log('on changes is called');
  }

  ngAfterViewChecked(): void {
    // this.headerComponent.title = "Room view";
  }

  ngAfterViewInit(): void {
    if (this.headerComponent) {
      this.headerComponent.title = 'Room view';

      console.log(this.headerChildrenComponent);

      this.headerChildrenComponent.last.title = 'Last Title';
    }
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = ' Room List ';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: 4,
      roomType: 'deluxe room',
      amenities: 'air',
      price: 5000,
      photos: 'https://image',
      checkinTime: new Date('11-nov-2022'),
      checkoutTime: new Date('12-nov-2022'),
      rating: 5.8,
    };

    // this.roomList.push(room)
    this.roomList = [...this.roomList, room];

    // this.roomsService.addRoom(room).subscribe()
  }

  editRoom() {}

  ngOnDestroy(): void {
    // console.log('on destroy is called');

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
