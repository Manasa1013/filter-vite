import React, {  useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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
import { FormElements, useForm } from '../Contexts/FormContext';
//interface for form element

// TODO : set validations for every field and regex for each
export const Signup = () => {

    const navigate = useNavigate();

    const { formObject, saveFormObject, resetFormValues,saveFormObjectToLocalStorage, getFormObjectFromLocalStorage } = useForm();
    const { showToast } = useToast();

    const handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (event) => {
        event.preventDefault();
        if (formObject?.username.length === 0 || formObject?.email.length === 0 || formObject?.phoneNumber.length === 0) {
            showToast();
        }
        else {
            navigate("/posts");
            resetFormValues();
            saveFormObjectToLocalStorage();
            getFormObjectFromLocalStorage();
        }
    }
    
    
    useEffect(() => {
        if (localStorage.getItem("formObject")) {
            const formObjectFromLocalStorage =  JSON.parse(localStorage?.getItem("formObject") || "" )
            saveFormObject(formObjectFromLocalStorage)
        }

    },[])
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
                                    const newFormObject: FormElements["userObject"] = { ...formObject, username: event.target.value };
                                    saveFormObject(newFormObject);
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
                                        
                                    const newFormObject: FormElements["userObject"] = { ...formObject, email: event.target.value };
                                    saveFormObject(newFormObject);
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
                                        
                                    const newFormObject: FormElements["userObject"] = { ...formObject, phoneNumber: event.target.value };
                                    saveFormObject(newFormObject);
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