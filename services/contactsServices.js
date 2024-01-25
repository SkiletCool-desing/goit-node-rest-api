import { readFile, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "../db", "contacts.json");

export async function listContacts() {
  const list = await readFile(contactsPath);
  return JSON.parse(list);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const exactContact = contacts.find((item) => item.id === contactId);
  return exactContact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
