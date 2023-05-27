const express = require("express");

const { schemas } = require("../../models/contact");
const { isValidId, authenticate } = require("../../middlewares");
const { validateBody } = require("../../decorators");
const contactsController = require("../../controllers/contacts");

const router = express.Router();

router.use(authenticate);

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
