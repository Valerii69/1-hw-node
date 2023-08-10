const path = require("path");
const fs = require("fs").promises;

//  * Розкоментуй і запиши значення
const contactsPath = path.join("db", "contacts.json");

const getParseContactsPath = async (path) => {
  const data = await fs.readFile(path);
  return JSON.parse(data);
};

const listContacts = async () => {
  // Повертає масив контактів.
  try {
    const parseData = await getParseContactsPath(contactsPath);
    console.table(parseData);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const parseData = await getParseContactsPath(contactsPath);
    const findContact = parseData.find((contact) => contact.id === contactId);
    console.table(findContact);
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const parseData = await getParseContactsPath(contactsPath);
    const deleteContact = parseData.filter(
      (contact) => contact.id === contactId
    );
    console.table(deleteContact);
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone) => {
  // Повертає об'єкт доданого контакту.
  try {
    const parseData = await getParseContactsPath(contactsPath);
    const newContact = {
      id: `${parseData.length + 1}`,
      name: name,
      email: email,
      phone: phone,
    };
    const data = [...parseData, newContact];
    console.table(data);
    return await fs.writeFile(contactsPath, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
