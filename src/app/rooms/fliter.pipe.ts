import { Pipe, PipeTransform } from '@angular/core';
import { RoomList } from './rooms';

@Pipe({
  name: 'fliter'
})
export class FliterPipe implements PipeTransform {

  transform(value: RoomList[], price: number | null): RoomList[] {
    if(price == null || price == 0) return value

    return value.filter((room) => room.price <= price);
  }

}
