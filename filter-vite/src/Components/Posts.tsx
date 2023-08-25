import { useState, useEffect } from "react";

import {Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
    const [isError, setIsError] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostObjectInterface[]>([]);
    const { showToast } = useToast();
    const API_URL = "https://jsonplaceholder.typicode.com/posts";
   
    // TODO : set types for async function 
    const fetchPosts = async () => {

        try {
            setIsLoading(() => true)
            const response = await fetch(API_URL);
            if (response.status === 200) {
                const data = await response.json();
                if (data?.length > 0) {
                    setIsError(() => false)
                    setPosts(() => data)
                }
            }
            else if (response.status === 404) {
                setIsError(() => true)
            }
            console.log({ response })
        } catch (err) {
            console.error("Error at fetching posts", err);
            setIsError(() => true)
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
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'userId',
    headerName: 'User ID',
    width: 60,
    editable: false,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    editable: false,
  },
  {
    field: 'body',
    headerName: 'Body',
    width: 400,
    editable: false,
  }
  
    ];

  

    return (
        <>
            {
                isLoading ? (<h2>Loading...</h2>) : (
                    isError ? (<h2>Error at displaying posts</h2>) : (
                        <>
                        <h2>Posts</h2>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={posts}
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
                )
            }

        </>
    )
}

// export const SubDepartment: React.FC<Sub_DepInterface[]> = ({ sub_deps }) => {
//     return (
//         <>
//             <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
//                 <FormControlLabel
//                     label="Child 1"
//                     control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
//                 />
//                 <FormControlLabel
//                     label="Child 2"
//                     control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
//                 />
//             </Box>
//         </>
//     )
// }