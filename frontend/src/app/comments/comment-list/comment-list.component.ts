import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  commentsArray: Array<object>;

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    this.commentService.loadLatest().subscribe((value) => {
      this.commentsArray = value;
      console.log(this.commentsArray);
    });
  }
}
