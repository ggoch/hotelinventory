export interface Room{
    totalRooms?:number;
    availableRooms:number;
    bookdedRooms?:number
}

export interface RoomList{
    roomNumber?:number;
    roomType:string;
    amenities:string;
    price:number;
    photos:string;
    checkinTime:Date;
    checkoutTime:Date;
    rating:number;
}