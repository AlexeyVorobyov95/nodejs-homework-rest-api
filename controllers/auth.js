import jsonwebtoken from "jsonwebtoken";
import {
  HttpError,
  __dirname,
  contrWrapper,
  imageUpdate,
} from "../helpers/index.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";

const { SECRET_KEY } = process.env;
const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(payload.id, { token }, { new: true });

  res.json({
    token,
  });
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "logout success",
  });
};

const changeSub = async (req, res, next) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

  imageUpdate(filename);
  
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export let controlUserFun = {
  register: contrWrapper(register),
  login: contrWrapper(login),
  getCurrent: contrWrapper(getCurrent),
  logout: contrWrapper(logout),
  changeSub: contrWrapper(changeSub),
  updateAvatar: contrWrapper(updateAvatar),
};
