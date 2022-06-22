export interface DocumentModel {
  id: number;
  text: string;
  productname: String;
  PartNo: String;
  UOM?: String;
  CCNNo?: String;
  GST?: String;
  UnitPrice: Number;
  Category: String;
  OEM?: String;
  OEMProductCode?: String;
  HSNCode: String;
  main_id: String;
  type: String;
  amount: Number;
  quantity: Number;
  discount: String;
  items: Items[];
}

export interface Items {
  id: number;
  text: string;
  productname: String;
  PartNo: String;
  UOM?: String;
  CCNNo?: String;
  GST?: String;
  UnitPrice: Number;
  Category: String;
  OEM?: String;
  OEMProductCode?: String;
  HSNCode: String;
  main_id: String;
  type: String;
  amount: Number;
  quantity: Number;
  discount: String;
  items: Item[];
}
export interface Item {
  id: number;
  text: string;
  productname: String;
  PartNo: String;
  UOM?: String;
  CCNNo?: String;
  GST?: String;
  UnitPrice: Number;
  Category: String;
  OEM?: String;
  OEMProductCode?: String;
  HSNCode: String;
  main_id: String;
  type: String;
  amount: Number;
  quantity: Number;
  discount:String;
}
