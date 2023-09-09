import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit, OnDestroy {
  loadedPost: any;
  postsLoadedArray: Array<object>;
  postSub$: Subscription;
  postView: number;
  postId: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((value) => {
      this.postId = value.id;

      // this.postService.countViews(postId, this.postView);

      this.postSub$ = this.postService
        .loadPostById(this.postId)
        .subscribe((post) => {
          this.loadedPost = post;
          this.loadSimilarPost(this.loadedPost.category.categoryId);
        });
    });
  }

  ngOnDestroy() {
    this.postView = this.loadedPost.views;
    this.postService.countViews(this.postId, this.postView);
    this.postSub$.unsubscribe();
  }

  loadSimilarPost(postId) {
    this.postService.loadCategoryPost(postId).subscribe((posts) => {
      this.postsLoadedArray = posts;
    });
  }
}
