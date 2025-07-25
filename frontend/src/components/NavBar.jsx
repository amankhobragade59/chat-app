import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, UserCheck } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import {Sun, Moon} from 'lucide-react'

const NavBar = () => {
  const { logout, authUser } = useAuthStore();
  const {theme, setTheme} = useThemeStore();

  const toggleTheme=()=>{
    const newTheme = theme =="dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }  
    useEffect(()=>{
      localStorage.setItem("theme",theme);
      const localTheme = localStorage.getItem("theme");
      const val=document.querySelector("html").setAttribute("data-theme",(localTheme));
    },[theme])

  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full z-40 backdrop-blur-lg bg-base-100/80'>
      <div className="container mx-auto px-4 h-14 ">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className='w-5 h-5 text-primary' />
              </div>
              <h1 className='text-lg font-bold'>Chat Box</h1>
            </Link>
          </div>
          {/* right side */}
          <div className="flex items-center gap-2">
            {/* <Link
              to={"/settings"}
              className='btn btn-sm gap-2 transition-colors'
            >
              <Settings className='w-4 h-4' />
              <span className="hidden sm:inline">Settings</span>
            </Link> */}

            {/* toggle button */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm flex items-center gap-2"
            >
              {theme == "dark" ? (
                <>
                  <Sun className="size-5" />
                </>
              ) : (
                <>
                  <Moon className="size-5" />
                </>
              )}
            </button>
            {
              authUser && (
                <>
                  <Link to={"/profile"} className='btn btn-sm gap-2'>
                    <UserCheck className='size-5' />
                    <span className="hidden sm:inline font-bold ">{authUser.fullName.split(" ")[0]}</span>
                  </Link>

                  <button className='flex gap-2 items-center' onClick={logout}>
                    <LogOut className='size-5' />
                    <span className='hidden sm:inline'>Logout</span>
                  </button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
