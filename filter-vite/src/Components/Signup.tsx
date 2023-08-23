import React, { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useToast } from '../Contexts/ToastContext';
//interface for form element
export interface FormElements {
    userObject: {
        username: string,
        email : string,
        phoneNumber : string
    }
}
// TODO : set validations for every field and regex for each
export function Signup() {
    
    const getFormObjectFromLocalStorage : () => FormElements["userObject"] | string = () => {
        console.log(localStorage?.getItem("formObject"));
        return localStorage.getItem("formObject") ? JSON.parse(localStorage?.getItem("formObject")) : null
    }
    const [formObject, setFormObject] = useState<FormElements["userObject"]>({
        username: "",
        email: "",
        phoneNumber : ""
    })
    const { toggleToast } = useToast();
    useEffect(() => {
        if (localStorage.getItem("formObject")) {
            const formObjectFromLocalStorage = JSON.parse(localStorage?.getItem("formObject"));
            setFormObject(() => (formObjectFromLocalStorage));
        }

    },[])
    const saveFormObjectToLocalStorage : () => void = () => {
        const objectToBeSavedToLS = { ...formObject };
        localStorage.setItem("formObject", JSON.stringify(objectToBeSavedToLS));
        
    }
    
    const handleSubmit  : (event : React.FormEvent<HTMLFormElement> ) => void = (event) => {
        event.preventDefault();
        if (formObject?.username.length === 0 || formObject?.email.length === 0 || formObject?.phoneNumber.length === 0) {
            toggleToast();;
        }
        saveFormObjectToLocalStorage();
        getFormObjectFromLocalStorage();
    };
    

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
          </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Name"
                                    autoFocus
                                    value={formObject?.username}
                                    onChange={(event) => {
                                        setFormObject((prev) => ({...prev, username : event.target.value}))
                                    }}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formObject?.email}
                                    onChange={(event) => {
                                        setFormObject((prev) => ({...prev, email : event.target.value}))
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone-number"
                                    label="Phone Number"
                                    type="string"
                                    id="phoneNumber"
                                    autoComplete="phoneNumber"
                                    value={formObject?.phoneNumber}
                                    onChange={(event) => {
                                        setFormObject((prev) => ({...prev, phoneNumber : event.target.value}))
                                    }}
                                />
                            </Grid>
                            
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
            </Button>
                    </Box>
                </Box>
            </Container>
    );
}