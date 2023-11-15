import { RowDataPacket } from 'mysql2';

export default interface IUser{
    uuid?: string,
    email: string,
    pwd: string,
    phone: string,
    name: string,
    fName?: string,
    lName?: string,
    curp: string,
    avatar?: string,
    avenue: string,
    extNumber: string,
    intNumber?: string,
    city: string,
    state: string,
    country: string,
    utype: string,
    status: string
}
