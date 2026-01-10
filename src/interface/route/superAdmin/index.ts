import { Router } from "express";
import { superAdminPath } from "../../../shared/constant/constant";
import superAdminAdminRouter from "./admin.routes";
const superAdminRouter = Router();

superAdminRouter.use(superAdminPath.admin.base, superAdminAdminRouter);



export default superAdminRouter;
