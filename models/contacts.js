const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactsSchema.post("save", handleMongooseError);

const ContactMongoose = model("contact", contactsSchema);

module.exports = {
  ContactMongoose,
};
