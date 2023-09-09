import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../../services/comments.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  postId: string;
  @ViewChild('commentForm') commentForm: NgForm;
  @Input() parentId: string;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentsService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((value) => {
      this.postId = value.id;
    });
  }

  onSubmit(formData: any) {
    if (this.parentId) {
      const data = {
        name: formData.name,
        comment: formData.comment,
        postId: this.postId,
        parentId: this.parentId,
        createdAt: new Date(),
      };
      this.commentService.addComment(data);
    } else {
      const data = {
        name: formData.name,
        comment: formData.comment,
        postId: this.postId,
        parentId: null,
        createdAt: new Date(),
      };
      this.commentService.addComment(data);
    }

    this.commentForm.reset();
  }
}
