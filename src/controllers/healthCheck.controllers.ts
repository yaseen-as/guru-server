import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";

const healthCheck = () =>
  asyncHandler((req: Request, res: Response) => {
    return res
      .status(200)
      .json(new ApiResponse<string>(200, "ok", "health ok"));
  });

export default healthCheck;
