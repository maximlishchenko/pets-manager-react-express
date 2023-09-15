import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-error";
import { Code } from "../enum/code.enum";

module.exports = function(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status)
                .json({message: err.message, errors: err.errors})
    }
    return res.status(Code.INTERNAL_SERVER_ERROR).json({message: 'Unexpected error'});
}