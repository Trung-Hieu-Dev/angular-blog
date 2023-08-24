import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
}
