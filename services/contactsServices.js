const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const contactsService = {
  listContacts: async () => {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
  },

  getContactById: async (contactId) => {
    const contacts = await contactsService.listContacts();
    const exactContact = contacts.find((item) => item.id === contactId);
    return exactContact || null;
  },

  removeContact: async (contactId) => {
    const contacts = await contactsService.listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  },

  addContact: async (name, email, phone) => {
    const contacts = await contactsService.listContacts();
    const newContact = {
      id: uuid.v4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  },
};

module.exports = contactsService;
