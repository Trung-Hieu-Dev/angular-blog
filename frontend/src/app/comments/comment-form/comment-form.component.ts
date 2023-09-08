import { Component, OnInit, ViewChild } from '@angular/core';
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
    const data = {
      name: formData.name,
      comment: formData.comment,
      postId: this.postId,
      createdAt: new Date(),
    };
    this.commentService.addComment(data);

    this.commentForm.reset();
  }
}
