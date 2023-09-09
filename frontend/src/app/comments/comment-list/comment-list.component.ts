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
  isReply: boolean = false;
  isReplyList: boolean = false;
  activeCommentIndex: number | null = null;

  constructor(
    private commentService: CommentsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((value) => {
      this.commentService.loadComments(value.id).subscribe((value) => {
        this.commentsArray = value;
      });

      // Counting comments
      this.commentService.countDocuments(value.id).then((count) => {
        this.commentCount = count;
      });
    });
  }

  toggleReply(index: number) {
    this.isReply = !this.isReply;
    this.isReplyList = false;
    this.activeCommentIndex = index;
  }

  toggleReplyList(index: number) {
    this.isReplyList = !this.isReplyList;
    this.isReply = false;
    this.activeCommentIndex = index;
  }
}
