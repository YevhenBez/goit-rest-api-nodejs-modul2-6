const express = require("express");

const ctrl = require("../../controllers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../schemas/joi");

const router = express.Router();

router.get("/", authenticate, ctrl.listContactsCtrls);

router.get("/:id", authenticate, isValidId, ctrl.getContactByIdCtrls);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContactCtrls
);

router.delete("/:id", authenticate, isValidId, ctrl.removeContactCtrls);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactCtrls
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContactCtrls
);

module.exports = router;
