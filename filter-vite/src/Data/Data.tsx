
export interface Sub_DepInterface {
    id: number,
    name: string,
    isSelected : boolean
}
export interface DepartmentInterface {
    id : number, name : string, isSelected : boolean,
    sub_deps : Sub_DepInterface[]
}

export interface DepartmentListInterface {
    departments : DepartmentInterface[]
}

export  const departmentData = [
        {
            "department": "customer_service",
            "sub_departments": [
                "support",
                "customer_success"
            ]
        },
        {
            "department": "design",
            "sub_departments": [
                "graphic_design",
                "product_design",
                "web_design"
            ]
        }
];
    
export const newDepartments = departmentData
        ?.map(({ department, sub_departments },index) => (
            {
                id : index +1,  name: department, isSelected: false,
                subDepartments : 
                sub_departments?.map((sub_department,index) =>
                    ({ id : index + 1, name: sub_department, isSelected: false })
                )
            }
        ));
    
    
