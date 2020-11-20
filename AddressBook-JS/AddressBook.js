class Contact {
    constructor(...parameters) {
        this.firstName = parameters[0];
        this.lastName = parameters[1];
        this.address = parameters[2];
        this.city = parameters[3];
        this.state = parameters[4];
        this.zip = parameters[5];
        this.phoneNumber = parameters[6];
        this.email = parameters[7];
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(firstName) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(firstName)) {
            this._firstName = firstName;    
        }
        else throw "Incorrect First Name!";
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(lastName)) {
            this._lastName = lastName;    
        }
        else throw "Incorrect Last Name!";
    }

    get address() {
        return this._address;
    }
    set address(address) {
        let addressRegex = RegExp('^[A-Za-z]{1}[A-Za-z\\s]{3,}$');
        if (addressRegex.test(address)) {
            this._address = address;
        }
        else throw "Invalid Address!";
    }

    get city() {
        return this._city;
    }
    set city(city) {
        let cityRegex = RegExp('^[A-Za-z]{1}[A-Za-z\\s]{3,}$');
        if (cityRegex.test(city)) {
            this._city = city;
        }
        else throw "Invalid City!";
    }

    get state() {
        return this._state;
    }
    set state(state) {
        let stateRegex = RegExp('^[A-Za-z]{1}[A-Za-z\\s]{3,}$');
        if (stateRegex.test(state)) {
            this._state = state;
        }
        else throw "Invalid State!";
    }

    get zip() {
        return this._zip;
    }
    set zip(zip) {
        let zipRegex = RegExp('^[1-9]{1}[0-9]{5}$');
        if (zipRegex.test(zip)) {
            this._zip = zip;
        } 
        else throw "Invalid Zip!"; 
    }

    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumber) {
        let phoneNumberRegex = RegExp('^([+][0-9]{2,3}[\\s]){0,1}[1-9]{1}[0-9]{9}$');
        if (phoneNumberRegex.test(phoneNumber)) {
            this._phoneNumber = phoneNumber;
        }
        else throw "Invalid Phone Number!";
    }

    get email() {
        return this._email;
    }
    set email(email) {
        let emailRegex = RegExp("^[a-z0-9]+(([\\.+-][a-z0-9]{1,})?)+@[a-z0-9]+\\.([a-z]{2,4})+((\\.[a-z]{2,4})?)$");
        if (emailRegex.test(email)) {
            this._email = email;
        }
        else throw "Invalid Email!";
    }

    toString() {
        return "First Name = " + this.firstName + ", Last Name = " + this.lastName + ", Address = " + this.address +
               ", City = " + this.city + ", State = " + this.state + ", Zip = " + this.zip + ", Phone Number = " + 
               this.phoneNumber + ", Email = " + this.email;
    }
}

//UC 3 New address book to store contact details

let addressBook = new Array();
function addContactToAddressBook(contact, addressBook) {
    let result = addressBook.find(contactObj => {
        return contactObj.firstName == contact.firstName && contactObj.lastName == contact.lastName;
    });
    if (!result) {
        addressBook.push(contact);
    } else {
        throw "Contact By That Name Already Present";
    }
}
try {
    addContactToAddressBook(new Contact("Mihir", "Gautam", "Kanpur", "Kanpur", "Uttar Pradesh",
                                208022,"+91 9988776644", "mihir.gautam@gmail.com"),addressBook);
    addContactToAddressBook(new Contact("Nitesh", "Kumar", "Lucknow", "Lucknow", "Uttar Pradesh",
                                128026, "+91 9999772210", "nitesh.kumar@gmail.com"),addressBook);
    addContactToAddressBook(new Contact("Priyank", "Gupta", "Mumbai", "Mumbai", "Maharashtra",
                                220016, "+91 8899006789", "priyank.gupta@gmail.com"),addressBook);
} catch (error) {
    console.log(error);
}
console.log("Contacts: ");
addressBook.forEach(contact => console.log(contact.toString()));

