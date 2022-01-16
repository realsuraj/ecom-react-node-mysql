import React , { useState } from 'react';  
import Axios from 'axios'
import './App.css';

function App() {

  const [usernameReg, setusernameReg] = useState('')
  const [passwordReg, setpasswordReg] = useState('')

  const [username, setusernameLog] = useState('')
  const [password, setpasswordLog] = useState('')

  const [status, setstatus] = useState('')


  const register = () => {
   
    Axios.post('http://localhost:3001/register',{username: usernameReg, 
    password: passwordReg}).then((res) => {
      console.log(res)
    })
  }

  const login = () => {
   
    Axios.post('http://localhost:3001/login',{username: username, 
    password: password}).then((res) => {
      if(res.data.message){
        setstatus(res.data.message)
      }
      else{
        setstatus(res.data[0].userName)

      }
    })
  }


  return (
    <div>
    <div className="Register">
        <h1> Login </h1>
        <div className="form">
          <label> username </label>
          <input type="text" onChange={(e)=>{
            setusernameReg(e.target.value)
          }}/>
          <br/>
          <label>password </label>
          <input type="text" onChange={(e)=>{
            setpasswordReg(e.target.value)
          }}/>
          <br></br>
        <button onClick={register}> submit</button>

        </div>

    </div>

  <div className="login">
    <h1> Login </h1>
    <div className="form">
      <label> username </label>
      <input type="text" onChange={(e)=>{
        setusernameLog(e.target.value)
      }}/>
      <br/>
      <label>password </label>
      <input type="text" onChange={(e)=>{
        setpasswordLog(e.target.value)
      }}/>
      <br></br>
    <button onClick={login}> submit</button>

    </div>

  </div>

  <h1> {status}</h1>
</div>
  );
}

export default App;
