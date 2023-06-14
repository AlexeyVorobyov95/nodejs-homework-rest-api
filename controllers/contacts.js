import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../models/contacts.js";
import { HttpError, contrWrapper } from "../helpers/index.js";

const getAll = async (req, res, next) => {
  const result = await listContacts();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const result = await addContact(data);
  res.status(201).json(result);
};

const del = async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res, next) => {
  const result = await updateContact(id, data);
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
};
