import express from "express";
import { Role } from "./role.enum";

interface RequestWithUser extends express.Request {
    name: string,
    email: string,
    role: Role,
}

export default RequestWithUser
