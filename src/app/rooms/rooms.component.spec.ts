import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../services/config.service';
import { RouteConfigToken } from '../services/routeConfig.service';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { FliterPipe } from './fliter.pipe';
import { RoomsListComponent } from './rooms-list/rooms-list.component';

import { RoomsComponent } from './rooms.component';
import { RoomsService } from './services/rooms.service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
      declarations: [ RoomsComponent ,RoomsListComponent,FliterPipe],
      providers:[RoomsService,ConfigService,{
        provide:APP_SERVICE_CONFIG,
        useValue:APP_CONFIG
      },
      {
        provide:RouteConfigToken,
        useValue:{title:'Test'}
      },
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle',() => {
    component.hideRooms = false;
    component.toggle();
    expect(component.hideRooms).toBe(true)
  })
});
