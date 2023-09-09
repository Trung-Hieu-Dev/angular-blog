import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-child-comment-list',
  templateUrl: './child-comment-list.component.html',
  styleUrls: ['./child-comment-list.component.css'],
})
export class ChildCommentListComponent implements OnInit {
  @Input() parentId: string;
  @Input() postId: string | undefined;
  childCommentArray: Array<object>;

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    this.commentService
      .loadComments(this.postId, this.parentId)
      .subscribe((value) => {
        this.childCommentArray = value;
        console.log(this.childCommentArray);
      });
  }
}
