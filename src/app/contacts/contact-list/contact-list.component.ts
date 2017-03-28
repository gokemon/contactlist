import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})


export class ContactListComponent implements OnInit {
  contacts: Contact[]
  selectedContact: Contact

  constructor(private contactService: ContactService) { }

  ngOnInit() {
     this.contactService
      .getContacts()
      .then((contacts: Contact[]) => {
        this.contacts = contacts.map((contact) => {
          if (!contact.phone) {
            contact.phone = {
              mobile: '',
              work: ''
            }
          }
          return contact;
        });
      });
  }// OnInit


  private getIndexOfContact = (contactId: String) => {
    return this.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }//getIndexOfContact


  selectContact(contact: Contact) {
    this.selectedContact = contact
  }

  /* creates a new templete */
  createNewContact() {
    var contact: Contact = {
      name: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };

    // By default, a newly-created contact will have the selected state.
    this.selectContact(contact);
  }//createNewContact


  deleteContact = (contactId: String) => {
    var idx = this.getIndexOfContact(contactId);
    if (idx !== -1) {
      this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }//delete


  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }// adds new contact


  updateContact = (contact: Contact) => {
    var idx = this.getIndexOfContact(contact._id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }//updateContact
}// end ContactListComponent class

/*
* When the application is initialized, 
* ngOnInit() is called. Upon app start, 
* we use contact service to retrieve the full contact list 
* from the API server. Once the contact list is retrieved, 
* it is stored into a local copy of the contact list. 
* It’s important to store a local copy of the contact list 
* so that we can dynamically change the contact list 
* whenever a new user is created, modified, 
* or deleted without having to make extra 
* HTTP requests to the API server.
*/