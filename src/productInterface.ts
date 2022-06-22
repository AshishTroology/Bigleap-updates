export interface Product {
    productname:String,
    PartNo:String,
    id:Number,
    UOM?:String,
    CCNNo?:String,
    GST?:String,
    UnitPrice:Number,
    products?:Product[],
    Category:String,
    OEM?:String,
    OEMProductCode?:String,
    HSNCode:String,
    main_id:String,
    type:String,
    amount:Number,
    quantity:Number
}
