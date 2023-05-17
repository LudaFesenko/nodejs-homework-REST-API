const express = require("express");

const { schemas } = require("../../models/contact");

const { isValidId } = require("../../middlewares");
const { validateBody } = require("../../decorators/validateBody");

const contactsController = require("../../controllers/contacts-controllers");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

router.delete("/:contactId", isValidId, contactsController.removeContact);

module.exports = router;
