import React , { useState, useEffect } from "react";

import {Box} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { useToast } from "../Contexts/ToastContext";

export interface PostObjectInterface {
    userId: number,
    id: number,
    title: string,
    body : string
}
export interface PostListInterface {
    posts : PostObjectInterface[]
}
export const Posts = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostObjectInterface[]>([]);
    const { showToast } = useToast();
    const API_URL = "https://jsonplaceholder.typicode.com/posts";
    const fetchPosts = async () => {

        try {
            setIsLoading(() => true)
            const data = await fetch(API_URL);
            const response = await data.json();
            if (response?.length >0) {
                setPosts(() => response)
            }
             console.log(response)
        } catch (err) {
            console.error("Error at fetching posts", err);
            showToast();
        }
        finally {
            setIsLoading(() => false)
        }
    }
    useEffect(() => {
        fetchPosts();
    }, []);
    
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

    return (
        <>
            <h2>This is Posts</h2>
            {
                isLoading ? <h2>Loading...</h2> : <ul>{posts?.map(post => (<li key={post?.id}>{post?.title}</li>))}</ul>
            }

    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>

        </>
    )
}