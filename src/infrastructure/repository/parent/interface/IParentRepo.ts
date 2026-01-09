import { IParent } from "../../../../domain/entity/parent";



export interface IParentRepo {

    findByEmail(email:string):Promise<IParent | null>
    signup(parent:Partial<IParent>):Promise<IParent>
}