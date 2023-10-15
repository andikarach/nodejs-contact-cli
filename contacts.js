const fs = require('fs');
const validator = require('validator');

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]')
}

const loadContacts = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(fileBuffer);

    return contacts;
}

const saveContact = (name, email, phone) => {
    const contact = { name, email, phone }
    const contacts = loadContacts();

    // Check duplicate email
    const checkEmail = contacts.find((contact) => contact.email === email);

    if(checkEmail){
        console.log('Email already exist !');
        return false;
    }

    if(!validator.isEmail(email)){
        console.log('Email is not valid !');
        return false;
    }

    if(!validator.isMobilePhone(phone, 'id-ID')){
        console.log('Phone is number not valid !')
        return false;
    }

    contacts.push(contact)
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log('Thanks for your input');
}

const listContacts = () => {
    const contacts = loadContacts();
    contacts.forEach((contact, i ) => {
        console.log(`${i + 1}. ${contact.name} : ${contact.phone}`)
    });
}

const detailContact = (email) => {
    const contacts = loadContacts();
    const getData  = contacts.find((contact) => contact.email.toLowerCase() === email.toLowerCase());
    
    if(!getData) {
        console.log('Data not found !')
        return false;
    } else {
        console.log(`${getData.email} - ${getData.name} - ${getData.phone}`)
    }
}

const deleteContact = (email) => {
    const contacts = loadContacts();
    const newContacts = contacts.filter(
        (contact) => contact.email.toLowerCase() !== email.toLowerCase()
    );


    if(newContacts.length == contacts.length) {
        console.log('Data not found !')
        return false;
    } else {
        fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
        console.log('Delete data success !')
    }
}

module.exports = { saveContact, listContacts, detailContact, deleteContact }