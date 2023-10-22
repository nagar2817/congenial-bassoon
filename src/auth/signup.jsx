import Raact from 'react';
import { FcGoogle } from 'react-icons/fc'
import "./signup.css";
import Contextpage from '../Contextpage';

const Signup =  ()=>{
    return (
        <div className="h-screen">
        <div className='p-5 mx-auto w-full'>
        <div class="mx-auto form-container">
        <p class="title">Create account</p>
        <form class="form">
          <input type="text" class="input" placeholder="Username"/>
          <input type="email" class="input" placeholder="Email"/>
          <input type="password" class="input" placeholder="Password"/>
          <button class="form-btn">Create account</button>
        </form>
        <p class="sign-up-label">
          Already have an account?<span class="sign-up-link">Log in</span>
        </p>
        <div class="buttons-container">
          <div class="google-login-button">
            <FcGoogle className='text-3xl' />
            <span>Sign up with Google</span>
          </div>
        </div>
      </div>
      </div>
      </div>
    )
}
export default Signup;