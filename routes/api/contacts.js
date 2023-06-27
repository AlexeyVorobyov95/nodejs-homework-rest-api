import { Router } from "express";
import { controlFun } from "../../controllers/contacts.js";
import { validateBody, isValidId } from "../../middlewares/index.js";
import { addSchema, updateFavoriteSchema } from "../../models/contact.js";

const router = Router();

router.get("/", controlFun.getAll);

router.get("/:id", isValidId, controlFun.getById);

router.post("/", validateBody(addSchema), controlFun.add);

router.delete("/:id", isValidId, controlFun.del);

router.put("/:id", isValidId, validateBody(addSchema), controlFun.update);

router.patch("/:id/favorite", isValidId, validateBody(updateFavoriteSchema), controlFun.updateStatusContact);

export default router;
