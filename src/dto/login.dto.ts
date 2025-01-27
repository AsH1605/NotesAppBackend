import { User } from "../models/user.model";

export interface LoginUserResponse{
    id_token: string,
    user: User
}

export interface LoginUserRequest{
    username: string, 
    password: string
}