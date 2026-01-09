import { ObjectId } from "mongoose"


export interface IParent {
    _id?: ObjectId
    name: string,
    email: string,
    password: string,
    phone: string,
    surname: string
}