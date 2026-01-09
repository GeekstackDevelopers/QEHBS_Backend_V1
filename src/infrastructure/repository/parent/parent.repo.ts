import { IParent } from "../../../domain/entity/parent";
import parentModel from "../../../domain/model/parent.model";
import { IParentRepo } from "./interface/IParentRepo";



export class ParentRepo implements IParentRepo{

    constructor(){}


     async findByEmail(email: string): Promise<IParent | null> {
         
           const parent = await parentModel.findOne({email})

           return parent

     }

     async signup(parent: Partial<IParent>): Promise<IParent> {
         
            const newParent = new parentModel(parent)

            return await newParent.save()
     }
}