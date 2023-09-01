import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubcribersService } from '../services/subcribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent implements OnInit {
  constructor(private subService: SubcribersService) {}

  ngOnInit() {}

  onSubmit(formData: any) {
    const subData: Sub = {
      name: formData.name,
      email: formData.email,
    };
    this.subService.addSubs(subData);
  }
}
