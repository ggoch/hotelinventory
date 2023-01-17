import { Component, Self } from '@angular/core';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  // providers:[RoomsService]
})
export class EmployeeComponent {
  employee:string = "Jhon";

  // constructor(@Self() private roomServicve:RoomsService){}
  constructor( private roomServicve:RoomsService){}
}
