import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateContactById,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import { isValidId } from "../helpers/isValid.js";
import validateBody from "../helpers/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContact),
  updateContactById
);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavorite),
  updateFavorite
);

export default contactsRouter;
