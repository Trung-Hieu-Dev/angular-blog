import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  commentsArray: Array<object>;
  commentCount: number;

  constructor(
    private commentService: CommentsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((value) => {
      this.commentService.loadLatest(value.id).subscribe((value) => {
        this.commentsArray = value;
        console.log(this.commentsArray);
      });

      // Counting comments
      const collectionName = 'comments';
      this.commentService.countDocuments(value.id).then((count) => {
        this.commentCount = count;
      });
    });
  }
}
