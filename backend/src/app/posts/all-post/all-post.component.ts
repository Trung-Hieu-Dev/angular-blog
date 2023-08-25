import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  postArray: Array<object>;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.postService.loadData().subscribe((value) => {
      this.postArray = value;
    });
  }
}
