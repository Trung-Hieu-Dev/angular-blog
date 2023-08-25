import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/images/no-image-found.png';
  selectedImg: any;
  categories: Array<object>;

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '300px',
  };

  postForm: FormGroup;
  formStatus: string = 'Add';
  loadedPost: any;
  loadedPostId: string;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((value) => {
      this.loadedPostId = value.id;
      if (this.loadedPostId) {
        // Edit post
        this.postService.loadPostById(this.loadedPostId).subscribe((post) => {
          this.loadedPost = post;
          this.permalink = this.loadedPost.permalink;

          this.postForm = this.fb.group({
            title: [
              this.loadedPost.title,
              [Validators.required, Validators.minLength(10)],
            ],
            permalink: ['', Validators.required],
            excerpt: [
              this.loadedPost.excerpt,
              [Validators.required, Validators.minLength(50)],
            ],
            category: [
              `${this.loadedPost.category.categoryId}-${this.loadedPost.category.category}`,
              Validators.required,
            ],
            postImg: ['', Validators.required],
            content: [this.loadedPost.content, Validators.required],
          });
          this.postForm.get('permalink')?.disable();
          this.imgSrc = this.loadedPost.postImgPath;
          this.formStatus = 'Edit';
        });
      } else {
        // Add new post
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
        this.postForm.get('permalink')?.disable();
      }
    });
  }

  get permalinkControl() {
    return this.postForm.get('permalink').setValue(this.permalink);
  }

  get fc() {
    return this.postForm.controls;
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe((value) => {
      this.categories = value;
    });
  }

  onTitleChange($event: any) {
    const title = $event.target.value;
    this.permalink = title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);

    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    const splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.get('permalink').value,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    this.postService.uploadImage(
      this.selectedImg,
      postData,
      this.formStatus,
      this.loadedPostId,
    );

    this.postForm.reset();
    this.imgSrc = './assets/images/no-image-found.png';
  }
}