//UC 4 Edit existing person details
function findContact(firstName, lastName, addressBook) {
    let contact;
    addressBook.forEach(contactObj => {
        if (contactObj.firstName == firstName && contactObj.lastName == lastName) {
            contact = contactObj;
        }
    });
    return contact;
}
function updateContact(property, value, contact) {
    try {
        switch (property) {
            case "First Name":
                contact.firstName = value;
                break;
            case "Last Name":
                contact.lastName = value;
                break;
            case "Address":
                contact.address = value;
                break;
            case "City":
                contact.city = value;
                break;
            case "State":
                contact.state = value;
                break;
            case "Zip":
                contact.zip = value;
                break;
            case "Phone Number":
                contact.phoneNumber = value;
                break;
            case "Email":
                contact.email = value;
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        console.log("Unable to Update!");
    }
}

let contact = findContact("Priyank", "Gupta", addressBook);
updateContact("Last Name", "Sharma", contact);
updateContact("Email", "priyank.sharma@gmail.com", contact);
console.log("Updated Contact: " + contact.toString());


//UC 5 Delete a contact
function deleteContact(firstName, lastName, addressBook) {
    let contact = findContact(firstName, lastName, addressBook);
    if (contact != null) {
        return addressBook.filter(contactObj => contactObj != contact);
    } else {
        console.log("Contact Not Found!");
    }
}


addressBook = deleteContact("Mihir", "Gautam", addressBook);
console.log("Contacts: ");
addressBook.forEach(contact => console.log(contact.toString()));


//UC6 Find number of contacts
function getContactCount(addressBook) {
    return addressBook.reduce(count => count+1, 0);
}
let contactCount = getContactCount(addressBook);
console.log("Number of Contacts: " + contactCount);

//UC7 Check for duplicate contact
function CheckDuplicate(contact)
   {
       if(addressBook.find(c => c.firstName == contact.firstName && c.lastName == contact.lastName))
           throw "Contact already exixts";
   }
try {
    newContact = new Contact("Priyank", "Verma", "Mumbai", "Mumbai", "Maharashtra",
    220016, "+91 8899006789", "priyank.verman@gmail.com");
    if(!CheckDuplicate(newContact)){
        addContactToAddressBook(newContact, addressBook);
        console.log("Contacts: ");
        addressBook.forEach(contact => console.log(contact.toString()));
    };
} catch (error) {
    console.log(error);
}

//UC 8 Search person by city or state
function getContactsInParticularCity(city) {
    return addressBook.filter(contact => contact.city == city);
}

function getContactsInParticularState(state) {
    return addressBook.filter(contact => contact.state == state);
}

let city = "Lucknow";
let contactsInParticularCity = getContactsInParticularCity(city);
console.log("Contacts in " + city + ":");
contactsInParticularCity.forEach(contact => console.log(contact.toString()));
let state = "Maharashtra";
let contactsInParticularState = getContactsInParticularState(state);
console.log("Contacts in " + state + ":");
contactsInParticularState.forEach(contact => console.log(contact.toString()));

//UC9 Get all contacts by city or state using map
function getContactsByProperty(property, addressBook) {
    let contactsByPropertyMap = new Map();
    if (property == "City") {
        addressBook.forEach(contact => {
            if (!contactsByPropertyMap.get(contact.city)) {
                contactsByPropertyMap.set(contact.city, [contact]);
            } else {
                contactsByPropertyMap.get(contact.city).push(contact);
            }
        });
    } else if (property == "State") {
        addressBook.forEach(contact => {
            if (!contactsByPropertyMap.get(contact.state)) {
                contactsByPropertyMap.set(contact.state, [contact]);
            } else {
                contactsByPropertyMap.get(contact.state).push(contact);
            }
        });
    }
    return contactsByPropertyMap;
}
let contactsByCity = getContactsByProperty("City", addressBook);
console.log("Contacts By City: ")
console.log(contactsByCity);
let contactsByState = getContactsByProperty("State", addressBook);
console.log("Contacts By State: ")
console.log(contactsByState);
