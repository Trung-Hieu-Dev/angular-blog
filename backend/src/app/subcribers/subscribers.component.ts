import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subcribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css'],
})
export class SubscribersComponent implements OnInit {
  subscriberArray: Array<object>;

  constructor(private subscriberService: SubscribersService) {}

  ngOnInit() {
    this.subscriberService.loadData().subscribe((value) => {
      this.subscriberArray = value;
    });
  }

  onDelete(id: string) {
    this.subscriberService.deleteData(id);
  }
}
