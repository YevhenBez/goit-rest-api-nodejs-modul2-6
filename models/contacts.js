const fs = require('fs/promises');

const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contactId = String(id);
  const contactsAll = await listContacts();
  const result = contactsAll.find((item) => item.id === contactId);
  return result || null;
}

const removeContact = async (id) => {
   const contactId = String(id);
  const contactsAll = await listContacts();
  const index = contactsAll.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsAll.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));
  return result;
}

const addContact = async (body) => {
  const contactsAll = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contactsAll.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const contactId = String(id);
  const contactsAll = await listContacts();
  const index = contactsAll.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contactsAll[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));
  return contactsAll[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
