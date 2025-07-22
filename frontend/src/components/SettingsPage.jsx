import React, { useEffect } from 'react'
import { useThemeStore } from '../store/useThemeStore.js';
import {THEME} from '../constants/index.js'
import {Contact, Send} from 'lucide-react'

const SettingsPage = () => {
  const {theme, setTheme} = useThemeStore();

  useEffect(()=>{
    localStorage.setItem("theme",theme);
    const localTheme = localStorage.getItem("theme");
    const val=document.querySelector("html").setAttribute("data-theme",(localTheme));
  },[theme])

  return (
    <div className='h-screen container mx-auto px-4 pt-20 max-w-5xl'>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
           {THEME.map((t)=>(
            <button 
            key={t}
            className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${theme === t ?"bg-base-200" : "hover:bg-base-200/50"}`}
            onClick={()=>{console.log(t); setTheme(t)}}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-2 p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-clip">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
            </button>
           ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
