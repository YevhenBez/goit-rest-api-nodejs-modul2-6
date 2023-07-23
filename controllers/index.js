const { ctrlWrapper } = require("../helpers");

const listContactsCtrls = require("../controllers/listContactsCtrls");

const getContactByIdCtrls = require("../controllers/getContactByIdCtrls");

const addContactCtrls = require("../controllers/addContactCtrls");

const removeContactCtrls = require("../controllers/removeContactCtrls");

const updateContactCtrls = require("../controllers/updateContactCtrls");

const updateStatusContactCtrls = require("../controllers/updateStatusContactCtrls");

module.exports = {
    listContactsCtrls: ctrlWrapper(listContactsCtrls),
    getContactByIdCtrls: ctrlWrapper(getContactByIdCtrls),
    addContactCtrls: ctrlWrapper(addContactCtrls),
    removeContactCtrls: ctrlWrapper(removeContactCtrls),
    updateContactCtrls: ctrlWrapper(updateContactCtrls),
    updateStatusContactCtrls: ctrlWrapper(updateStatusContactCtrls),
};