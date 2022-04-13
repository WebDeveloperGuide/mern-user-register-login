import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom';
import { Register, RegisterReset } from "../redux/actions/userActions";


const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="www.webdeveloperguide.in">
        www.WebDeveloperGuide.in
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const userRegister = useSelector((state) => state.userRegister);
  const { register_status } = userRegister;

  const submitForm = (data) => {    
    const { firstName, lastName, email, password } = data;
    dispatch(Register(firstName, lastName, email, password));
  };

  useEffect(() => {
       if(register_status){
        history.push("/");
        dispatch(RegisterReset());
     }
    
  }, [dispatch, register_status]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backGround:'#fff',
            borderRadius:'5px',
            boxShadow:'0 1px 11px rgb(168 168 168 / 27%)',
            textAlign:'center',
            padding:'25px 30px 30px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(submitForm)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName", {
		              required: "First name is required"
		            })}
		          error={!!errors?.firstName}
		          helperText={errors?.firstName ? errors.firstName.message : null}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName", {
		              required: "Last name is required"
		            })}
		          error={!!errors?.lastName}
		          helperText={errors?.lastName ? errors.lastName.message : null}
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
                  {...register("email", {
		              required: "Email is required",
		              pattern: {
		                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
		                message: "Invalid email address",
		              },
		          })}
		          error={!!errors?.email}
		          helperText={errors?.email ? errors.email.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
		              required: "Password is required"
		            })}
		          error={!!errors?.password}
		          helperText={errors?.password ? errors.password.message : null}
                />
              </Grid>              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}


export default RegisterPage;