import { UserDto } from "../dtos/user.dto";

export const mapUserToDto = (user: any): UserDto => ({
    _id: user._id.toString(),
    email: user.email,
    role: user.role as "STUDENT" | "MENTOR",
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    phoneNumber: user.phoneNumber,
    timezone: user.timezone,
    isVerified: user.isVerified,
    lastActive: user.lastActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
  