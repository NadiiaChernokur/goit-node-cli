const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === contactId);
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removeById = contacts.findIndex((item) => item.id === contactId);
  if (removeById === -1) return null;
  const [result] = contacts.splice(removeById, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
// addContact("nam", "email", "phone");
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
