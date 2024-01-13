const { program } = require("commander");
const contactsFunction = require("./src/contacts.js");
const contacts = require("./src/db/contacts.json");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argvnode);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContacts = await contactsFunction.listContacts();
      console.log(listContacts);
      break;

    case "get":
      const oneContact = await contactsFunction.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contactsFunction.addContact(name, email, phone);
      console.log(newContact);

      break;

    case "remove":
      const deliteContact = await contactsFunction.removeContact(id);
      console.log(deliteContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(options);
