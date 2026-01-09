import { IParent } from "../../../../domain/entity/parent";
import { IApiResponse } from "../../../../shared/constant/constant";


export interface ParentLoginResponse extends IApiResponse {
    token:string,
    parent:IParent
}

export interface IParentAuthUseCase {
    login(email: string, password: string): Promise<ParentLoginResponse>;
    singup(email:string, password:string, name:string, surname:string):Promise<IApiResponse>
}