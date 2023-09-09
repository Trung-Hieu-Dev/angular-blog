import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact';
import { ContactService } from '../../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onSubmit(formData: any) {
    const contactData: Contact = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };
    this.contactService.saveData(contactData);
  }

  onBackToHome() {
    this.router.navigate(['/']);
  }
}
