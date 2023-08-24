import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

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

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: new FormControl(
        { value: '', disabled: true },
        Validators.required,
      ),
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
    });
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

  get permalinkControl() {
    return this.postForm.get('permalink').setValue(this.permalink);
  }

  get fc() {
    return this.postForm.controls;
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

    this.postService.uploadImage(this.selectedImg, postData);

    this.postForm.reset();
    this.imgSrc = './assets/images/no-image-found.png';
  }
}
