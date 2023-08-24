
export interface Sub_DepInterface {
    sub_dep: string;
    isChecked: boolean;
}
export interface DepartmentInterface {
    dep: string; isChecked: boolean;
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
        ?.map(({ department, sub_departments }) => (
            {
                "dep": department, isChecked: false,
                "sub_deps":
                sub_departments?.map(sub_department =>
                    ({ "sub_dep": sub_department, isChecked: false })
                )
            }
        ));
    
    
