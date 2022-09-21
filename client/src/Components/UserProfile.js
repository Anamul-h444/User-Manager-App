import React, {useEffect, useState} from "react";
import { Toaster } from "react-hot-toast";
import {useNavigate} from 'react-router-dom'
import {UserProfileRequest} from '../apiServices/Api-services'
import {useSelector} from 'react-redux'


function UserProfile() {
  let navigate = useNavigate();
useEffect(() => {
    UserProfileRequest()
}, [])

let userData = useSelector((state)=> state.profile.value)
console.log("From Redux",userData['email'])


  const [user, setUser]=useState({email:"", firstName:"", lastName:"", mobile:"", password:""})
  const {email, firstName, lastName, mobile, password} = user

  const handleChange =(event)=>{
    setUser({...user, [event.target.name]:[event.target.value]})
  }
  const handleSubmit =(event)=>{
    
    console.log(user)
  }
    
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form onClick={handleSubmit}>
      <input  type='email' name="email" value={userData.email} onChange={handleChange} className="border-2 rounded-md px-1 py-1" /> <br></br>
      <input type='text' name="firstName"value={firstName} onChange={handleChange} placeholder="First Name" className="border-2 rounded-md px-1 py-1" /><br/>
      <input type='text' name="lastName" value={lastName} onChange={handleChange} placeholder="Last Name" className="border-2 rounded-md px-1 py-1" /><br/>
      <input type='text' name="mobile" value={mobile}onChange={handleChange}  placeholder="Mobile No" className="border-2 rounded-md px-1 py-1" /><br/>
      <input type='password' name="password" value={password} onChange={handleChange}  placeholder="Password" className="border-2 rounded-md px-1 py-1" /><br/>
      <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    <Toaster />
    </div>
  );
}

export default UserProfile;
