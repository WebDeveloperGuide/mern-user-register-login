import React,{useEffect} from 'react';
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
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Login } from "../redux/actions/userActions";


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


const LoginPage = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const userPanelLogin = useSelector((state) => state.userPanelLogin);
  const { userInfo } = userPanelLogin;

  const submitForm = (data) => {    
    const { email, password } = data;        
    dispatch(Login(email, password));        
  };

  useEffect(() => {
    if (typeof userInfo !== 'undefined' && Object.keys(userInfo).length !== 0) {
      history.push("/");
    }      
  }, [userInfo, history]);

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
	              required: "Password is required"
	            })}
	          error={!!errors?.password}
	          helperText={errors?.password ? errors.password.message : null}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link 
                	to="/forgot-password" 
                	variant="body2"
                  style={{float: "left"}}
                  >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}


export default LoginPage;