const { nanoid } = require("nanoid");

const { ctrlWrapper } = require("../../decorators");
const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const { PROJECT_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404);
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verificationToken = nanoid();

  const verifyEmail = {
    to: email,
    subject: "Hello, welcome to our serves! Verify email",
    html: `<a target="_blank" href="${PROJECT_URL}/api/users/verify/${verificationToken}">Click to verify</a>`,
  };
  await sendEmail(verifyEmail);

  user.verificationToken = verificationToken;

  await user.save();

  res.json({ message: "Verification email sent" });
};

module.exports = ctrlWrapper(resendVerifyEmail);
