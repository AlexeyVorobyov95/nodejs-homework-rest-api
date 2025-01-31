import { HttpError } from "../helpers/index.js";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../models/user.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (!bearer === "Bearer") {
    next(HttpError(401, "Unauthorized"));
  }

  try {
    const { id } = jsonwebtoken.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Token invalide"));
  }
};

export default authenticate;
