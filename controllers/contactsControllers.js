import { listContacts, getContactById, removeContact, addContact, updateContactData} from "../services/contactsServices.js"
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createContact = async (req, res) => {
  try {
    const { error } = createContactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
    catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
};

export const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Body must have at least one field' });
    }
    const { error } = updateContactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedContact = await updateContactData(contactId, req.body);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// export const updateContactData = async (req, res) => {
//   const { contactId } = req.params;
//   const updatedData = req.body;

//   const updatedContact = await updateContactData(contactId, updatedData);

//   if (!updatedContact) {
//     return res.status(404).json({ error: 'Contact not found' });
//   }

//   res.json(updatedContact);
// }