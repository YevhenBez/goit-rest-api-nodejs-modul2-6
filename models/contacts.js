// const fs = require("fs/promises");

// const path = require("path");

// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "contacts.json");

const { Schema, model } = require("mongoose");

const Joi = require("joi");

const  handleMongooseError  = require("../helpers/handleMongooseError");

const contactsSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, {versionKey: false})

contactsSchema.post("save", handleMongooseError)

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite:Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().error((errors) => new Error('missing field favorite')),
})


const schemas = {
  addSchema,
  updateFavoriteSchema,
}
  
const ContactMongoose = model("contact", contactsSchema);

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getContactById = async (id) => {
//   const contactId = String(id);
//   const contactsAll = await listContacts();
//   const result = contactsAll.find((item) => item.id === contactId);
//   return result || null;
// };

// const removeContact = async (id) => {
//   const contactId = String(id);
//   const contactsAll = await listContacts();
//   const index = contactsAll.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contactsAll.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));
//   return result;
// };

// const addContact = async (body) => {
//   const contactsAll = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body,
//   };
//   contactsAll.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));
//   return newContact;
// };

// const updateContact = async (id, body) => {
//   const contactId = String(id);
//   const contactsAll = await listContacts();
//   const index = contactsAll.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   contactsAll[index] = { id, ...body };
//   await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2));
//   return contactsAll[index];
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

module.exports = {
  ContactMongoose,
  schemas,
}