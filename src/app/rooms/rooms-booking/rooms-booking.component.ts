import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css'],
})
export class RoomsBookingComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}

  id:string = this.router.snapshot.params['id'];

  // id$:Observable<number> = this.router.params.pipe(
  //   map((params) => {
  //     return params['id'];
  //   })
  // );
  
  id$:Observable<string | null> = this.router.paramMap.pipe(
    map((params) => {
      return params.get('id');
    })
  )

  ngOnInit(): void {
    // this.router.params.subscribe((params) => {
    //   this.id = params['id'];
    // });
  }
}
