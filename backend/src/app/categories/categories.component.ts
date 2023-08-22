import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(private categoryService: CategoriesService) {}

  onSubmit(formData: NgForm) {
    const categoryData: Category = {
      category: formData.value.category,
    };

    // save categories data into firebase store
    this.categoryService.saveData(categoryData);
  }
}
