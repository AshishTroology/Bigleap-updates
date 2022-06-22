export class Product {
  constructor(
    public ProductID?: number,
    public ProductName?: string,
    public UnitPrice?: number,
    public UnitsInStock?: number,
    public Discontinued?: boolean
  ) {}
}
