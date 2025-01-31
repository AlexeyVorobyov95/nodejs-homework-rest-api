import { HttpError, contrWrapper } from "../helpers/index.js";
import { Contact } from "../models/contact.js";

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 2, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const del = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

export let controlFun = {
  getAll: contrWrapper(getAll),
  getById: contrWrapper(getById),
  add: contrWrapper(add),
  del: contrWrapper(del),
  update: contrWrapper(update),
  updateStatusContact: contrWrapper(updateStatusContact),
};
