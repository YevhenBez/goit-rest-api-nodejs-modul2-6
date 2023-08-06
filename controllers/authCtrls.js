const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const gravatar = require("gravatar");

const path = require("path");

const fs = require("fs/promises");

const { nanoid } = require("nanoid");

const dotenv = require("dotenv");

const { User } = require("../models/user");

const { HttpError, ctrlWrapper, resizeImage, sendEmail } = require("../helpers");

dotenv.config();

const { SECRET_KEY, BASE_URL} = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    subscription: newUser.subscription,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404, "User not found")
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" })
  
  res.status(200).json({
    message: "Verification successful"
  })
}

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email not found")
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed")
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click verify email</a>`
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification successful"
  })
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    name: user.name,
    email: user.email,
    subscription: user.subscription,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.status(200).json({
    name,
    email,
    subscription: user.subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  const { path: tempUpload, originalname } = req.file;

  await resizeImage(tempUpload);

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
