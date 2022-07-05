import { Role } from "./role";
import { UserModel } from "./UserModel";

export class User implements UserModel{

    id!: number;
    email! : string ;
    username!: string ;
    password!: string ;
    imageUrl! : string ;
    role!: string  ;
    token! : string ;

    
}