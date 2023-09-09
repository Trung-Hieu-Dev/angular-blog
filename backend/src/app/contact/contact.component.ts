import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactArray: Array<object>;

  constructor(private contactService: ContactsService) {}

  ngOnInit() {
    this.contactService.loadData().subscribe((value) => {
      this.contactArray = value;
      console.log(this.contactArray);
    });
  }
}
