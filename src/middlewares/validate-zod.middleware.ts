
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const Validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate the request data
      const parsedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      // Assign validated data back to the request object
      console.log("validation completed");
      req.body=parsedData.body
      req.query = parsedData.query;
      req.params = parsedData.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
          res.status(400).json({
          message: "Validation error",
          errors: error.errors, // Provide detailed validation issues
        });
      }else{
        next(error);
      }
    }
  };

