import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges,OnDestroy {
  @Input() rooms: RoomList[] = [];
  @Input() title: string = '';
  @Input() price:number | null = null;

  @Output() roomSelected = new EventEmitter<RoomList>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title'])
      this.title = changes['title'].currentValue.toUpperCase();
  }

  roomSelect(room: RoomList) {
    this.roomSelected.emit(room);
  }

  ngOnDestroy(): void {
    console.log('on destroy is called');
  }
}
