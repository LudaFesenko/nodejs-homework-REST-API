const path = require("path");

const Jimp = require("jimp");

const { ctrlWrapper } = require("../../decorators");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);

  const image = await Jimp.read(tempUpload);

  await image.resize(250, 250).write(resultUpload);

  const avatarURL = path.join("/avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL: `${avatarURL}"тут будет ссылка на изображение"`,
  });
};

module.exports = ctrlWrapper(updateAvatar);
