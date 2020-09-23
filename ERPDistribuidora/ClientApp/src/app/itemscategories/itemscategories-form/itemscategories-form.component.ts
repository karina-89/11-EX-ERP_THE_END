import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemscategoriesService } from '../itemscategories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IItemsCategory } from '../itemscategory';

@Component({
  selector: 'app-itemscategories-form',
  templateUrl: './itemscategories-form.component.html',
  styleUrls: ['./itemscategories-form.component.css']
})
export class ItemscategoriesFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private itemsCategoriesService: ItemscategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  editMode: boolean = false;
  formGroup: FormGroup;
  itemsCategoryId: number;

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ''
    });

    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }

      this.editMode = true;

      this.itemsCategoryId = params["id"];

      this.itemsCategoriesService.getItemCategory(this.itemsCategoryId.toString())
        .subscribe(itemsCategory => this.loadForm(itemsCategory),
          error => this.router.navigate(["/itemscategories"]));
    });
  }

  loadForm(itemsCategory: IItemsCategory) {
    this.formGroup.patchValue({
      name: itemsCategory.name
    });
  }

  save() {
    let itemsCategory: IItemsCategory = Object.assign({}, this.formGroup.value);

    if (this.editMode) {
      itemsCategory.id = this.itemsCategoryId;
      this.itemsCategoriesService.updateItemCategory(itemsCategory)
        .subscribe(item => this.onSaveSucess(),
          error => console.error(error));
    } else {
      this.itemsCategoriesService.createItemCategory(itemsCategory)
        .subscribe(item => this.onSaveSucess(),
          error => console.error(error));
    }
  }

  onSaveSucess() {
    this.router.navigate(["/itemscategories"]);
  }
}
