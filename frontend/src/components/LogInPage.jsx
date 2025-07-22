import { Eye, EyeIcon, EyeOff, EyeOffIcon, Loader2, Loader2Icon, Lock, LockIcon,  MailIcon, MessageSquare, UserRoundCheck } from 'lucide-react';
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })  
  const { login, isLoggingIn,authUser } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className=' min-h-screen grid grid-cols-none'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* logo */}
          <div className='text-center mb-8'>
            <div className="flex flex-col items-center gap-2 group">
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-green-500'/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
              <p className='text-base-content/60'>Sign in to your account</p>
            </div>
          </div>
        </div>
        
        {/* form */}
        <form onSubmit={handleSubmit} className='space-y-6 mb-4 w-96'>
        
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className='size-6 text-base-content/40' />
              </div>
              <input 
              type="email"  
              className="input input-bordered w-full pl-10" 
              placeholder='you@example.com' 
              value={formData.email} 
              onChange={(e)=>setFormData({...formData,email:e.target.value})} />
            </div>
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className='size-6 text-base-content/40' />
              </div>
              <input 
              type={showPassword? "text":"password"} 
              className="input input-bordered w-full pl-10" 
              placeholder='************' 
              value={formData.password} 
              onChange={(e)=>setFormData({...formData,password:e.target.value})} />
              {/*unhide button */}
              <button 
              type="button"
              className='absolute inset-y-0 right-0 pr-3 flex items-center'
              onClick={()=>{setShowPassword(!showPassword)}}>
              {showPassword
      ? <EyeOffIcon className='size-5 text-blue-600' />
      : <EyeIcon className='size-5 text-blue-600' />}
              </button>
            </div>
          </div>

          {/* submit button */}
          <button 
          type="submit" 
          className='btn btn-primary w-full'
          disabled={isLoggingIn}>
            {isLoggingIn?<><Loader2Icon className='size-5 animate-spin'/> Loading...</>:"Log In"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
          Don&apos;t have an account?{" "} 
          <Link to="/signup" className='link link-primary'>Create account
          </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LogInPage
