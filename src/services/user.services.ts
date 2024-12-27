import { CreateUserDto, UserDto } from "../dtos/user.dto";
import { User } from "../models/user.models";
import { UniqueUserKey } from "../types";
import { mapUserToDto } from "../utils/user.mapper";
import ApiError from "../utils/ApiError"


// types


export const findExistingUserByUnique = async (unique: UniqueUserKey): Promise<UserDto | null> => {
  try {
    const existingUser = await User.findOne(unique).lean();
    if(!existingUser){
      return null
    }
    const user=mapUserToDto(existingUser)
    return user;
  } catch (error) {
    console.error("Database error:", error);
    throw new ApiError(500,'Database error occurred by find existing user');
  }
};
export const createUser = async (createUserData: CreateUserDto): Promise<UserDto> => {
  try {
    const createdUser = await User.create(createUserData);
        const user=mapUserToDto(createdUser)
        return user;
  } catch (error) {
    console.error("Database error:", error);
    throw new ApiError(500,'Database error occurred by create user');
  }
};

export const findUserById = async (userId:string): Promise<UserDto | null> => {
  try {
    const userById = await User.findById(userId).lean();
    if(!userById){
      return null
    }
    const user=mapUserToDto(userById)
    return user;
  } catch (error) {
    console.log("Database error:", error);
    throw new ApiError(500,'Database error occurred by find user by id');
  }
};

// export const getAvatarUrl= async(avatarLocalPath:string)=>{
//     try {
//       const response = await uploadOnCloudinary(avatarLocalPath);
//       console.log("avatar uploaded to cloudinary");
      
//       if(!response?.url){
//         return null
//       }
//       return response?.url
//     } catch (error) {
//       console.log("error uploadin avatar to coludinory",error)
//       throw new ApiError(500,'Database error occurred by find user by id');

//     }
// }