import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();


  const authorization = async () => {
    try{
      const response = await fetch("https://authsystem-fastify.herokuapp.com/myData",{
        method:"GET",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      const status = await response.status;
      const {name,email} = await response.json();
      console.log(status);
      if(status === 200){
          console.log('Authorized');
      } 
      else if(status === 401){
        alert("Unauthorized Not Verified");
        navigate("/login");
      }
    } catch(err){
      console.log(err);
      navigate('/login');
    }
  }
  useEffect(() => {
    
    if(!localStorage.getItem("refreshToken")){
      navigate("/login");
    } else {
      authorization();
    }
  })
  return (
    <div>Home Page </div>
  )
}

export default Home;