import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBarSkeleton from './skeleton/SideBarSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const SideBar = () => {

    const {getUsers, users, selectedUser, setSelectedUser, isUserLoading} = useChatStore();
    const {onlineUsers,authUser} = useAuthStore();

    const[showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(()=>{
        getUsers();
    },[getUsers,onlineUsers,users]);

    if(isUserLoading) return <SideBarSkeleton/>

    const filteredUsers = showOnlineOnly 
  ? users.filter(user => onlineUsers.includes(user._id)) 
  : users;

  return (
    <aside className="h-full w-full sm:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-2">
                <Users className='size-6'/>
                <span className="font-medium hidden lg:block">Contacts</span>
            </div>
            {/* online filter tooggle todo */}
            <div className="mt-3 hidden lg:flex items-center gap-2">
                <label className='cursor-pointer flex items-center gap-2'>
                    <input type="checkbox"
                    checked={showOnlineOnly}
                    onChange={(e)=> setShowOnlineOnly(e.target.checked)}
                    className='checkbox checkbox-sm' />
                    <span className="text-sm">Show only online</span>
                </label>
                <span className="text-sm text-zinc-500">{onlineUsers.length<= 1 ? "" :onlineUsers.length -1 }</span>
            </div>
            <div className="overflow-y-auto w-full  py-3">
                {filteredUsers.map((user)=>{
                    if (user._id === authUser._id) return null;
                    return(
                    <button
                    key={user._id}
                    onClick={()=>setSelectedUser(user)}
                    className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
    selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
}`}

                    >
                        <div className="relative mx-1 lg:mx-0">
                            <img src={user.profilePic || "/user.png"}
                            className='size-12 object-cover rounded-full' />
                            {onlineUsers.includes(user._id)?(
                                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"/>
                            ):<span className="absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-transparent "/>}
                        </div>
                        {/*   user info only visible on larger screen */}
                        <div className="block text-left min-w-0">
                            <div className="font-medium truncate">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id)? "Online":"Offline"}
                            </div>
                        </div>
                    </button>
                )})}
            </div>
        </div>
    </aside>
  )
}

export default SideBar
