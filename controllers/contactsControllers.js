import contactsService from "../services/contactsServices.js";
import { validateContact, validateUpdate } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await contactsService.getContactById(contactId);

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
    const deletedContact = await contactsService.removeContact(contactId);

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
    const { error } = validateContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const newContact = await contactsService.addContact(req.body);
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

    const { error } = validateUpdate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedContact = await contactsService.updateContact(contactId, req.body);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
