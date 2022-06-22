export interface Employee {
    EmployeeId: number;
    ReportsTo: number;
    FirstName: string;
    LastName: string;
    Position: string;
    Extension: string;
    hasChildren?: boolean;
}