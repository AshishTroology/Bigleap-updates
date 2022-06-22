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
    TreeListComponent
} from '@progress/kendo-angular-treelist';

import { EmployeeEditService } from './employee-edit.service';
import { Employee } from './employee';
import { positions } from './positions';

@Component({
  selector: 'app-productview',

  template: `
  <div class="col-md-12">
  <kendo-treelist
  kendoTreeListExpandable
  [data]="rootData"
  idField="EmployeeId"
  [fetchChildren]="fetchChildren"
  [hasChildren]="hasChildren"
  (add)="addHandler($event)"
  (edit)="editHandler($event)"
  (remove)="removeHandler($event)"
  (save)="saveHandler($event)"
  (cancel)="cancelHandler($event)"
  [height]="333"
>
  <ng-template kendoTreeListToolbarTemplate>
      <button kendoTreeListAddCommand class="k-button-icon k-button k-primary" type="button"><i class="fa fa-plus"></i></button>
  </ng-template>
  <kendo-treelist-column [expandable]="true" field="FirstName" title="First Name">
  </kendo-treelist-column>
  <kendo-treelist-column field="LastName" title="Last Name">
  </kendo-treelist-column>
  <kendo-treelist-column field="Position" title="Position">
      <ng-template kendoTreeListEditTemplate
        let-dataItem="dataItem"
        let-column="column"
        let-formGroup="formGroup">
        <kendo-autocomplete
          #anchor="popupAnchor"
          popupAnchor
          placeholder="Select position..."
          [data]="suggestions"
          [formControl]="formGroup.get('Position')"
        >
        </kendo-autocomplete>
        <kendo-popup
            [anchor]="anchor.element"
            *ngIf="formGroup.get(column.field).invalid && !(isNew && formGroup.get(column.field).untouched)"
            popupClass="k-widget k-tooltip k-tooltip-validation k-invalid-msg"
           >
            <span class="k-icon k-i-warning"></span>
            Position is required
          </kendo-popup>
      </ng-template>
  </kendo-treelist-column>
  <kendo-treelist-column field="Extension" title="Extension" editor="numeric" format="#">
      <ng-template kendoTreeListEditTemplate let-column="column" let-formGroup="formGroup" let-isNew="isNew">
          <kendo-numerictextbox
            #anchor="popupAnchor"
            popupAnchor
            format="#"
            [formControl]="formGroup.get(column.field)"></kendo-numerictextbox>
          <kendo-popup
            [anchor]="anchor.element"
            *ngIf="formGroup.get(column.field).invalid && !(isNew && formGroup.get(column.field).untouched)"
            popupClass="k-widget k-tooltip k-tooltip-validation k-invalid-msg"
           >
            <span class="k-icon k-i-warning"></span>
            Extension must be a positive number
          </kendo-popup>
        </ng-template>
  </kendo-treelist-column>
  <kendo-treelist-command-column>
      <ng-template kendoTreeListCellTemplate let-isNew="isNew" let-cellContext="cellContext">
          <!-- "Add Child" command directive, will not be visible in edit mode -->
          <button [kendoTreeListAddCommand]="cellContext"
                  icon="filter-add-expression" title="Add Child">
          </button>

          <!-- "Edit" command directive, will not be visible in edit mode -->
          <button [kendoTreeListEditCommand]="cellContext"
                  icon="edit" title="Edit" [primary]="true">
          </button>

          <!-- "Remove" command directive, will not be visible in edit mode -->
          <button [kendoTreeListRemoveCommand]="cellContext"
                  icon="delete" title="Remove">
          </button>

          <!-- "Save" command directive, will be visible only in edit mode -->
          <button [kendoTreeListSaveCommand]="cellContext"
                  [disabled]="formGroup?formGroup.invalid:false"
                  icon="save" title="{{ isNew ? 'Add' : 'Update' }}">
          </button>

          <!-- "Cancel" command directive, will be visible only in edit mode -->
          <button [kendoTreeListCancelCommand]="cellContext"
                  icon="cancel" title="{{ isNew ? 'Discard changes' : 'Cancel' }}">
          </button>
      </ng-template>
  </kendo-treelist-command-column>
</kendo-treelist>
</div>`,

  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {
    public rootData!: Observable<Employee[]|null>;
    public formGroup: FormGroup | undefined;
    public editedItem: Employee | undefined;
    public suggestions = positions;
     isNew:any

    constructor(private editService: EmployeeEditService) {}

    public ngOnInit(): void {
        this.rootData = this.editService;
        this.editService.read();
    }

    public fetchChildren = (item: Employee): Observable<Employee[]> => {
        return this.editService.fetchChildren(item.EmployeeId);
    }

    public hasChildren = (item: Employee): boolean => {
        return item.hasChildren==true;
    }

    public addHandler({ sender, parent }: AddEvent): void {
        // Close the current edited row, if any.
        this.closeEditor(sender);

        // Expand the parent.
        if (parent) {
            sender.expand(parent);
        }

        // Define all editable fields validators and default values
        this.formGroup = new FormGroup({
            'ReportsTo': new FormControl(parent ? parent.EmployeeId : null),
            'FirstName': new FormControl('', Validators.required),
            'LastName': new FormControl('', Validators.required),
            'Position': new FormControl('', Validators.required),
            'Extension': new FormControl('', Validators.compose([Validators.required, Validators.min(0)]))
        });

        // Show the new row editor, with the `FormGroup` build above
        sender.addRow(this.formGroup, parent);
    }

    public editHandler({ sender, dataItem }: EditEvent): void {
        // Close the current edited row, if any.
        this.closeEditor(sender, dataItem);

        // Define all editable fields validators and default values
        this.formGroup = new FormGroup({
            'EmployeeId': new FormControl(dataItem.EmployeeId),
            'ReportsTo': new FormControl(dataItem.ReportsTo),
            'FirstName': new FormControl(dataItem.FirstName, Validators.required),
            'LastName': new FormControl(dataItem.LastName, Validators.required),
            'Position': new FormControl(dataItem.Position, Validators.required),
            'Extension': new FormControl(dataItem.Extension, Validators.compose([Validators.required, Validators.min(0)]))
        });

        this.editedItem = dataItem;

        // Put the row in edit mode, with the `FormGroup` build above
        sender.editRow(dataItem, this.formGroup);
    }

    public cancelHandler({ sender, dataItem, isNew }: CancelEvent): void {
        // Close the editor for the given row
        this.closeEditor(sender, dataItem, isNew);
    }

    public saveHandler({ sender, dataItem, parent, formGroup, isNew }: SaveEvent): void {
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

    private closeEditor(treelist: TreeListComponent, dataItem: any = this.editedItem, isNew: boolean = false): void {
        treelist.closeRow(dataItem, isNew);
        this.editedItem = undefined;
        this.formGroup = undefined;
    }
}
