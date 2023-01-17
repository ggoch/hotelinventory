import { AfterContentInit, Component, ViewChild,ContentChild, Host } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  providers:[RoomsService]
})
export class ContainerComponent implements AfterContentInit{
  @ContentChild(EmployeeComponent) employee!:EmployeeComponent;

  constructor(@Host() private roomsService:RoomsService){}

  ngAfterContentInit(): void {
    console.log(this.employee);
    // this.employee.employee = "Rick";      
  }
}
