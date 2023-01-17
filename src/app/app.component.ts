import { Component, ViewChild,ViewContainerRef,ElementRef,OnInit,AfterViewInit, Optional, Inject } from '@angular/core';
import { LoggerService } from './logger.service';
import {RoomsComponent} from './rooms/rooms.component';
import { LocalStorageToken } from './localstorage.token';  
import { InitService } from './init.service';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'hoteninventoryapp';
  
  role='admin';

  @ViewChild('name',{static:true}) name!:ElementRef;

  constructor(
    @Optional() private loggerService:LoggerService,
    @Inject(LocalStorageToken) private localStorage:any,
    private initService:InitService
    ){
      console.log(this.initService.config)
    }

  ngOnInit(){
    this.loggerService?.log('AppComponent.ngOnInit()')
    
    this.name.nativeElement.innerText = "Hitol Hotel";

    this.localStorage.setItem('name','Hitol Hotel');
  }

  ngAfterViewInit(){}
  
  //動態創建組件
  // @ViewChild('user',{read:ViewContainerRef}) vcr!:ViewContainerRef;
  
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
  
  
}
