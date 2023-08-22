import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: Array<object> = [];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit() {
    this.categoryService.loadData().subscribe((data) => {
      this.categoryArray = data;
    });
  }

  onSubmit(formData: NgForm) {
    const categoryData: Category = {
      category: formData.value.category,
    };

    // save categories data into firebase store
    this.categoryService.saveData(categoryData);

    formData.reset();
  }
}
