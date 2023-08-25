import React, { useState } from 'react';
import {Box , Checkbox , FormControlLabel, List} from '@mui/material';

import { newDepartments } from '../Data/Data';

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
  isSelected: boolean;
}

interface SubDepartment {
  id: number;
  name: string;
  isSelected: boolean;
}

interface DepartmentTreeProps {
  departments: Department[];
  onDepartmentSelect: (id: number) => void;
  onSubDepartmentSelect: (departmentId: number, subDepartmentId: number) => void;
}

export const DepartmentTree: React.FC<DepartmentTreeProps> = ({
  departments,
  onDepartmentSelect,
  onSubDepartmentSelect,
}) => {
  const handleDepartmentSelect = (id: number) => {
    onDepartmentSelect(id);
  };

  const handleSubDepartmentSelect = (departmentId: number, subDepartmentId: number) => {
    onSubDepartmentSelect(departmentId, subDepartmentId);
  };

    return (
  <>
      {
          
          departments?.map((department : Department) => (
          <List key={department.id}>
              <FormControlLabel
                label={department.name}
                control={
                  <Checkbox checked={department.isSelected }
                    onChange={() => handleDepartmentSelect(department.id)} />} />
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    {department.subDepartments.map((subDepartment) => (
                    <List key={subDepartment.id}>
                        <FormControlLabel
                            label={subDepartment.name}
                            control={<Checkbox checked={subDepartment.isSelected} onChange={() => handleSubDepartmentSelect(department.id , subDepartment.id)} />}
                        />
                    </List>
                    ))}
                  </Box>
            </List>
          ))
            }
            </>
  );
};


export const Department: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([...newDepartments]);

  const handleDepartmentSelect = (id: number) => {
    const updatedDepartments = departments.map((department) => {
      if (department.id === id) {
        const isSelected = !department.isSelected;
        const updatedSubDepartments = department.subDepartments.map((subDepartment) => ({
          ...subDepartment,
          isSelected,
        }));
        return { ...department, isSelected, subDepartments: updatedSubDepartments };
      }
      return department;
    });
    setDepartments(updatedDepartments);
  };

  const handleSubDepartmentSelect = (departmentId: number, subDepartmentId: number) => {
    const updatedDepartments = departments.map((department) => {
      if (department.id === departmentId) {
        const updatedSubDepartments = department.subDepartments.map((subDepartment) => {
          if (subDepartment.id === subDepartmentId) {
            return { ...subDepartment, isSelected: !subDepartment.isSelected };
          }
          return subDepartment;
        });

        const allSubDepartmentsSelected = updatedSubDepartments.every(
          (subDepartment) => subDepartment.isSelected
        );

        const isSelected = allSubDepartmentsSelected || department.isSelected;

        return { ...department, isSelected, subDepartments: updatedSubDepartments };
      }
      return department;
    });
    setDepartments(updatedDepartments);
  };

  return (
    <div>
      <h1>Department Tree</h1>
      <DepartmentTree
        departments={departments}
        onDepartmentSelect={handleDepartmentSelect}
        onSubDepartmentSelect={handleSubDepartmentSelect}
      />
    </div>
  );
};

