import { Box, Typography,TextField, Button } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPass = () => {
    const [email,setEmail] = React.useState("");
    const [newPassword,setNewPassword] = React.useState("");

    const navigate = useNavigate('');

    const postDataToDb = async() => {
        try{
            const response = await fetch('https://authsystem-fastify.herokuapp.com/forgetPassword',{
                method:'PUT',
                headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    newPassword: newPassword
                })
            })

            const status = await response.status;

            if(status === 200){
                alert('Password Changed Successfully');
                navigate('/login');
            } else{
                alert('Some error occured');
            }

        } catch(err){
            console.log(err)
        }
    }

    const changePassword = () => {
        postDataToDb();
    }

  return (
    <Box display='flex' justifyContent="center" alignItems="center" flexDirection='column' gap='1rem' sx={{height:'90vh',width:'100vw',}}>
        <Typography variant='h6' color='primary'>Change Password</Typography>
        <TextField value={email} onChange={e => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" sx={{width:'20rem'}}/>
        <TextField value={newPassword} onChange={e => setNewPassword(e.target.value)} id="outlined-basic" label="New Password" variant="outlined" sx={{width:'20rem'}} type="password"/>
        <Button onClick={changePassword} variant="contained" color="primary">Change Password</Button>
    </Box>
  )
}

export default ForgetPass