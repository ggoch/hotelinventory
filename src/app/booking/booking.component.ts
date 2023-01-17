import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { BookingService } from './booking.service';
import { mergeMap } from 'rxjs';
import { CustomValidator } from '../validators/custom-validators';
import { ActivatedRoute, Route } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId')
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: roomId, disabled: true },
          { validators: [Validators.required] }
        ),
        checkInDate: new Date(),
        checkOutDate: new Date(),
        bookingStart: ['', { updateOn: 'blur' }],
        bookingAmount: 0,
        guestList: this.fb.group({
          title: ['', [Validators.required, Validators.maxLength(5)]],
        }),
        guests: this.fb.array([this.addGuestControl()]),
        fnc: new FormControl(false, { validators: Validators.requiredTrue }),
      },
      { updateOn: 'blur' ,validators:[CustomValidator.Validatedate]}
    );

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe(((data) => {
    //   this.bookingService.bookRoom(this.bookingForm.value).subscribe()
    // }));

    // this.bookingForm.valueChanges.pipe(
    //   mergeMap((data) => {
    //     return this.bookingService.bookRoom(data);
    //   })
    // ).subscribe()
  }

  getBookingData() {
    this.bookingForm.patchValue({
      checkInDate: new Date(),
      checkOutDate: new Date(),
      bookingStart: 'fruk',
      bookingAmount: 0,
      guestList: {
        title: 'efe',
      },
      guests: [],
      fnc: false,
    });
  }

  addBooking() {
    console.log(this.bookingForm.value);
    // this.bookingService.bookRoom(this.bookingForm.value).subscribe(((data) => {

    // }))
    this.bookingForm.reset({
      roomId: '',
      checkInDate: new Date(),
      checkOutDate: new Date(),
      bookingStart: '',
      bookingAmount: 0,
      guestList: {
        title: '',
      },
      guests: [],
      fnc: false,
    });
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.fb.group({
      guestName: [
        '',
        [
          Validators.required,
          CustomValidator.ValidatorName,
          CustomValidator.ValidateSpecialChar('*'),
        ],
      ],
      age: new FormControl(''),
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport'))
      this.bookingForm.removeControl('passport');
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}

export interface Booking {
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  bookingStart: string;
  bookingAmount: number;
  guestList: Guest[];
}

interface Guest {
  title: string;
}
