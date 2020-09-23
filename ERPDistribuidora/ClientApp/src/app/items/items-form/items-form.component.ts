import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemsService } from '../items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ItemscategoriesService } from '../../itemscategories/itemscategories.service';
import { IItem } from '../item';
import { ItemscategoriesModalComponent } from '../../itemscategories/itemscategories-modal/itemscategories-modal.component';
import { IItemsCategory } from '../../itemscategories/itemscategory';

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.css']
})
export class ItemsFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private itemsService: ItemsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private itemsCategoriesService: ItemscategoriesService) { }

  editMode: boolean = false;
  formGroup: FormGroup;
  itemId: number;

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: '',
      price: 0,
      itemsCategoryId: '',
      itemsCategoryName: ''
    });

    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }

      this.editMode = true;

      this.itemId = params["id"];

      this.itemsService.getItem(this.itemId.toString())
        .subscribe(item => this.loadForm(item),
          error => this.router.navigate(["/items"]));
    });
  }

  loadForm(item: IItem) {
    this.formGroup.patchValue({
      name: item.name,
      price: item.price,
      itemsCategoryId: item.itemsCategoryId,
      itemsCategoryName: item.itemsCategory.name
    });
  }

  save() {
    let item: IItem = Object.assign({}, this.formGroup.value);

    if (this.editMode) {
      item.id = this.itemId;
      this.itemsService.updateItem(item)
        .subscribe(item => this.onSaveSucess(),
          error => console.error(error));
    } else {
      this.itemsService.createItem(item)
        .subscribe(item => this.onSaveSucess(),
          error => console.error(error));
    }
  }

  onSaveSucess() {
    this.router.navigate(["/items"]);
  }

  selectItemsCategory(event) {
    event.srcElement.blur();
    event.preventDefault();
    const dialogRef = this.dialog.open(ItemscategoriesModalComponent);

    dialogRef.afterClosed().subscribe(confirmresult => {
      if (confirmresult) {
        this.itemsCategoriesService.getItemCategory(confirmresult).subscribe(itemsCategory => this.validateItemsCategory(itemsCategory), error => console.error(error));
      }
    });
  }

  validateItemsCategory(itemsCategory: IItemsCategory) {
    this.formGroup.controls['itemsCategoryId'].setValue(itemsCategory.id);
    this.formGroup.controls['itemsCategoryName'].setValue(itemsCategory.name);
  }
}
