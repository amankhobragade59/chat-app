import React from 'react'
import { XIcon} from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();
  return (
    <div className="p-2 border-b border-base-300">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {/* Avatar */}
                <div className="avatar">
                    <div className="size-10 rounded-full relative">
                        <img src={selectedUser.profilePic || "/user.png"} alt={selectedUser.fullName}/>
                    </div>
                </div>
                {/* user info */}
                <div>
                    <h3 className="font-medium">{selectedUser.fullName}</h3>
                    <p className="text-sm text-base-content/70">
                    {onlineUsers.includes(selectedUser._id)? "Online" : "Offline"}
                    </p>
                </div>
            </div>
            {/* close button */}
            <button onClick={()=>setSelectedUser(null)}><XIcon/></button>
        </div>
    </div>
  )
}

export default ChatHeader
