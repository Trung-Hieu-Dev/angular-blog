import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubcribersService } from '../services/subcribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent implements OnInit {
  isErrorEmail: boolean = false;
  isSubscribed: boolean = false;

  constructor(private subService: SubcribersService) {}

  ngOnInit() {}

  onSubmit(formData: any) {
    const subData: Sub = {
      name: formData.name,
      email: formData.email,
    };
    this.subService.checkSubs(subData.email).subscribe((value) => {
      if (value.empty) {
        this.subService.addSubs(subData);
        this.isErrorEmail = false;
        this.isSubscribed = true;
      } else {
        console.log('Email is ready in used!');
        this.isErrorEmail = true;
      }
    });
  }
}
