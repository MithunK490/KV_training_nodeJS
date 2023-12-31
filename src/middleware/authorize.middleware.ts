import RequestWithUser from "../utils/requestWithUser";
import express from "express";
import { Role } from "../utils/role.enum";
import HttpException from "../exception/http.exception";

const authorize = (role: Role[]) => {
    return async (
        req: RequestWithUser,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const role = req.role;
            if (!role.includes(req.role)) {
                throw new HttpException(403, "You are not authorized to perform this task");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
}

export default authorize;