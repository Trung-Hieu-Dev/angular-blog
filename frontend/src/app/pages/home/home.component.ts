import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredPostsArray: Array<object>;

  constructor(private postService: PostsService) {
    this.postService.loadFeatured().subscribe((value) => {
      this.featuredPostsArray = value;
    });
  }

  ngOnInit() {}
}
