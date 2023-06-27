import { Router } from "express";
import { controlFun } from "../../controllers/contacts.js";
import { validateBody } from "../../middlewares/index.js";
import { addSchema } from "../../sсhemas/contacts.js";

const router = Router();

router.get("/", controlFun.getAll);

router.get("/:id", controlFun.getById);

router.post("/", validateBody(addSchema), controlFun.add);

router.delete("/:id", controlFun.del);

router.put("/:id", validateBody(addSchema), controlFun.update);

export default router;
