import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {
  TreeItemDropEvent,
  DropPosition,
  TreeItemLookup,
  DropAction,
  TreeItemDragStartEvent,
  TreeItemDragEvent,
  NodeClickEvent,
  TreeItemAddRemoveArgs,
  TreeItem,
} from '@progress/kendo-angular-treeview';

import { Observable } from 'rxjs';
import { ProductserviceService } from './productservice.service';
import { ProductService } from 'src/app/service/product.service';

import { DocumentModel } from './document.interface';
// import { Product } from '../../productInterface'
import { Product } from './product.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DialogAction, ActionsLayout } from '@progress/kendo-angular-dialog';



@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.css'],
  providers: [ProductserviceService],
})
export class ProductgridComponent implements OnInit {
  @Input() gridData: any;
  public events: string[] = [];
  public isSingleClicked: Boolean = false;
  public data: any;
  public view: any;
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any = [];
  childData: any;

  childShow: boolean = false;
  levelIndex: any;
  public selectedKeys: any[] = [];
  public checkedKeys: any[] = ['1'];
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();
  constructor(
    @Inject(ProductserviceService) private proservice: ProductserviceService,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    this.view = this.proservice.query().subscribe((dataitem: any) => {
      this.view = dataitem.result;
    });
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'PartNo',
      textField: 'productname',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      allowRemoteDataSearch: true,
      closeDropDownOnSelection: true,
    };
    this.data = this.gridData;
  }

  onFilterChange(item: any) {
    console.log(item);
    if (item.length >= 3) {
      this.view = this.proservice
        .search({ searchValue: item })
        .subscribe((dataitem: any) => {
          this.view = dataitem.result;
          console.log(this.view);
        });
    } else {
      this.product
        .getSearchByPartNo({ PartNo: item })
        .subscribe((dataitemm: any) => {
          this.view = dataitemm.result;
        });
    }
  }

  closepop() {
    this.gridData = this.data;
    this.dataChanged.emit(this.gridData);
  }

  onItemSelect(item: any) {
    this.proservice.searchByPartNo(item).subscribe((dataitem1: any) => {
      this.data.push(dataitem1.result[0]);
    });
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  public iconClass(dataItem: any): Object {
    return {
      'k-i-folder': dataItem.type === 'Group',
      'k-i-image': dataItem.type === 'Product',
      'k-icon': true,
    };
  }

  public onSelectionChange(e: any): void {
    console.log(e);
    this.childShow = true;
    this.childData = e;
    this.selectedKeys.push(e.index);
    this.levelIndex = e.index.split('_');
    this.levelvalue = 0;
  }

  formChangedHandler(formdata: any) {
    console.log(this.levelIndex, formdata);
    // this.data.map((item:any,i:any)=>{

    // })
    if (this.levelIndex.length === 1) {
      if (formdata.type !== 'Product') {
        this.data[this.levelIndex].productname = formdata.productname;
        this.data[this.levelIndex].PartNo = formdata.PartNo;
      }
      this.data[this.levelIndex].GST = formdata.GST;
      this.data[this.levelIndex].HSNCode = formdata.HSNCode;
      this.data[this.levelIndex].UnitPrice = formdata.UnitPrice;
      this.data[this.levelIndex].quantity = formdata.quantity;
      this.data[this.levelIndex].discount = formdata.discount;
      this.data[this.levelIndex].amount =
        (formdata.UnitPrice - formdata.UnitPrice * (formdata.discount / 100)) *
        formdata.quantity;
    } else {
      console.log('musjkdhskjdfh');
      this.getArray(this.data, formdata);
    }
    this.childShow = false;
  }

  levelvalue: any = 0;
  getArray(valArray: any, ff: any) {
    valArray.map((ele: any, index: any) => {
      if (
        index === parseInt(this.levelIndex[this.levelvalue]) &&
        ele.type !== 'Product'
      ) {
        if (this.levelvalue == this.levelIndex.length - 1) {
          this.levelvalue = 0;
          ele.HSNCode = ff.HSNCode;
          ele.GST = ff.GST;
          ele.UnitPrice = 0;
          ele.quantity = ff.quantity;
          ele.discount = ff.discount;
          ele.amount =
            (ff.UnitPrice - ff.UnitPrice * (ff.discount / 100)) * ff.quantity;
        } else {
          this.levelvalue++;
          this.getArray(ele.products, ff);
        }
      } else {
        if (
          index === parseInt(this.levelIndex[this.levelvalue]) &&
          ele.type === 'Product'
        ) {
          ele.GST = ff.GST;
          ele.HSNCode = ff.HSNCode;
          ele.UnitPrice = ff.UnitPrice;
          ele.quantity = ff.quantity;
          ele.discount = ff.discount;
          ele.amount =
            (ff.UnitPrice - ff.UnitPrice * (ff.discount / 100)) * ff.quantity;
          // this.levelvalue = 0;
        }
      }
    });
  }

  SumOfTotalAmt(price: any, qty: any, gst: any, disc: any) {
    if (gst != '' || gst != 0)
      return (
        parseFloat(price) *
        (parseFloat(disc) / 100) *
        parseInt(qty) *
        (parseFloat(gst) / 100 + 1)
      );
    else return parseFloat(price) * (parseFloat(disc) / 100) * parseInt(qty);
  }

  public getDragStatus(
    action: DropAction,
    destinationItem: TreeItemLookup
  ): string {
    if (
      destinationItem &&
      action === DropAction.Add &&
      destinationItem.item.dataItem.type === 'Product'
    ) {
      return 'k-i-cancel';
    }

    switch (action) {
      case DropAction.Add:
        return 'k-i-plus';
      case DropAction.InsertTop:
        return 'k-i-insert-up';
      case DropAction.InsertBottom:
        return 'k-i-insert-down';
      case DropAction.InsertMiddle:
        return 'k-i-insert-middle';
      case DropAction.Invalid:
      default:
        return 'k-i-cancel';
    }
  }

  public onNodeDragStart(event: TreeItemDragStartEvent): void {}

  public onNodeDrag(event: TreeItemDragEvent): void {
    this.log('NodeDrag');
  }

  public onNodeDragEnd(event: TreeItemDragEvent): void {
    this.log('NodeDragEnd');
  }

  public onNodeDrop(event: TreeItemDropEvent): void {
    console.log(event.destinationItem.item.dataItem);
    // prevent drop if attempting to add to file
    if (
      event.destinationItem.item.dataItem.type === 'Product' &&
      event.dropPosition === DropPosition.Over
    ) {
      event.setValid(false);
    }
  }

  public onAddItem(event: TreeItemAddRemoveArgs): void {
    console.log('onAddItem', event);
    this.childShow = false;
    this.log('addItem');
  }
  public onRemoveItem(event: TreeItemAddRemoveArgs): void {
    this.log('removeItem');
    console.log(event, 'onRemoveItem');
  }

  public onChildrenLoaded(event: TreeItem): void {
    console.log(event);
    this.log('childrenLoaded');
  }

  public onNodeClick(event: NodeClickEvent): void {
    this.isSingleClicked = true;

    setTimeout(() => {
      if (this.isSingleClicked) {
        this.log('nodeClick', event);
      }
    }, 300);
  }
  public onNodeDblClick(event: NodeClickEvent): void {
    this.log('nodeDblClick', event);
    this.isSingleClicked = false;

  }

  deleteProductHandler(id:any){
    this.deleteData(this.data, id);
    this.childShow=false
  }

  deleteData(data: any, id: any) {
    data?.map((item: any, index: any): any => {
      if (item.type === 'Product') {
        if (item.id === id) {
          data.splice(index, 1);
          return;
        }
      } else {
        if (item.id === id) {
          data.splice(index, 1);
          return;
        }
        this.deleteData(item.products, id);
      }
    });
  }

  private addEvents(
    eventArray: string[],
    event: string,
    arg?: NodeClickEvent
  ): void {
    const eventData = arg ? ', event data:' : '';
    eventArray.unshift(
      `event: ${event} ${eventData} ${arg ? JSON.stringify(arg) : ''}`
    );
  }
  private log(event: string, arg?: NodeClickEvent): void {
    this.addEvents(this.events, event, arg);
  }
  public allowCopy = true;
  public handleDrop(event: TreeItemDropEvent): void {
    // prevent the default to prevent the drag-and-drop directive from emitting `addItem` and inserting items with duplicate IDs
    if (this.allowCopy && event.originalEvent.ctrlKey) {
      event.preventDefault();

      // clone the item and its children and assign them new IDs
      const itemWithNewId = this.assignNewIds(
        event.sourceItem.item.dataItem,
        'id',
        'items'
      );

      // if the target is an empty placeholder, remove it and push the new item to the destination tree nodes
      if (event.destinationItem.item.dataItem.placeholder) {
        const placeholderItemIndex = event.destinationTree.nodes.indexOf(
          event.destinationItem.item.dataItem
        );
        event.destinationTree.nodes.splice(
          placeholderItemIndex,
          1,
          itemWithNewId
        );
        return;
      }

      // manually insert the new item and its children at the targeted position
      if (event.dropPosition === DropPosition.Over) {
        event.destinationItem.item.dataItem.items =
          event.destinationItem.item.dataItem.items || [];
        event.destinationItem.item.dataItem.items.push(itemWithNewId);

        if (
          !event.destinationTree.isExpanded(
            event.destinationItem.item.dataItem,
            event.destinationItem.item.index
          )
        ) {
          event.destinationTree.expandNode(
            event.destinationItem.item.dataItem,
            event.destinationItem.item.index
          );
        }
      } else {
        const parentChildren: any[] = event.destinationItem.parent
          ? event.destinationItem.parent.item.dataItem.items
          : event.destinationTree.nodes;

        const shiftIndex = event.dropPosition === DropPosition.After ? 1 : 0;
        const targetIndex =
          parentChildren.indexOf(event.destinationItem.item.dataItem) +
          shiftIndex;

        parentChildren.splice(targetIndex, 0, itemWithNewId);
      }
    }
  }

  // recursively clones and assigns new ids to the root level item and all its children
  private assignNewIds(item: any, idField: string, childrenField: string): any {
    const result = Object.assign({}, item, { [idField]: Math.random() });

    if (result[childrenField] && result[childrenField].length) {
      result[childrenField] = result[childrenField].map((childItem: any) =>
        this.assignNewIds(childItem, idField, childrenField)
      );
    }

    return result;
  }

  addGroup() {
    this.childShow = false;
    let generatedid = Math.random().toString().split('.')[1];
    console.log(generatedid, '>>>>>>>>>>>>>>>>>>>>>>>');
    this.data.push({
      id: generatedid,
      CCNNo: '',
      Category: 'Group',
      GST: '',
      HSNCode: '',
      OEM: '',
      OEMProductCode: '',
      PartNo: 'Group' + generatedid,
      UOM: 'EA',
      UnitPrice: '0',
      productname: 'Group' + generatedid,
      type: 'Group',
      parent: 'True',
      quantity: '1',
      discount: '0',
      amount: '0',
      products: [],
    });
  }

  addProduct() {
    this.childShow = false;
    let generatedid = Math.random().toString().split('.')[1];
    this.data.push({
      id: generatedid,
      CCNNo: '',
      Category: 'Product',
      GST: '',
      HSNCode: '',
      OEM: '',
      OEMProductCode: '',
      PartNo: 'Product' + generatedid,
      UOM: 'EA',
      UnitPrice: '0',
      productname: 'Product' + generatedid,
      type: 'Product',
      parent: 'False',
      quantity: '1',
      discount: '0',
      amount: '0',
      products: [],
      is_product: true,
    });
  }

  deleteHandler(e: any) {
    console.log(e);
  }
}
