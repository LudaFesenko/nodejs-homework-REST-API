const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200, "contact deleted").json(result);
};

module.exports = ctrlWrapper(removeContact);
