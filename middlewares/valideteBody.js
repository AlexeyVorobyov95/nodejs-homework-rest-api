import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const data = req.body;
    const { error } = schema.validate(data);

    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  };
  return func;
};

export default validateBody;
