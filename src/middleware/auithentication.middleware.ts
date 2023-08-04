import express from "express";
import JsonWebToken, { JwtPayload } from "jsonwebtoken";
import RequestWithUser from "../utils/requestWithUser";


const authenticate = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const token = getTokenFromRequestHeader(req);
        const payload: JwtPayload = JsonWebToken.verify(token, "ABCDE") as JwtPayload;
        req.name = payload.name;
        req.email = payload.email;
        req.role = payload.role;
        next();
    }
    catch (error) {
        next(error);
    }
}

const getTokenFromRequestHeader = (req: express.Request) => {
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
    return token;
}

export default authenticate