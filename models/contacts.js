import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

const contactsPath = join("models", "contacts.json");

const listContacts = async () => {
  const readJsone = await readFile(contactsPath);
  const parseJason = JSON.parse(readJsone);
  return parseJason;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);

  return contactById || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(({ id }) => id === contactId);

  if (indexContact === -1) {
    return null;
  }
  const delContact = contacts.splice(indexContact, 1);

  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return delContact;
};

const addContact = async (data) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(({ id }) => id === contactId);
  if (indexContact === -1) {
    return null;
  }
  contacts[indexContact] = {
    id: contactId,
    ...body
  };

  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[indexContact];
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

