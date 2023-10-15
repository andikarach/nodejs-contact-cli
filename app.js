const { saveContact, listContacts, detailContact, deleteContact } = require('./contacts')

const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add new contact',
    builder: {
        name: {
            describe: 'Full Name',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email Address',
            demandOption: true,
            type: 'string',
        },
        phone: {
            describe: 'Phone Number',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        const contact = {
            name: argv.name,
            email: argv.email,
            phone: argv.phone,
        }

        saveContact(contact.name, contact.email, contact.phone);
    }
})

yargs.command({
    command: 'list',
    describe: 'Show list contacts',
    handler() {
        listContacts();
    }
})

yargs.command({
    command: 'detail',
    describe: 'Detail contact',
    builder: {
        email: {
            describe: 'Email Address',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        detailContact(argv.email);
    }
})

yargs.command({
    command: 'delete',
    describe: 'Delete contact',
    builder: {
        email: {
            describe: 'Email Address',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        deleteContact(argv.email);
    }
})


yargs.parse();