import React,{useContext,useState} from 'react';
import { FcGoogle } from 'react-icons/fc'
import "./login.css";
import Contextpage from '../Contextpage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = ()=>{
    const navigate = useNavigate();
    const {GoogleLogin,activeUserId,setActiveUserId,setUser} = useContext(Contextpage);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleLogin = async (e)=>{
        e.preventDefault();
        console.log(email, password);
        const res = await axios.get(`http://localhost:8000/signin/${email}/${password}`);
        console.log(res);
        // setUser(res.data);
        // console.log(res.data);
        // if(res.data != -1){
        //     toast.success("Login successfully");
        //     setActiveUserId(res.data);
        //     navigate("/")
        // }else{
           
        //     toast.error("Login failed");
        //     navigate("/")
        // }

    }
    return (
        <div className="h-screen">
            <div className='p-5 mx-auto w-full'>
        <div class="mx-auto form-container">
        <p class="title">Welcome back</p>
        <form class="form">
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} class="input" placeholder="Email"/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} class="input" placeholder="Password"/>
          <button class="form-btn"  onClick={handleLogin}>Log in</button>
        </form>
        <p class="sign-up-label">
          Don't have an account?<span class="sign-up-link">Sign up</span>
        </p>
        <div class="buttons-container">
          <div class="google-login-button" onClick={GoogleLogin}>
            <FcGoogle className='text-3xl' />
            <span>Log in with Google</span>
          </div>
        </div>
      </div>
      </div>
        </div>
    )
}

export default Login;