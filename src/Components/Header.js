import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function Header() {

  const [refreshToken,setRefreshToken] = React.useState(localStorage.getItem("refreshToken"));
  const [accessToken,setAccessToken] = React.useState(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  const logout = async() => {
    try{
      const response = await fetch("https://authsystem-fastify.herokuapp.com/logout",{
        method:"DELETE",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      });
      const status = await response.status;

      if(status === 200){
        alert("Logout Successfully");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        navigate("/login");
      } 
      else if(status === 400){
        alert("Something went wrong");
      }
    } catch(err){
      console.log(err);
    }
  }

  const logoutHandler = () => {
    logout();
  }

  const logoutRender = () => {
    if(refreshToken && accessToken){
      return (
        <Button color="inherit" onClick={logoutHandler}>Logout</Button>
      )
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Login/SignUp
          </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            {
              logoutRender()
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
