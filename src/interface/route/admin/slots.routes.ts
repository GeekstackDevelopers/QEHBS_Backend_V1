import { Router } from "express";
import { SlotsController } from "../../controller/admin/slots.controller";
import { SlotUsecase } from "../../../usecase/admin/slots/slots.usecase";
import { SlotRepository } from "../../../infrastructure/repository/slot/slot.repo";
import { bannerImageUpload } from "../../middleware/image.upload.middleware";

const slotsRepo = new SlotRepository();
const slotsUsecase = new SlotUsecase(slotsRepo);
const slotsController = new SlotsController(slotsUsecase);

const slotsRouter = Router();

slotsRouter.post(
    "/create",
    bannerImageUpload,
    slotsController.createSlot.bind(slotsController)
);
slotsRouter.get(
    "/",
    bannerImageUpload,
    slotsController.finAll.bind(slotsController)
);
slotsRouter.get(
    "/course/:courseId",
    slotsController.getSlotsByCourseId.bind(slotsController)
);

export default slotsRouter;