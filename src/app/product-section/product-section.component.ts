import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  AddEvent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  TreeListComponent,
  CellClickEvent,
  CellCloseEvent,
} from '@progress/kendo-angular-treelist';

import { EmployeeEditService } from './employee-edit.service';
import { Employee } from './employee';
import { positions } from './positions';
import { Product } from './product.model';
@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.css'],
})
export class ProductSectionComponent implements OnInit {
  public rootData!: Observable<Product[]>;
  public formGroup!: FormGroup;
  public editedItem!: Employee;
  public readOnlyColumns = new Set(['Position']);
  public suggestions = positions;
  isNew: boolean = false;
  public listItems: Array<Product> = [];
  // public placeHolder: Product = { };s
  constructor(private editService: EmployeeEditService) {}

  public ngOnInit(): void {
    this.rootData = this.editService;
    this.editService.read();
    this.editService.fetchData().subscribe((data) => (this.listItems = data));
    console.log(this.listItems, this.rootData);
  }

  public fetchChildren = (item: Employee): Observable<Product[]> => {
    return this.editService.fetchChildren(item.EmployeeId);
  };

  public hasChildren = (item: Employee): any => {
    return item.hasChildren;
  };

  public cellClickHandler({
    sender,
    column,
    columnIndex,
    dataItem,
    isEdited,
  }: CellClickEvent): void {
    // const readonly = this.readOnlyColumns.has(column.field);
    if (!isEdited) {
      sender.editCell(dataItem, columnIndex, this.createFormGroup(dataItem));
    }
  }

  public cellCloseHandler(e: CellCloseEvent): void {
    const { formGroup, dataItem } = e;
    if (!formGroup.valid) {
      // Prevent closing the edited cell if the form is invalid.
      e.preventDefault();
    } else if (formGroup.dirty) {
      // Reflect changes immediately
      Object.assign(dataItem, formGroup.value);

      this.editService.update(dataItem);
    }
  }

  public addHandler({ sender, parent }: AddEvent): void {
    // Close the current edited row, if any.
    console.log(sender)
    this.closeEditor(sender);

    // Expand the parent.
    if (parent) {
      sender.expand(parent);
    }

    // Define all editable fields validators and default values
    this.formGroup = new FormGroup({
      ProductID: new FormControl(''),
      ProductName: new FormControl('', Validators.required),
      UnitPrice: new FormControl('', Validators.required),
      UnitsInStock: new FormControl('', Validators.required),
    });

    // Show the new row editor, with the `FormGroup` build above
    sender.addRow(this.formGroup, parent);
  }

  public addDropdownHandler(e:any) {
    console.log(e);
    // Close the current edited row, if any.
    // this.closeEditor(sender);

    // // Expand the parent.
    // if (parent) {
    //   sender.expand(parent);
    // }

    // // Define all editable fields validators and default values
    // this.formGroup = new FormGroup({
    //   ReportsTo: new FormControl(parent ? parent.EmployeeId : null),
    //   FirstName: new FormControl('', Validators.required),
    //   LastName: new FormControl('', Validators.required),
    //   Position: new FormControl('', Validators.required),
    //   Extension: new FormControl(
    //     '',
    //     Validators.compose([Validators.required, Validators.min(0)])
    //   ),
    // });

    // // Show the new row editor, with the `FormGroup` build above
    // sender.addRow(this.formGroup, parent);
  }

  public editHandler({ sender, dataItem }: EditEvent): void {
    // Close the current edited row, if any.
    this.closeEditor(sender, dataItem);

    // Define all editable fields validators and default values
    this.formGroup = new FormGroup({
      EmployeeId: new FormControl(dataItem.EmployeeId),
      ReportsTo: new FormControl(dataItem.ReportsTo),
      FirstName: new FormControl(dataItem.FirstName, Validators.required),
      LastName: new FormControl(dataItem.LastName, Validators.required),
      Position: new FormControl(dataItem.Position, Validators.required),
      Extension: new FormControl(
        dataItem.Extension,
        Validators.compose([Validators.required, Validators.min(0)])
      ),
    });

    this.editedItem = dataItem;

    // Put the row in edit mode, with the `FormGroup` build above
    sender.editRow(dataItem, this.formGroup);
  }

  public cancelHandler({ sender, dataItem, isNew }: CancelEvent): void {
    // Close the editor for the given row
    this.closeEditor(sender, dataItem, isNew);
  }

  public saveHandler({
    sender,
    dataItem,
    parent,
    formGroup,
    isNew,
  }: SaveEvent): void {
    // Collect the current state of the form.
    // The `formGroup` argument is the same as was provided when calling `editRow`.
    const employee: Employee = formGroup.value;

    if (!isNew) {
      // Reflect changes immediately
      Object.assign(dataItem, employee);
    } else if (parent) {
      // Update the hasChildren field on the parent node
      parent.hasChildren = true;
    }

    this.editService
      // Publish the update to the remote service.
      .save(employee, parent, isNew)
      .pipe(take(1))
      .subscribe(() => {
        if (parent) {
          // Reload the parent node to reflect the changes.
          sender.reload(parent);
        }
      });

    sender.closeRow(dataItem, isNew);
  }

  public removeHandler({ sender, dataItem, parent }: RemoveEvent): void {
    this.editService
      // Publish the update to the remote service.
      .remove(dataItem, parent)
      .pipe(take(1))
      .subscribe(() => {
        if (parent) {
          // Reload the parent node to reflect the changes.
          sender.reload(parent);
        }
      });
  }

  private closeEditor(
    treelist: TreeListComponent,
    dataItem: any = this.editedItem,
    isNew: boolean = false
  ): void {
    treelist.closeRow(dataItem, isNew);
    // this.editedItem = undefined;
    // this.formGroup = undefined;
  }

  private createFormGroup(item: any): FormGroup {
    const group = new FormGroup({
      ReportsTo: new FormControl(item.ReportsTo),
      FirstName: new FormControl(item.FirstName, Validators.required),
      LastName: new FormControl(item.LastName, Validators.required),
      Position: new FormControl(item.Position),
      Extension: new FormControl(
        item.Extension,
        Validators.compose([Validators.required, Validators.min(0)])
      ),
    });

    if (item.EmployeeId) {
      group.addControl('EmployeeId', new FormControl(item.EmployeeId));
    }

    return group;
  }
}
