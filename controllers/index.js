const { ctrlWrapper } = require("../helpers");

const listContactsCtrls = require("./listContactsCtrls");

const getContactByIdCtrls = require("./getContactByIdCtrls");

const addContactCtrls = require("./addContactCtrls");

const removeContactCtrls = require("./removeContactCtrls");

const updateContactCtrls = require("./updateContactCtrls");

const updateStatusContactCtrls = require("./updateStatusContactCtrls");

module.exports = {
    listContactsCtrls: ctrlWrapper(listContactsCtrls),
    getContactByIdCtrls: ctrlWrapper(getContactByIdCtrls),
    addContactCtrls: ctrlWrapper(addContactCtrls),
    removeContactCtrls: ctrlWrapper(removeContactCtrls),
    updateContactCtrls: ctrlWrapper(updateContactCtrls),
    updateStatusContactCtrls: ctrlWrapper(updateStatusContactCtrls),
};