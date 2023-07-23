const express = require("express");

const ctrl = require("../../controllers");

const { validateBody } = require("../../middlewares");

const { isValidId }  = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.listContactsCtrls);

router.get("/:id", isValidId, ctrl.getContactByIdCtrls);

router.post("/", validateBody(schemas.addSchema), ctrl.addContactCtrls);

router.delete("/:id", isValidId, ctrl.removeContactCtrls);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactCtrls
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContactCtrls
);

module.exports = router;
