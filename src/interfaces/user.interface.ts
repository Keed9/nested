import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket{
    uuid: string,
    phone: string,
    firstName: string,
    lastName: string,
    curp: string,
    img: string,
    address: string,
    uType: string,
}
