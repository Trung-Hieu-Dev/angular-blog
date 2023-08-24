import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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

  constructor(private categoryService: CategoriesService) {}

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
}
