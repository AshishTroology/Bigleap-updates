import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-child-element',
  templateUrl: './child-element.component.html',
  styleUrls: ['./child-element.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChildElementComponent implements OnInit {
  productForm!: FormGroup;
  constructor(private Efb: FormBuilder) {}
  @Input() itemdata: any;
  public registerForm!: FormGroup;
  @Output() formChanged: EventEmitter<any> = new EventEmitter();
  @Output() deleteProduct: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.formSetter(this.itemdata.dataItem);
  }

  deleteHandler(){
    this.deleteProduct.emit(this.itemdata.dataItem.id);
  }

  formSetter(item: any) {
    this.registerForm = new FormGroup({
      productname: new FormControl({
        value: item.productname,
        disabled:
          this.itemdata.dataItem.type === 'Product'
            ? this.itemdata.dataItem.is_product
              ? false
              : true
            : false,
      }),
      PartNo: new FormControl({
        value: item.PartNo,
        disabled:
          this.itemdata.dataItem.type === 'Product'
            ? this.itemdata.dataItem.is_product
              ? false
              : true
            : false,
      }),
      HSNCode: new FormControl(item.HSNCode),
      GST: new FormControl(item.GST),
      UnitPrice: new FormControl({
        value: this.itemdata.dataItem.type === 'Product' ? item.UnitPrice : 0,
        disabled: this.itemdata.dataItem.type === 'Product' ? false : true,
      }),
      UOM: new FormControl(item.UOM),
      quantity: new FormControl(item.quantity),
      discount: new FormControl(item.discount),
      type: new FormControl(this.itemdata.dataItem.type),
    });
  }

  public submitForm(): void {
    this.registerForm.markAllAsTouched();
    console.log(this.registerForm.value);
    this.registerForm.value.amount =
      (this.registerForm.value.UnitPrice -
        this.registerForm.value.UnitPrice *
          (this.registerForm.value.discount / 100)) *
      this.registerForm.value.quantity;
    this.formChanged.emit(this.registerForm.value);
  }

  public clearForm(): void {
    this.formChanged.emit(this.itemdata.dataItem);
  }
}
