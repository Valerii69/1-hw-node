const path = require("path");
const fs = require("fs").promises;
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// const getParseContactsPath = async (path) => {
//   const data = await fs.readFile(path);
//   return JSON.parse(data);
// };

const listContacts = async () => {
  const parseData = await fs.readFile(contactsPath);
  return JSON.parse(parseData);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  return findContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: `${crypto.randomUUID()}`,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
