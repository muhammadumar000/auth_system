import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {

  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [refreshToken,setRefreshToken] = React.useState("");
  const [accessToken,setAccessToken] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const navigate = useNavigate();

  const setDataToLocalStorage = (refreshToken,accessToken) => {
    localStorage.setItem("refreshToken",refreshToken);
    localStorage.setItem("accessToken",accessToken);
  }

  const postDataToDb = async() => {
    try{
      setLoading(true);
      const response = await fetch("https://authsystem-fastify.herokuapp.com/login",{
        method:"POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password

        })
      });

      const status = await response.status;
      const {accessToken,refreshToken} = await response.json();
      console.log(accessToken,refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setDataToLocalStorage(refreshToken,accessToken);
      console.log(status);
      setLoading(false);
      if(status === 200){
        alert("Login Successfully");
        navigate('/')
      } 
      else if(status === 401){
        alert("User not Verified");
      }
      else if(status === 400){
        alert("Wrong Email or Password");
      } 
      else{
        alert("Something went wrong");
      }

    }catch(err){
      console.log(err);
    }
  }

  const handleSubmit = () => {
      console.log(email,password);
      postDataToDb();
  }

  const forgetPassHandler = () => {
    console.log("Forget Password");
    navigate("/forgetpass");
  }
  

  return (
    <ThemeProvider theme={theme}>
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
            Log in
          </Typography>
          <Box  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In {
                loading && <CircularProgress  size='small' sx={{marginLeft:'10px',color:'white', height:'1.5rem',width:'1.5rem'}} />
              }  
            </Button>
          
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={forgetPassHandler}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}