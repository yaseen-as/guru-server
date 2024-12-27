import { RequestUserDto } from "../schemas/user/create-user.schema";

export interface UserDto {
  _id: string; // MongoDB ObjectId
  email: string;
  role: "STUDENT" | "MENTOR";
  firstName: string;
  lastName: string;
  avatar: string;
  phoneNumber: string;
  timezone: string;
  isVerified: boolean;
  lastActive?: Date | null ;
  createdAt: Date;
  updatedAt: Date;
}


export interface CreateUserDto extends RequestUserDto{
  avatar:string;
}