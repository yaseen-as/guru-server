import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import { UserDto } from "../dtos/user.dto";
import {
  createUser,
  findExistingUserByUnique,
  findUserById,
} from "../services/user.services";
import { UniqueUserKey } from "../types/index";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";
import ApiError from "../utils/ApiError";
import { RequestUserDto } from "../schemas/user/create-user.schema";


const createUserController = asyncHandler(
  async (req: Request, res: Response):Promise<Response> => {
    
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      phoneNumber,
      timezone,
    } = req.body;
    let uniqueUserKey: UniqueUserKey = { email: email };
    const existingUserByEmail = await findExistingUserByUnique(uniqueUserKey);
    if (existingUserByEmail) {
      return res
        .status(409)
        .json(
          new ApiResponse<UserDto>(
            409,
            existingUserByEmail,
            "this email is already exist",
          ),
        );
    }

    uniqueUserKey = { phoneNumber: phoneNumber };
    const existingUserByPhoneNumber =
      await findExistingUserByUnique(uniqueUserKey);
    if (existingUserByPhoneNumber) {
      return res
        .status(409)
        .json(
          new ApiResponse<UserDto>(
            409,
            existingUserByPhoneNumber,
            "this phone number  is already exist",
          ),
        );
    }
    const avatarPath = req.file?.path;
    let avatar:UploadApiResponse | null=null;
    if (avatarPath) {
      avatar = await uploadOnCloudinary(avatarPath);
    }
    try {
      const createdUserResponse = await createUser({
        email,
        password,
        role,
        firstName,
        lastName,
        avatar: avatar?.url || "https://res.cloudinary.com/dhumuuoce/image/upload/v1735057231/xqb5b3c0qbr4f3yvxes9.png",
        phoneNumber,
        timezone,
      });
      const createdUser = await findUserById(createdUserResponse._id);
      if (!createdUser) {
        return res
          .status(404)
          .json(
            new ApiResponse<null>(404, null, "User not found after creation"),
          );
      }
      return res
        .status(201)
        .json(
          new ApiResponse<UserDto>(
            200,
            createdUser,
            "created user success fully ",
          ),
        );
    } catch (error) {
      console.log("user creation failed ");
      if(avatar){
        await deleteOnCloudinary(avatar.public_id)
      }
      throw new ApiError(500,"something went wrong")
    }
  },
);
export default {
  createUserController,
};
