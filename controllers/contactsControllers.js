import {listContacts, getContactById, removeContact, addContact } from "../services/contactsServices.js"

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await getContactById(contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await removeContact(contactId);

    if (deletedContact) {
      res.status(200).json(deletedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createContact = async (req, res) => {
  try {

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Body must have at least one field' });
    }

    const updatedContact = await updateContact(contactId, req.body);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};